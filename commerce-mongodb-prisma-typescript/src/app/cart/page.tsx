import { getCart } from "@/actions/Cart";
import React from "react";
import CartClient from "./CartClient";
import CartTotal from "./CartTotal";
import { DeleteCartItem } from "@/actions/CartDelete";

export const metadata = {
  title: "Your Cart",
};

const Cart = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="text-black/80 font-bold text-4xl mb-6 mt-6 px-4 py-2">
        Shopping Cart
      </h1>
      {!cart?.cartitem.length && (
        <h1 className="font-bold text-4xl text-center">Your cart Is Empty</h1>
      )}
      {cart && cart?.cartitem.length > 0 && (
       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" className="px-6 py-3">
                       Product Image
                   </th>
                   <th scope="col" className="px-6 py-3">
                   Product Title
                   </th>
                   <th scope="col" className="px-6 py-3">
                    Quantity
                   </th>
                   <th scope="col" className="px-6 py-3">
                   Product Price
                   </th>
                   <th scope="col" className="px-6 py-3">
                       Action
                   </th>
               </tr>
           </thead>
            <tbody>
              {cart?.cartitem.map((item) => (
                <CartClient
                  cartItem={item}
                  key={item.id}
                  DeleteCartItem={DeleteCartItem}
                />
              ))}
            </tbody>
          </table>
          <CartTotal />
        </div>
      )}
    </div>
  );
};

export default Cart;
