import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "./icon/CopyIcon";
import VIcon from "./icon/VIcon";
import OtpPopup from "./OtpPopup";
import RemovePopup from "./RemovePopup";

interface SecondaryInput extends React.InputHTMLAttributes<HTMLInputElement> {
  accessoriesLeft?: ReactNode;
  accessoriesRight?: ReactNode;
  title?: string;
  classNameInput?: string;
  verify?: string;
  copy?: string;
  typeData?: string;
  onRemove?: any;
  valueInput?: string;
}

function SecondaryInput({
  valueInput = "",
  typeData = "",
  verify = "",
  className = "",
  classNameInput = "",
  accessoriesLeft,
  accessoriesRight,
  title,
  copy,
  type,
  ...attributes
}: SecondaryInput) {
  const [copiedText, setCopiedText] = useState(false);
  const hasValue = valueInput.trim() !== "";

  const handleCopy = () => {
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 3000);
  };

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  };
  return (
    <div className={`text-base w-full py-2 px-6 border rounded-md border-input ${className}`}>
      {title && <p className="mb-1 text-sm capitalize text-title font-medium">{title}</p>}
      <div className="relative w-full">
        <div className="absolute top-2 left-4">{accessoriesLeft}</div>
        <div className="absolute top-2 right-4">{accessoriesRight}</div>
        <div className="flex gap-2">
          <input
            {...attributes}
            type={type}
            max={type === "date" ? getTodayDate() : undefined}
            className={twMerge(
              `border-gray-400 w-full font-semibold min-w-450 rounded-md outline-none text-base bg-white dark:bg-bgDark dark:text-textDark smooth-transform placeholder:font-semibold ${
                accessoriesLeft ? "pl-11" : ""
              } ${accessoriesRight ? "pr-11" : ""}`,
              classNameInput
            )}
          />
          <div className="flex gap-2 items-center">
            {verify && typeData && hasValue && <RemovePopup updateKey={typeData} keyWord={title} />}
            {!verify && typeData && hasValue && <OtpPopup keyWord={title} valueInput={valueInput} />}
            {copy && (
              <CopyToClipboard onCopy={handleCopy} text={copy}>
                <div className="bg-transparent rounded cursor-pointer">{copiedText ? <VIcon /> : <CopyIcon />}</div>
              </CopyToClipboard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryInput;
