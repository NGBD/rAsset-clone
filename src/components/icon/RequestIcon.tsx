import * as React from "react";

function RequestIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className="fill-white dark:fill-bgDarkSecondary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.013 9.151C3 9.691 3 10.302 3 11v2c0 2.828 0 4.243.879 5.121C4.757 19 6.172 19 9 19h6c2.828 0 4.243 0 5.121-.879C21 17.243 21 15.828 21 13v-2c0-.698 0-1.31-.013-1.849l-8.016 4.453a2 2 0 01-1.942 0L3.013 9.151zm.23-2.121c.083.02.164.052.243.096L12 11.856l8.514-4.73c.079-.044.16-.075.243-.096-.13-.474-.33-.845-.636-1.151C19.243 5 17.828 5 15 5H9c-2.828 0-4.243 0-5.121.879-.307.306-.506.677-.636 1.15z"
      />
    </svg>
  );
}

export default RequestIcon;
