"use client"

import React from 'react'

interface Props{
    name: string;
    type: string;
    placeholder?: string;
    value?: string | number | readonly string[] | undefined;
}

const Input = ({name,type,placeholder,value}:Props) => {
  return (
    <input name={name} placeholder={placeholder} value={value} type={type} className={"py-4 border border-black h-full px-4 rounded-md outline-none focus:border-blue-500 w-full text-black font-bold"}/>
  )
}

export default Input
