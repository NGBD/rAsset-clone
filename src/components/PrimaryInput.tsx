import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PrimaryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accessoriesLeft?: ReactNode;
  accessoriesRight?: ReactNode;
  title?: string;
  note?: string;
  message?: string;
  id?: string;
  classNameInput?: string;
}

function PrimaryInput({
  className = "",
  classNameInput = "",
  accessoriesLeft,
  accessoriesRight,
  title,
  note,
  id,
  ...attributes
}: PrimaryInputProps) {
  return (
    <div className={`text-base w-full dark:text-textDark ${className}`}>
      {title && <p className="mb-1 text-sm capitalize text-black font-medium">{title}</p>}
      {note && <p className="mb-1 text-sm text-[#7C7C87]">{note}</p>}
      <div className="relative w-full">
        <div className="absolute top-2 left-4">{accessoriesLeft}</div>
        <div className="absolute top-2 right-4">{accessoriesRight}</div>
        <input
          id={id}
          {...attributes}
          className={twMerge(
            `border-[1px] border-gray-400 w-full font-semibold py-[6px] px-4 min-w-450 rounded-md outline-none text-base dark:bg-bgDarkSecondary smooth-transform placeholder:font-light placeholder:text-[14px] ${
              accessoriesLeft ? "pl-11" : ""
            } ${accessoriesRight ? "pr-11" : ""}`,
            classNameInput
          )}
        />
      </div>
    </div>
  );
}

export default PrimaryInput;
