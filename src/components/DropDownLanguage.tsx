import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ArrowDownIconBlack from "./icon/ArrowDownIconBlack";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { languages } from "@/app/i18n/settings";

function DropDownLanguage({ showing, setShowing, className = "" }) {
  const node = useRef();
  const [isOpen, toggleOpen] = useState(false);
  const param = useParams();

  const toggleOpenMenu = () => {
    if (languages?.length > 0) {
      toggleOpen(!isOpen);
    }
  };

  const handleClickOutside = (e) => {
    // @ts-ignore
    if (node?.current?.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  useEffect(() => {
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
      y: 50,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      y: 50,
      transition: {
        duration: 0.2,
        delay: 0.05,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <motion.div
      className={`relative w-full max-w-[60px] text-base rounded-md border-[#00000] dark:bg-bgDarkSecondary flex items-center text-[#000000] dark:text-primary ${className}`}
    >
      <div ref={node} className="w-full">
        <div
          className={`flex items-center justify-between cursor-pointer uppercase smooth-transform`}
          onClick={toggleOpenMenu}
        >
          <div className="flex items-center w-full justify-between px-2">
            <p className="text-[#000000] dark:text-textDark text-base font-semibold">{showing || param.lng}</p>
            <ArrowDownIconBlack className="w-[14px] h-[7px] dark:stroke-[#FFFFFF] stroke-black" />
          </div>
        </div>
      </div>
      <motion.div
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
        className={`absolute w-full right-0 shadow-md `}
        style={{
          borderRadius: 12,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 1,
        }}
      >
        <div
          id="list-dropdown"
          className="smooth-transform z-50 w-full flex flex-col rounded-b-md bg-[#ffff] dark:bg-bgDark max-h-[250px] dark:text-title overflow-y-auto"
        >
          {languages?.map((lng, index) => (
            <DropDownItem key={index} lng={lng} setShowing={setShowing} param={param} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DropDownLanguage;

function DropDownItem({ lng, setShowing, param }) {
  const isSelected = lng === param.lng;
  const pathname = usePathname();
  const newPathName = `/${lng}/${pathname.substring(4)}`;

  return (
    <Link href={`${newPathName}`}>
      <div
        onClick={() => setShowing(lng)}
        className={`w-full py-1 px-2 uppercase text-base flex justify-between cursor-pointer bg-opacity-20 hover:bg-[#2F8DE415] smooth-transform ${
          isSelected ? "bg-[#2F8DE4] text-black dark:text-textDark" : ""
        }`}
      >
        {lng}
        {isSelected && <span>✓</span>}
      </div>
    </Link>
  );
}
