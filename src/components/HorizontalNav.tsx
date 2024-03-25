"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useMultiLanguage from "@/hooks/useMultiLanguage";
import DropDownLanguage from "./DropDownLanguage";
import DarkModeSwitcher from "./DarkModeSwitcher";
import Logo from "./icon/Logo";
import { useThemeContext } from "@/contexts/ThemeContext";
import { CustomConnectButton } from "./CustomConnectButton";

function HorizontalNav() {
  const { currentLang } = useMultiLanguage();
  const [languageSelected, setLanguageSelected] = useState<any>();
  const { currentTheme } = useThemeContext();

  return (
    <div className="fixed top-0 w-full gap-2 pl-[7px] right-0 hidden items-center z-30 dark:bg-bgDark justify-between bg-white md:flex">
      <Link href={`/${currentLang}/assets`} className="pr-5 pl-4 py-[15px]">
        <Logo />
      </Link>
      <div className={`mr-4  w-full flex justify-end items-center gap-5`}>
        <CustomConnectButton />
        <div className={`${currentTheme === "dark" ? "custom-connect-wallet-btn-dark" : ""}`}>
          <ConnectButton />
        </div>

        <DropDownLanguage
          showing={languageSelected}
          setShowing={setLanguageSelected}
          className="shadow-mobileButton w-10 h-10"
        />
        <DarkModeSwitcher />
      </div>
    </div>
  );
}

export default HorizontalNav;
