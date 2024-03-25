import * as React from "react";

function AssetIcon(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 15 15"
      fill="none"
      className="fill-white dark:fill-bgDarkSecondary"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.39 15L0 9.253l1.33-1.035 6.051 4.705 6.06-4.713 1.337 1.043L7.39 15zm0-3.506L1.337 6.79 0 5.747 7.39 0l7.388 5.747-1.346 1.043-6.043 4.704z" />
    </svg>
  );
}

export default AssetIcon;
