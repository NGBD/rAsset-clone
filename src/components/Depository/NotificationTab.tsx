import React from "react";
import PrimaryBtn from "../PrimaryBtn";
import Link from "next/link";

function NotificationTab({
  title,
  firstRow,
  icon,
  secondRow,
  thirdRow,
  action,
  className = "",
  href = "",
}: {
  thirdRow?: string;
  icon: any;
  title?: string;
  secondRow?: string;
  firstRow?: any;
  action?: any;
  className?: string;
  href?: string;
}) {
  return (
    <div className={`flex flex-col w-full items-center dark:bg-bgDark dark:text-textDark ${className}`}>
      {icon}
      <span className="flex flex-col items-center mt-1 text-center">
        <p className="font-bold pb-4 md:text-lg text-base text-[#5550DC] dark:text-textDark">{title}</p>
        <div className="font-normal text-base ">{firstRow}</div>
        <p className="font-normal text-base">{secondRow}</p>
        <p className="font-normal text-base">{thirdRow}</p>
      </span>
      {action && (
        <Link href={href}>
          <PrimaryBtn className="rounded-md h-[40px] mt-2">{action}</PrimaryBtn>
        </Link>
      )}
    </div>
  );
}

export default NotificationTab;
