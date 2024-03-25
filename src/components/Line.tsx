import React from "react";

function Line({ className = "" }) {
  return <div className={`w-full h-[1px] ${className}`}></div>;
}

export default Line;
