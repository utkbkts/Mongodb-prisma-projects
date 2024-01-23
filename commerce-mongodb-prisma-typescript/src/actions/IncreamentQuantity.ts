"use server";

import { revalidatePath } from "next/cache";
import { createCart, getCart } from "./Cart";
import prisma from "@/libs/db/prismadb";

export async function IncreamentQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const cartItemsFind = cart.cartitem.find(
    (product) => product.productId === productId
  );

  if (cartItemsFind) {
    await prisma.cartItems.update({
      where: { id: cartItemsFind.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItems.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath(`/products/${productId}`)
}
