import React from "react";

function Title({ className = "", children }) {
  return <p className={`text-black font-bold dark:text-textDark text-2xl py-4 capitalize ${className}`}>{children}</p>;
}

export default Title;
