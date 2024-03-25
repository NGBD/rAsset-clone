import React from "react";
import { twMerge } from "tailwind-merge";
function InfoBlock({ className = "", children }) {
  return (
    <div
      className={twMerge(
        `bg-white flex flex-col justify-between gap-2 dark:bg-bgDark dark:text-textDark rounded-md py-2 px-6`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default InfoBlock;
