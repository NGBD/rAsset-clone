import Link from "next/link";
import React from "react";

function ContactCard({ icon, title = "", description = "", href = "" }) {
  return (
    <Link href={href} className="w-full h-full">
      <div
        className="w-full md:h-full h-[50px] items-center flex-wrap rounded-md justify-center md:justify-start flex gap-3 md:p-4 dark:bg-bgDarkSecondary cursor-pointer
      bg-[#EEF0F3]"
      >
        <div className="h-[35px] flex items-center">{icon}</div>
        <div className="cursor-pointer md:flex hidden dark:text-textDark flex-col">
          {title && <div className="font-semibold overflow-hidden">{title}</div>}
          {description && <div className="font-normal overflow-hidden">{description}</div>}
        </div>
      </div>
    </Link>
  );
}

export default ContactCard;
