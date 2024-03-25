import { twMerge } from "@/lib/twMerge";
import React, { ReactNode } from "react";
interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accessoriesLeft?: ReactNode;
  accessoriesRight?: ReactNode;
}
function SecondaryBtn({
  className = "",
  children,
  accessoriesLeft,
  accessoriesRight,
  ...attributes
}: SecondaryButtonProps) {
  return (
    <button
      {...attributes}
      className={twMerge(
        "border border-primary text-primary w-max rounded-md font-medium py-3 px-5 smooth-transform flex justify-center items-center gap-3 text-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {accessoriesLeft && <div className="">{accessoriesLeft}</div>}
      {children}
      {accessoriesRight && <div className="">{accessoriesRight}</div>}
    </button>
  );
}

export default SecondaryBtn;
