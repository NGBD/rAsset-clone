import React from "react";

function FailIcon(props) {
  return (
    <svg width={200} height={200} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M100 0C45 0 0 45 0 100s45 100 100 100 100-45 100-100S155 0 100 0zm12.5 162.5h-25v-25h25v25zm0-37.5h-25V37.5h25V125z" />
    </svg>
  );
}

export default FailIcon;
