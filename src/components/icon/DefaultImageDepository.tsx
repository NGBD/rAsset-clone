import React from "react";

function DefaultImageDepository(props) {
  return (
    <svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      className="fill-[#000000] dark:fill-white"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 14V3h-3V0H2v14H0v1h7v-3h2v3h7v-1h-2zm-8-4H4V8h2v2zm0-3H4V5h2v2zm0-3H4V2h2v2zm3 6H7V8h2v2zm0-3H7V5h2v2zm0-3H7V2h2v2zm4 6h-2V8h2v2zm0-3h-2V5h2v2z" />
    </svg>
  );
}

export default DefaultImageDepository;
