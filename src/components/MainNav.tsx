"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Line from "./Line";
import AssetIcon from "./icon/AssetIcon";
import SharesIcon from "./icon/SharesIcon";
import RequestIcon from "./icon/RequestIcon";
import ProfileIcon from "./icon/ProfileIcon";
import DocsIcon from "./icon/DocsIcon";
import SupportIcon from "./icon/SupportIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "wagmi";
import { useEffect } from "react";
// import HomeIcon from "./icon/HomeIcon";
import MobileNav from "./MobileNav";
import { useTranslation } from "@/app/i18n/client";

function MainNav({ lng }) {
  const { t } = useTranslation(lng, "main-nav");
  const pathName = usePathname();
  const mainMenu = [
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
      isActive: pathName.includes("depositories"),
    },
  ];

  const settingMenu = [
    {
      id: "profile",
      name: t("profile"),
      href: `/${lng}/profile`,
      icon: <ProfileIcon />,

      isActive: pathName.includes("/profile"),
    },
    {
      id: "docs",
      name: t("docs"),
      href: `/${lng}/docs`,
      icon: <DocsIcon />,

      isActive: pathName.includes("/docs"),
    },
    {
      id: "support",
      name: t("support"),
      href: `/${lng}/support`,
      icon: <SupportIcon />,

      isActive: pathName.includes("/support"),
    },
  ];

  const { isLogin, handleLogout } = useAuthContext();
  const { address } = useAccount();

  useEffect(() => {
    if (isLogin && !address) {
      handleLogout();
    }
  }, [address, isLogin]);

  return (
    <div className="fixed md:top-[80px] left-0 md:w-[100px] md:h-full w-full h-[60px] gap-2 z-40 justify-between bg-white dark:bg-bgDark flex flex-col">
      <div className="md:hidden">
        <MobileNav lng={lng} />
      </div>
      <div className="md:flex flex-col gap-[10px] pt-[15px] hidden items-center">
        {mainMenu.map((i) => (
          <MenuItem key={`main-menu-${i?.id}`} name={i?.name} href={i?.href} icon={i?.icon} isActive={i?.isActive} />
        ))}
      </div>
      <div className="justify-between">
        <Line className="max-w-[60px] mx-auto bg-[#EFEAFA] hidden md:block" />
        <div className="md:flex flex-col gap-[10px] mt-1 items-center hidden pb-[100px]">
          {settingMenu.map((i) => (
            <MenuItem key={`main-menu-${i?.id}`} name={i?.name} href={i?.href} icon={i?.icon} isActive={i?.isActive} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainNav;

function MenuItem({ isActive = false, href = "", name = "", icon }) {
  return (
    <Link href={href}>
      <div className="flex items-center text-center flex-col gap-1">
        <div
          className={`flex justify-center w-[30px] h-[30px] mt-[9px] rounded-md items-center ${
            isActive ? "bg-primary" : "bg-gray-300 dark:bg-white"
          }`}
        >
          {icon}
        </div>
        <p
          className={`text-[14px] ${
            isActive ? "text-primary font-semibold" : "text-gray-700 dark:text-textDark font-medium"
          }`}
        >
          {name}
        </p>
      </div>
    </Link>
  );
}
