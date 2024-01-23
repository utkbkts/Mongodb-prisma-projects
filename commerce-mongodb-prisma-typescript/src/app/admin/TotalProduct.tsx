"use client"
import getAllProducts from "@/actions/GetallProducts";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const TotalProduct =  () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data:any = await getAllProducts();
          setProducts(data);
        } catch (error:any) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []);
  
  
  return (
    <div className="flex items-center justify-center">
      <div className="border border-black py-2 px-4 w-[400px] h-[200px] mt-10">
        <div className="flex flex-col items-center justify-center h-full">
          <span>
            <FaUser size={40}/>
          </span>
          <span className="font-bold text-xl">Total Products</span>
          <span className="font-bold text-xl">{products.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalProduct;
