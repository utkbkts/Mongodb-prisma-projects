import {  getCart } from "@/actions/Cart";
import { FormatPrice } from "@/utils/FormatPrice";



const CartTotal = async() => {
    const cart = await getCart();
  return (
    <div className="w-full justify-end flex mt-10 mb-6">
      <div className="flex flex-col gap-2 border border-black p-2 w-[400px]">
        <span className="flex items-center justify-between">
          SubTotal: <span>{FormatPrice(cart?.subTotal || 0)}</span>
        </span>
        <span className="flex items-center justify-between">
        Discount:
          <span className="">{cart?.discount}</span>
        </span>
        <span className="flex items-center justify-between  border-t-2">
          Total: <span>{FormatPrice(cart?.discountedSubTotal || 0)}</span>
        </span>
        <button className="btn btn-warning">Checkout</button>
      </div>
    </div>
  );
};

export default CartTotal;
