"use server";
import prisma from "@/libs/db/prismadb";
import { createCart, getCart } from "./Cart";
import { revalidatePath } from "next/cache";

export async function DeleteCartItem(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleCartIn = cart.cartitem.find(
    (item) => item.productId === productId
  );

  if (articleCartIn) {
    // await prisma.cart.update({
    //   where: { id: cart.id },
    //   data: {
    //     cartitem: { delete: { id: articleCartIn.id } },
    //   },
    // });
    await prisma.cartItems.delete({
      where: { id: articleCartIn.id },
    });
  }
  revalidatePath("/cart");
}
