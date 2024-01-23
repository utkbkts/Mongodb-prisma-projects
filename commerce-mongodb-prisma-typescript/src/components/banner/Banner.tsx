"use client";
import PriceTag from "@/utils/PriceTag";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  products: Product[];
}
const Banner = ({ products }: Props) => {
  return (
    <div className="w-full h-auto bg-gray-200">
      <div className="flex md:flex-row flex-col items-center justify-center p-2 gap-4">
        <div className="flex-1">
          <img
            src={products[0].image}
            alt="image"
            className="object-cover rounded-md w-full h-[50vh]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="font-bold text-6xl text-black">{products[0].title}</span>
          <span className="font-light text-xl text-gray-500">{products[0].description}</span>
          <Link className="btn btn-primary w-1/2" href={"/products/"+products[0].id}>Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
