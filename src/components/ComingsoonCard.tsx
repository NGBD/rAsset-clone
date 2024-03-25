import React from "react";
import { twMerge } from "@/lib/twMerge";
import ComingSoon from "./icon/ComingSoon";

function ComingsoonCard({ title = "", description = "", className = "", classNameContainer = "" }) {
  return (
    <div className={twMerge("flex flex-col justify-center items-center max-w-maxContent mx-auto", classNameContainer)}>
      <div className={twMerge("flex flex-col p-[30px] items-center rounded-md", className)}>
        <ComingSoon className="w-full fill-primary dark:fill-[#ffffff]" />
        <span className="flex flex-col gap-3 items-center text-primary dark:text-textDark">
          {title && <p className="font-bold text-xl ">{title}</p>}
          {description && <p className="font-normal text-xl text-center">{description}</p>}
        </span>
      </div>
    </div>
  );
}

export default ComingsoonCard;
