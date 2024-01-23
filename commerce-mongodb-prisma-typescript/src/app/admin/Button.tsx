"use client";

import React, { useState } from "react";
import TotalProduct from "./TotalProduct";
import TotalUsers from "./TotalUsers";

const Button = () => {
  const [activeProduct, setActiveProduct] = useState(false);
  const [activeUsers, setActiveUsers] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => {
            setActiveProduct(true);
            setActiveUsers(false);
          }}
          className={`font-bold text-xl text-black ${
            activeProduct ? "border-b-2 border-b-gray-600" : ""
          }`}
        >
          Total product
        </button>
        <button
          onClick={() => {
            setActiveProduct(false);
            setActiveUsers(true);
          }}
          className={`font-bold text-xl text-black ${
            activeUsers ? "border-b-2 border-b-gray-600" : ""
          }`}
        >
          Total users
        </button>
      </div>
      {activeProduct && <TotalProduct />}
      {activeUsers && <TotalUsers />}
    </>
  );
};

export default Button;
