import Link from "next/link";
import React from "react";
import LinkIcon from "./icon/LinkIcon";

function BlockTitle({ href, label }: { href?: string; label: string }) {
  return (
    <div className="flex items-center gap-1 w-full dark:text-textDark justify-between">
      <p className="font-bold pb-2 text-xl">{label}</p>
      {href && (
        <Link href={href} target="_blank">
          <LinkIcon />
        </Link>
      )}
    </div>
  );
}

export default BlockTitle;
