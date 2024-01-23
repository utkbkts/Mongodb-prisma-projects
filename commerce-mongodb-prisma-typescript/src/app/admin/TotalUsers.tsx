"use client";

import getallUsers from "@/actions/GetallUsers";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const TotalUsers = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getallUsers();
        setUsers(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(Users);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="border border-black py-2 px-4 w-[400px] h-[200px] mt-10">
        <div className="flex flex-col items-center justify-center h-full">
          <span>
            <FaUser size={40} />
          </span>
          <span className="font-bold text-xl">Total Users</span>
          <span className="font-bold text-xl">{Users.length}</span>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                membership date
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {Users?.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.createdAt}</td>
                <td className="px-6 py-4">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalUsers;
