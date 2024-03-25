import React from "react";
import { twMerge } from "@/lib/twMerge";
import EmptyIcon from "./icon/Emptyicon";
import PrimaryBtn from "./PrimaryBtn";
import Link from "next/link";

function EmptyPage({
  title = "",
  description = "",
  className = "",
  classNameContainer = "",
  hrefFirstBtn = "",
  firstBtn = "",
  hrefSecondBtn = "",
  secondBtn = "",
}) {
  return (
    <div className={twMerge("flex flex-col justify-center items-center max-w-maxContent mx-auto", classNameContainer)}>
      <div className={twMerge("flex flex-col items-center rounded-md", className)}>
        <EmptyIcon className="md:w-full fill-[#5550DC] dark:fill-white" />
        <span className="flex flex-col gap-3 items-center text-primary dark:text-textDark">
          {title && <p className="font-bold text-xl">{title}</p>}
          {description && (
            <p className="font-normal text-xl text-center text-black dark:text-textDark">{description}</p>
          )}
        </span>
        <div className="flex gap-10 mt-3">
          {firstBtn && (
            <Link href={hrefFirstBtn}>
              <PrimaryBtn className="w-[150px] text-white">{firstBtn}</PrimaryBtn>
            </Link>
          )}
          {secondBtn && (
            <Link href={hrefSecondBtn}>
              <PrimaryBtn className="w-[150px] text-white" disabled>
                {secondBtn}
              </PrimaryBtn>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmptyPage;
