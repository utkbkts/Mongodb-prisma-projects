import React, { cache } from "react";
import prisma from "@/libs/db/prismadb";
import Notfound from "@/app/not-found";
import PriceTag from "@/utils/PriceTag";
import { Metadata } from "next";
import AddCartButton from "./AddCartButton";
import { IncreamentQuantity } from "@/actions/IncreamentQuantity";

interface Props {
  params: {
    id: string;
  };
}
const getProducts = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return <Notfound />;
  return product;
});

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const product: any = await getProducts(id);

  return {
    title: product.title + "-  E-shopping",
  };
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: any = await getProducts(id);

  return (
    <>
      <div className="h-full pb-10 w-full bg-gray-200 pt-10">
        <div className="card lg:card-side bg-base-100 shadow-xl flex md:flex-row flex-col p-2">
          <figure>
            <img src={product.image} alt="Album" />
          </figure>
          <div className="card-body flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <PriceTag
                className="badge font-bold text-xl"
                price={product.price}
              />
            </div>
            <div className="card-actions justify-end">
              <AddCartButton
                IncreamentQuantity={IncreamentQuantity}
                productId={product.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
