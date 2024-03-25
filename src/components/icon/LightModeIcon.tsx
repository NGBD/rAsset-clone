import React from "react";

function LightModeIcon(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={4} fill="#000000" />
      <path
        d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.413M5.636 18.363L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.413M5.636 5.637L7.05 7.05"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default LightModeIcon;
