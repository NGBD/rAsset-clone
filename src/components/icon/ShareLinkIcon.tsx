import * as React from "react";

function ShareLinkIcon(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      className="fill-[#5550DC] dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2.208 7.785c.551-.002 1.081-.2 1.485-.557L7.635 9.37c-.273 1.014.279 2.065 1.296 2.468 1.017.402 2.19.034 2.755-.865s.35-2.056-.505-2.716a2.304 2.304 0 00-2.9.084L4.34 6.2c.041-.15.064-.305.068-.46l3.874-2.105a2.285 2.285 0 002.765.148c.842-.579 1.143-1.64.721-2.542C11.345.338 10.316-.16 9.299.046c-1.016.207-1.74 1.062-1.737 2.05.002.173.027.344.073.511l-3.58 1.944C3.483 3.708 2.36 3.37 1.38 3.745.4 4.121-.16 5.105.04 6.09c.203.986 1.112 1.696 2.168 1.695z" />
    </svg>
  );
}

export default ShareLinkIcon;
