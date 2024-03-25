import React from "react";

function VIcon({ ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className="fill-[#5550DC]"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.695 17.825a1 1 0 01-1.383.198l-5.518-4.041a1 1 0 01-.225-1.385l.545-.77a1 1 0 011.405-.23l3.197 2.331a1 1 0 001.38-.194l5.388-6.941a1 1 0 011.406-.174l.73.57a1 1 0 01.176 1.397l-7.1 9.24z" />
    </svg>
  );
}

export default VIcon;
