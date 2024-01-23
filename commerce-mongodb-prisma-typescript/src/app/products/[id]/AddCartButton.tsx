"use client"
import Button from "@/utils/Button";
import { useState, useTransition } from "react";
import {BsBasket} from "react-icons/bs"
interface Props{
    productId:string;
    IncreamentQuantity:(productId:string)=>Promise<void>;
}

const AddCartButton = ({productId,IncreamentQuantity}:Props) => {
  const [success,setsuccess]=useState(false)
  const[pending,startTransition]=useTransition()

  return (
    <div className="relative ">
      <Button onClick={()=>{
        setsuccess(false);
        startTransition(async()=>{
          await IncreamentQuantity(productId)
          setsuccess(true)
        })
      }} text="Add to Cart" className="px-[35px]" type="submit"></Button>
     {pending ? <span className="loading loading-spinner loading-md absolute right-0 top-[12px] px-1"></span>: <span className="absolute right-0 top-[12px] px-1"><BsBasket size={20}/></span>}
    </div>
  )
}

export default AddCartButton
