import Link from "next/link";
import React, { useState } from "react";
import CopyIcon from "../icon/CopyIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VIcon from "../icon/VIcon";

function InfoBox({ nameBox = "", detailInfo = "", className = "", href = "", copy = "" }) {
  const [copiedText, setCopiedText] = useState(false);

  return (
    <div
      className={`min-h-[100px] rounded-md border border-input flex flex-col p-2 justify-center gap-1 text-center ${className}`}
    >
      <p className="text-lg uppercase text-title">{nameBox}</p>
      <div className="flex justify-center">
        {detailInfo && (
          <div className="text-base font-semibold text-black dark:text-textDark truncate">{detailInfo}</div>
        )}
        {copy && (
          <CopyToClipboard onCopy={() => setCopiedText(true)} text={copy}>
            <div className="p-[2px] bg-transparent rounded cursor-pointer w-5 h-5 relative md:left-4 left-16">
              {copiedText ? <VIcon /> : <CopyIcon />}
            </div>
          </CopyToClipboard>
        )}
      </div>
      {href && (
        <Link href={href} target="blank" className="capitalize text-primary">
          View
        </Link>
      )}
    </div>
  );
}

export default InfoBox;
