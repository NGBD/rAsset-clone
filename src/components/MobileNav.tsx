import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AssetIcon from "./icon/AssetIcon";
// import HomeIcon from "./icon/HomeIcon";
import RequestIcon from "./icon/RequestIcon";
import SharesIcon from "./icon/SharesIcon";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CloseDialogIcon from "./icon/CloseDialogIcon";
import HamburgerIcon from "./icon/HambugerIcon";
import DocsIcon from "./icon/DocsIcon";
import ProfileIcon from "./icon/ProfileIcon";
import SupportIcon from "./icon/SupportIcon";
import DropDownLanguage from "./DropDownLanguage";
import DarkModeSwitcher from "./DarkModeSwitcher";
import Line from "./Line";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useTranslation } from "@/app/i18n/client";
import { CustomConnectButton } from "./CustomConnectButton";

function MobileNav({ lng }) {
  const { t } = useTranslation(lng, "main-nav");
  const pathName = usePathname();
  const [languageSelected, setLanguageSelected] = useState<any>();
  const { currentTheme } = useThemeContext();

  const mobileMenu = [
    // {
    //   id: "home",
    //   name: t("home"),
    //   href: `/${lng}`,
    //   icon: <HomeIcon />,
    //   isActive: pathName === "/en" || pathName === "/vi",
    // },
    {
      id: "assets",
      name: t("assets"),
      href: `/${lng}/assets`,
      icon: <AssetIcon />,
      isActive: pathName.includes("/assets"),
    },
    {
      id: "shares",
      name: t("shares"),
      href: `/${lng}/shares`,
      icon: <SharesIcon />,
      isActive: pathName.includes("/shares"),
    },
    {
      id: "depositories",
      name: t("depositories"),
      href: `/${lng}/depositories`,
      icon: <RequestIcon />,
      isActive: pathName.includes("/depositories"),
    },
  ];

  const settingMobileMenu = [
    {
      id: "profile",
      name: t("profile"),
      href: "/profile",
      icon: <ProfileIcon />,

      isActive: pathName.includes("/profile"),
    },
    {
      id: "docs",
      name: t("docs"),
      href: "/docs",
      icon: <DocsIcon />,

      isActive: pathName.includes("/docs"),
    },
    {
      id: "support",
      name: t("support"),
      href: "/support",
      icon: <SupportIcon />,

      isActive: pathName.includes("/support"),
    },
  ];

  const node = useRef();
  const [isHover, toggleHover] = useState(false);

  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const handleClickOutside = (e) => {
    // @ts-ignore
    if (node.current?.contains(e.target)) {
      return;
    }
    toggleHover(false);
  };

  useEffect(() => {
    if (isHover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHover]);

  const sidebar = {
    open: (height = 1200) => ({
      pointerEvents: "all",
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      zIndex: 99,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      pointerEvents: "none",
      clipPath: "circle(0px at 0px 0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <div ref={node} className="relative">
      <motion.div className="w-full">
        <div className={`flex items-center justify-between px-3 gap-2 h-[60px] w-full`}>
          <HamburgerIcon onClick={toggleHoverMenu} />
          <div
            className={` w-full flex justify-end items-center gap-1 ${
              currentTheme === "dark" ? "custom-connect-wallet-btn-dark" : "custom-connect-wallet-btn"
            }`}
          >
            <CustomConnectButton />
            <ConnectButton accountStatus={"avatar"} />
            <DropDownLanguage
              showing={languageSelected}
              setShowing={setLanguageSelected}
              className="item-center w-10 h-10 shadow-mobileButton"
            />
            <DarkModeSwitcher />
          </div>
        </div>
        <motion.div
          initial={false}
          animate={isHover ? "open" : "closed"}
          // @ts-ignore
          variants={sidebar}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            transformOrigin: "50% -30px",
            height: "100vh",
            width: "100vw",
            overflowY: "auto",
          }}
          className="bg-white dark:bg-bgDark"
        >
          <motion.div variants={variants} className="h-full mt-0">
            <div className="flex flex-col justify-between z-50 w-full h-screen pt-[18px] pb-8 px-3">
              <div className="flex items-center justify-between">
                <HamburgerIcon />
                <CloseDialogIcon onClick={toggleHoverMenu} className="fill-black dark:fill-white" />
              </div>
              <Line className="mt-5 mb-3 bg-[#EFEAFA]" />
              <div className="h-full flex justify-between flex-col">
                <div className="flex flex-col gap-2" onClick={toggleHoverMenu}>
                  {mobileMenu.map((i) => (
                    <MobileMenuItem key={i?.id} href={i?.href} label={i?.name} icon={i?.icon} isActive={i?.isActive} />
                  ))}
                </div>
                <div className="flex flex-col gap-2" onClick={toggleHoverMenu}>
                  {settingMobileMenu.map((i) => (
                    <MobileMenuItem key={i?.id} href={i?.href} label={i?.name} icon={i?.icon} isActive={i?.isActive} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MobileNav;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function MobileMenuItem({ href, isActive, icon, label, ...props }) {
  return (
    <motion.div variants={variants} whileTap={{ scale: 0.95 }} className="w-full">
      <Link
        href={href || "/"}
        className={`items-center rounded py-2 gap-5 flex cursor-pointer ${
          isActive ? " bg-[#2F8DE415]" : "bg-transparent"
        }`}
        {...props}
      >
        <div className={`flex w-[30px] h-[30px] justify-center rounded-md items-center bg-gray-300`}>{icon}</div>
        <p
          className={`text-sm text-center ${
            isActive ? "text-primary" : "text-gray-700 dark:text-textDark font-medium"
          }`}
        >
          {label}
        </p>
      </Link>
    </motion.div>
  );
}
