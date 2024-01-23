import React from "react";
import Shoppingcart from "./Shoppingcart";
import { getCart } from "@/actions/Cart";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileNavbar from "./ProfileNavbar";
import getCurrentUser from "@/actions/GetUser";

const Navbar = async () => {
  const session = await getCurrentUser();
  async function getSearchQuery(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
      redirect("/search?query=" + searchQuery);
    }
  }

  const cart = await getCart();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          E-Shopping
        </Link>
      </div>
      <div className="flex-none gap-3">
      <div>
           <Link href={"/addproduct"}><button className="btn">Add Product</button></Link>
          </div>
          <div>
           <Link href={"/admin"}><button className="btn">Admin</button></Link>
          </div>
        <form action={getSearchQuery} className="form-control">
          <input
            type="text"
            placeholder="Search"
            name="searchQuery"
            className="input input-bordered w-24 md:w-auto"
          />
        </form>
        <Shoppingcart cart={cart} />
        <ProfileNavbar session={session} />
      </div>
    </div>
  );
};

export default Navbar;
