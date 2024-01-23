
import React from 'react'
import { FormatPrice } from './FormatPrice';
interface Props{
    className:string;
    price:number
}

const PriceTag = ({className,price}:Props) => {
  return (
    <span className={` ${className} badge`}>
      {FormatPrice(price)}
    </span>
  )
}

export default PriceTag
