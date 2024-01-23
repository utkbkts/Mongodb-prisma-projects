"use client";

import { Product } from "@prisma/client";



const Category = () => {

  const categories = [
    "Fashion",
    "Technology",
    "Food",
    "Travel",
    "Sports",
    "Health",
  ];

  return (
    <div className="w-full">
      <select
        className="text-gray-900 shadow-sm ring-inset ring-1 placeholder:text-gray-400 focus:right-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-4 outline-none"
        name="category"
      >
        <option value="" selected disabled>
          Choose Category
        </option>
        {categories.map((item)=>(
        <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Category;
