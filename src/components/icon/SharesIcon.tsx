import * as React from "react";

function SharesIcon(props) {
  return (
    <svg
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      className="fill-white dark:fill-bgDarkSecondary"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.879.879C0 1.757 0 3.172 0 6v3c0 2.828 0 4.243.879 5.121C1.757 15 3.172 15 6 15h8.667c.31 0 .464 0 .595-.011a3 3 0 002.727-2.728c.011-.13.011-.285.011-.594h-5.6a2.5 2.5 0 010-5H18V6c0-2.828 0-4.243-.879-5.121C16.243 0 14.828 0 12 0H6C3.172 0 1.757 0 .879.879zM4.5 3.167a1 1 0 100 2h2.7a1 1 0 100-2H4.5z"
      />
    </svg>
  );
}

export default SharesIcon;
