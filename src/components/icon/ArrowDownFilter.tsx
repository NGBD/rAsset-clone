import React from "react";

function ArrowDownFilter(props) {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.819 5.29004H13.662L8.11965 10.5805L2.69116 5.29004H3.42034H8.11965H12.819Z" fill="#06041D" />
      <mask id="mask0_70_947" maskUnits="userSpaceOnUse" x="2" y="5" width="12" height="6">
        <path d="M12.819 5.29004H13.662L8.11965 10.5805L2.69116 5.29004H3.42034H8.11965H12.819Z" fill="white" />
      </mask>
      <g mask="url(#mask0_70_947)" className="fill-[#000000] dark:fill-[#FFFFFF]">
        <rect x="0.114014" width="16.0112" height="15.2836" stroke="#293A4E" />
      </g>
    </svg>
  );
}

export default ArrowDownFilter;
