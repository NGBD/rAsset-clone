import React from "react";

function DragIcon(props) {
  return (
    <svg width={54} height={54} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 10c0-3.771 0-5.657 1.172-6.828C4.343 2 6.229 2 10 2h34c3.771 0 5.657 0 6.828 1.172C52 4.343 52 6.229 52 10v34c0 3.771 0 5.657-1.172 6.828C49.657 52 47.771 52 44 52H10c-3.771 0-5.657 0-6.828-1.172C2 49.657 2 47.771 2 44V10z"
        stroke="#5550DC"
        strokeWidth={3}
      />
      <path
        d="M27 15.89v22.223M38.111 27H15.89"
        stroke="#5550DC"
        strokeWidth={4}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DragIcon;
