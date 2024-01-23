import Button from "@/utils/Button";
import Input from "@/utils/Input";
import React from "react";
import prisma from "@/libs/db/prismadb";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Category from "./Category";

export const metadata = {
  title: "Add Product",
};

async function addproduct(formdata: FormData) {
  "use server";

  const title = formdata.get("title")?.toString();
  const description = formdata.get("description")?.toString();
  const image = formdata.get("image")?.toString();
  const category = formdata.get("category")?.toString();
  const price = Number(formdata.get("price") || 0);

  if (!title || !description || !image || !price || !category) {
    throw new Error("Missing required fields");
  }
  await prisma.product.create({
    data: {
      image,
      description,
      price,
      title,
      category
    },
  });
  redirect("/")
}

const AddProduct =async () => {
  const session = await getServerSession(authOptions)
  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-800">
      <div className="mx-auto h-full p-3 flex items-center justify-center max-w-6xl w-full">
        <form
          className="p-3 items-center h-full justify-center rounded-md bg-slate-500 shadow-md w-full  gap-4 flex flex-col"
          action={addproduct}
        >
          <h1 className="text-white font-bold text-4xl text-center h-24 flex items-start">
            Add Product{" "}
          </h1>
          <Input name="title" type="text" placeholder="title..." />
          <Input name="description" type="text" placeholder="Description" />
          <Input name="price" type="number" placeholder="Price..." />
          <Input name="image" type="url" placeholder="imageUrl..." />
          <Category />
          <Button text="Add a Product" type="submit"></Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
