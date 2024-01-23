"use server";
import { cookies } from "next/dist/client/components/headers";
import prisma from "@/libs/db/prismadb";
import { CartItems, Prisma } from "@prisma/client";
import getCurrentUser from "./GetUser";
import { Cart } from "@prisma/client";

// Alışveriş sepetindeki ürünlerle birlikte alışveriş sepetini temsil eden tür.
export type CartwithProducts = Prisma.CartGetPayload<{
  include: { cartitem: { include: { Product: true } } };
}>;

export type CartItemsWithProducts = Prisma.CartItemsGetPayload<{
  include: { Product: true };
}>;

// Alışveriş sepetini temsil eden türü genişletip, ek bilgiler ekleyen tür.
export type Shoppingcart = CartwithProducts & {
  size: number; // Sepetteki toplam ürün sayısı.
  discount: number;
  subTotal: number; // Sepetin toplam tutarı.
  discountedSubTotal: number;
};

// Kullanıcının alışveriş sepetini çeken fonksiyon.
export async function getCart(): Promise<Shoppingcart | null> {
  const session = await getCurrentUser();

  let cart: CartwithProducts | null = null;

  if (session) {
    // Kullanıcı oturumu varsa, kullanıcının sepetini al
    cart = await prisma.cart.findFirst({
      where: { userId: session.id },
      include: { cartitem: { include: { Product: true } } },
    });
  } else {
    // Kullanıcı oturumu yoksa, yerel sepet ID'sini kullanarak sepeti al
    const localcartId = cookies().get("CardId")?.value;
    cart = localcartId
      ? await prisma.cart.findUnique({
          where: { id: localcartId },
          include: { cartitem: { include: { Product: true } } },
        })
      : null;
  }

  // Eğer sepet bulunamazsa, null döndürülür.
  if (!cart) {
    return null;
  }

  let discount = 0;
  let subTotal = 0;

  // Sepet bilgileri üzerine ek bilgiler eklenir (toplam ürün sayısı, toplam tutar).
  discount =
    cart.cartitem.reduce((acc, item) => acc + item.Product.price, 0) * 0.08;
  subTotal = cart.cartitem.reduce(
    (acc, item) => acc + item.quantity * item.Product.price,
    0
  );

  // Sepet bilgileri üzerine ek bilgiler eklenir (toplam ürün sayısı, toplam tutar).
  return {
    ...cart,
    size: cart.cartitem.reduce((acc, item) => acc + item.quantity, 0),
    discount: discount,
    subTotal: subTotal,
    discountedSubTotal: subTotal - discount,
  };
}

// Yeni bir alışveriş sepeti oluşturan fonksiyon.
export async function createCart(): Promise<Shoppingcart> {
  const session = await getCurrentUser();

  let newCart: Cart;

  if (session) {
    // Kullanıcı oturumu varsa, kullanıcıya ait yeni bir sepet oluştur
    newCart = await prisma.cart.create({
      data: {
        userId: session.id,
      },
    });
  } else {
    // Kullanıcı oturumu yoksa, yeni bir sepet oluştur
    newCart = await prisma.cart.create({
      data: {},
    });

    // Oluşturulan sepetin ID'si tarayıcı çerezine eklenir.
    cookies().set("CardId", newCart.id);
  }

  // Yeni sepet bilgileri üzerine ek bilgiler eklenir (toplam ürün sayısı, toplam tutar, boş ürün dizisi).
  return {
    ...newCart,
    size: 0,
    subTotal: 0,
    discount: 0,
    cartitem: [],
    discountedSubTotal: 0,
  };
}

// Kullanıcının anonim sepetini kullanıcının sepetiyle birleştiren fonksiyon.
export async function mergeAnonymousCart(userId: string) {
  const localcartId = cookies().get("CardId")?.value;

  const localcart = localcartId
    ? await prisma.cart.findUnique({
        where: { id: localcartId },
        include: { cartitem: true },
      })
    : null;

  if (!localcart) return;

  const useCart = await prisma.cart.findFirst({
    where: { userId },
    include: { cartitem: true },
  });

  await prisma.$transaction(async (tx) => {
    if (useCart) {
      // Kullanıcının sepeti varsa, anonim sepetle birleştir
      const mergedCartItems = mergeCartItems(
        localcart.cartitem,
        useCart.cartitem
      );

      //where: { userId },: Bu, cart tablosundan çekilecek kayıtları filtrelemek için kullanılan bir koşuldur. Sadece belirli bir userId'ye sahip olan sepet kayıtları çekilecektir.

// include: { cartitem: true },: Bu, çekilen sepet kayıtlarının aynı zamanda ilişkili cartitem verilerini de çekmesini sağlar. Yani, sepetin içindeki ürünleri temsil eden cartitem verileri de bu sorgu sonucunda elde edilecektir

      // Kullanıcının sepetindeki eski ürünleri sil
      await tx.cartItems.deleteMany({
        where: { cartId: useCart.id },
      });

      // Birleştirilmiş ürünleri ekle
      await tx.cartItems.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: useCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      // Kullanıcının sepeti yoksa, yeni bir sepet oluştur
      await tx.cart.create({
        data: {
          userId,
          cartitem: {
            createMany: {
              data: localcart.cartitem.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: { id: localcart.id },
    });
    cookies().set("CardId","")
  });
}

// İki ürün listesini birleştiren yardımcı fonksiyon
function mergeCartItems(...cartitems: CartItems[][]) {
  return cartitems.reduce((acc, item) => {
    item.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItems[]);
}