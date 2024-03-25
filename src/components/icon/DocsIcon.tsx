import * as React from "react";

function DocsIcon(props) {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.813 2C5.258 2 4 3.209 4 4.7v12.6C4 18.791 5.26 20 6.813 20H10.5v-4.562c0-.583 0-1.12.061-1.558.068-.486.229-.993.658-1.406.424-.407.936-.553 1.423-.616.447-.058 1-.058 1.612-.058H19V4.7C19 3.209 17.74 2 16.187 2H6.813zm11.884 11.8h-4.384c-.69 0-1.112.002-1.415.041-.141.018-.217.04-.256.056-.03.012-.036.018-.037.02-.001 0-.004.002-.012.02a.901.901 0 00-.051.22c-.04.283-.042.677-.042 1.343v4.23c.28-.13.537-.306.761-.52l4.915-4.72c.213-.203.388-.437.521-.69z"
      />
    </svg>
  );
}

export default DocsIcon;
