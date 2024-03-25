import React from "react";

function LinkIcon({ ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className="fill-[#000000] dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.002 20h-11a2 2 0 01-2-2V7a2 2 0 012-2h4v2h-4v11h11v-4h2v4a2 2 0 01-2 2zm-5.3-6.293l-1.41-1.414L16.585 6h-3.583V4h7v7h-2V7.415l-6.3 6.292z" />
    </svg>
  );
}

export default LinkIcon;
