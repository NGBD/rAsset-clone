import React from "react";
import ComingSoon from "./icon/ComingSoon";

function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px-56px)]">
      <ComingSoon className="md:w-[400px] md:h-[400px] w-[350px] fill-primary dark:fill-white" />
      <p className="mt-6 text-5xl dark:text-textDark">Coming soon!</p>
    </div>
  );
}

export default ComingSoonPage;
