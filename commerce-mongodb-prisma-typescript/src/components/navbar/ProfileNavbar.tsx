"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";
interface Props {
  session: any | null;
}
const ProfileNavbar = ({ session }: Props) => {

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={session?.image as string}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {session ? (
          <>
            <li>
              <a className="justify-between">{session?.name}</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <span onClick={() => signOut({ callbackUrl: "/" })}>Logout</span>
            </li>
          </>
        ) : (
          <>
             <li>
              <span onClick={() => signIn()}>Sign In</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProfileNavbar;
