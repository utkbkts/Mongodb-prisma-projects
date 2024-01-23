"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  products: Product[];
  currentPage?:any
}

const Cart = ({ products,currentPage }: Props) => {

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:grid-cols-3  w-full mx-auto max-w-7xl gap-4 mt-10">
      {(currentPage === 1 ? products.slice(1):products).map((produc) => {
          const isNew =
          Date.now() - new Date(produc.createdAt).getTime() <
          1000 * 60 * 60 * 24 * 7;
      return(
        <div key={produc.id} className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={produc.image as string}
            alt="Shoes"
            className="h-[150px] w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {produc.title}
            <div className="badge badge-secondary">{isNew ? "New":"Old"}</div>
          </h2>
          <p>{produc.description.substring(0,50)}...</p>
         <div className="flex items-center justify-between">
         <div className="card-actions justify-start">
         <Link href={"/products/"+produc.id}><div className="btn btn-info px-6">Detail</div></Link>
          </div>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
         </div>
        </div>
      </div>
      )
})}
    </div>
  );
};

export default Cart;
