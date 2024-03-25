import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VIcon from "./icon/VIcon";
import CopyIcon from "./icon/CopyIcon";

function RowInfo({ label, value, copy }: { label: string; value?: any; copy?: string; status?: boolean }) {
  const [copiedText, setCopiedText] = useState(false);

  const handleCopy = () => {
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-between text-base gap-1">
      <p>{label}</p>
      <div className="flex gap-1 items-center">
        {value && <div className="font-bold whitespace-nowrap">{value}</div>}
        {copy && (
          <CopyToClipboard onCopy={handleCopy} text={copy}>
            <div className="bg-transparent rounded cursor-pointer">{copiedText ? <VIcon /> : <CopyIcon />}</div>
          </CopyToClipboard>
        )}
      </div>
    </div>
  );
}

export default RowInfo;
