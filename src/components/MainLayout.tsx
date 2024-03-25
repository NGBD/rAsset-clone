"use client";
import React from "react";
import HorizontalNav from "./HorizontalNav";
import MainNav from "./MainNav";

function MainLayout({ lng, children }) {
  return (
    <div>
      <HorizontalNav />
      <MainNav lng={lng} />

      <div className="min-w-full min-h-screen md:pt-20 pt-[60px] md:pl-[100px] text-black bg-bgPrimary dark:bg-bgDarkSecondary">
        <div className={`px-4 pb-10 }`}>{children}</div>
      </div>
      <div className="fixed bottom-0 w-full text-center md:ml-[50px] bg-bgPrimary dark:bg-bgDarkSecondary dark:text-textDark text-black text-xs pb-1">
        <p> Copyright © 2024 Rasset LLC. All rights reserved</p>
      </div>
    </div>
  );
}

export default MainLayout;
