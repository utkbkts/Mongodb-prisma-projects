"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
}

const Button = ({ text, type, className, onClick }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type={type}
      onClick={onClick}
      className={`py-4 border-none w-full px-4 text-white hover:bg-orange-400 bg-orange-600 transition duration-300 btn btn-primary ${className}`}
    >
      {pending ? (
        <span className="loading loading-spinner loading-md">Loading...</span>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default Button;
