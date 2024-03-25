import * as React from "react";

function SupportIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className="fill-white dark:fill-bgDarkSecondary"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.68 3.32l.613-.613a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L9.5 8.5a.982.982 0 00-.183 1.133 11.293 11.293 0 005.05 5.05.982.982 0 001.133-.184l1.793-1.792a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414l-.613.613a6 6 0 01-7.843.558l-1.208-.907a22.996 22.996 0 01-4.6-4.6l-.907-1.208A6 6 0 016.68 3.32z" />
    </svg>
  );
}

export default SupportIcon;
