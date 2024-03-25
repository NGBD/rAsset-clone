import React, { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../PrimaryBtn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api-modules/profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "wagmi";
import Warning from "./Warning";
import { useTranslation } from "@/app/i18n/client";
import Line from "../Line";

function NewDepositoryBtn({ className = "", lng }) {
  const { t } = useTranslation(lng, "depositories");
  const node = useRef();
  const [isOpen, toggleOpen] = useState(false);
  const { address } = useAccount();
  const { isLogin } = useAuthContext();

  const toggleOpenMenu = () => {
    toggleOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // @ts-ignore
      if (node?.current?.contains(e.target)) {
        return;
      }
      toggleOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      y: 5,
      x: -97,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      x: -97,
      transition: {
        duration: 0.2,
        delay: 0.05,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const { data: userProfile } = useQuery(
    ["getUserProfile", address, isLogin],
    async () => {
      const response = await getUserProfile();
      return response;
    },
    {
      enabled: isLogin && !!address,
    }
  );

  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer" ref={node} onClick={toggleOpenMenu}>
        <PrimaryBtn accessoriesLeft="+" className="h-10 font-semibold text-base uppercase">
          {t("create")}
        </PrimaryBtn>
      </div>
      <motion.div
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
        className={`absolute w-[215px] rounded-md dark:bg-bgDark z-[1] dark:text-textDark bg-white`}
      >
        {userProfile?.data?.isEmailVerified ||
        userProfile?.data?.isPhoneNumberVerified ||
        userProfile?.data?.isTwitterVerified ||
        userProfile?.data?.isTelegramVerified ? (
          <Link href={`/depositories/create-depository`}>
            <div className="cursor-pointer p-4 hover:bg-blue-200 dark:hover:bg-bgDarkSecondary">
              <p className=" whitespace-nowrap">{t("reg-depository-btn")}</p>
            </div>
          </Link>
        ) : (
          <Warning name={"Registration Depository"} />
        )}
        <Line className="bg-white" />
        {userProfile?.data?.isEmailVerified ||
        userProfile?.data?.isPhoneNumberVerified ||
        userProfile?.data?.isTwitterVerified ||
        userProfile?.data?.isTelegramVerified ? (
          <Link href={"/depositories/create-release"}>
            <div className="cursor-pointer p-4 hover:bg-blue-200 dark:hover:bg-bgDarkSecondary">
              <p className=" whitespace-nowrap">{t("reg-release-btn")}</p>
            </div>
          </Link>
        ) : (
          <Warning name={"Registration Release"} />
        )}
      </motion.div>
    </div>
  );
}

export default NewDepositoryBtn;
