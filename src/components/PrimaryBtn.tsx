import { twMerge } from "@/lib/twMerge";
import React, { ReactNode } from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accessoriesLeft?: ReactNode;
  accessoriesRight?: ReactNode;
}

function PrimaryBtn({
  className = "",
  children,
  accessoriesLeft,
  accessoriesRight,
  ...attributes
}: PrimaryButtonProps) {
  return (
    <button
      {...attributes}
      className={twMerge(
        "bg-primary text-white w-max rounded-md font-medium py-3 px-5 smooth-transform flex justify-center items-center h-10 gap-3 text-base",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {accessoriesLeft && <div>{accessoriesLeft}</div>}
      {children}
      {accessoriesRight && <div>{accessoriesRight}</div>}
    </button>
  );
}

export default PrimaryBtn;
