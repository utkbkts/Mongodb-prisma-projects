"use client";

import { CartItemsWithProducts } from "@/actions/Cart";
import { FormatPrice } from "@/utils/FormatPrice";
import React, { useTransition } from "react";

interface Props {
  cartItem: CartItemsWithProducts;
  DeleteCartItem:(productId:string,quantity:number)=>Promise<void>
}

const CartClient = ({ cartItem: { quantity, Product },DeleteCartItem }: Props) => {
  const [isPending,startTransition]=useTransition()
    const QuantityOptions = () => {
        const options = [];
        for (let i = 1; i <= 99; i++) {
          options.push(
            <option value={i} key={i}>
              {i}
            </option>
          );
        }
        return options;
      };
    
 
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img className="w-24 h-24 object-cover" src={Product.image} alt="" />
    </th>
    <td className="px-6 py-4">
        {Product.title}
    </td>
       <td className="px-6 py-4">
       <select defaultValue={quantity} className="select select-bordered w-full max-w-[80px]">
         {QuantityOptions()}
       </select>
     </td>
    <td className="px-6 py-4">
        {FormatPrice(Product.price)}
    </td>
    <td className="px-6 py-4">
        <button    onClick={() => {
        startTransition(async () => {
          await DeleteCartItem(Product.id, quantity);
        });
      }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
    </td>
</tr>
  );
};

export default CartClient;
