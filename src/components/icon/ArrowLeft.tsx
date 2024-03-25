import * as React from "react";

function ArrowLeft({ ...props }) {
  return (
    <svg
      width={24}
      height={24}
      className="fill-[#2E3A59] dark:fill-white"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.83 11l3.58-3.59L10 6l-6 6 6 6 1.41-1.41L7.83 13H20v-2H7.83z" />
    </svg>
  );
}

export default ArrowLeft;
