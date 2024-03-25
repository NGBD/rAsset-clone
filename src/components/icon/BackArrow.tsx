import React from "react";

function BackArrow(props) {
  return (
    <svg width={8} height={12} viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 5l5 5V0L0 5z" fill="#2E3A59" />
    </svg>
  );
}

export default BackArrow;
