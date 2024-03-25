import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ArrowDownFilter from "./icon/ArrowDownFilter";

function FilterDropDown({ title = "All", listDropdown, showing, setShowing, textDefault = "", className = "" }) {
  const node = useRef();
  const [isOpen, toggleOpen] = useState(false);

  const toggleOpenMenu = () => {
    if (listDropdown?.length > 0) {
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
      y: -5,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
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
    <motion.div className={`relative max-w-[180px] w-full text-[#000000] dark:text-textDark ${className}`}>
      <div ref={node}>
        {title && <p className="mb-1 text-base text-gray dark:text-textDark">{title}</p>}
        <div
          onClick={toggleOpenMenu}
          className={`flex items-center h-[40px] justify-between gap-2 px-1 rounded-md py-1 border-b-2 border-[#394F68] cursor-pointer capitalize dark:bg-bgDarkSecondary hover:border-primary smooth-transform`}
        >
          <div className="flex items-center gap-1">
            <p>{showing?.typeName || showing?.name || textDefault}</p>
          </div>
          <ArrowDownFilter />
        </div>
      </div>

      <motion.div
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
        className={`absolute right-0 w-full shadow-md`}
        style={{
          borderRadius: 12,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 1,
        }}
      >
        <div
          id="list-dropdown"
          className="smooth-transform z-50 flex w-full flex-col gap-1 rounded-b-md  bg-[#fff] dark:bg-bgDark py-3  max-h-[250px] overflow-y-auto"
        >
          {listDropdown?.map((i, index) => (
            <DropDownItem key={index} data={i} setShowing={setShowing} showing={showing} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FilterDropDown;

function DropDownItem({ data, showing, setShowing }) {
  const isSelected = showing === data;

  return (
    <div
      onClick={() => setShowing(data)}
      className={`w-full px-4 py-3 text-sm cursor-pointer capitalize bg-opacity-20 hover:bg-[#2F8DE415] smooth-transform ${
        isSelected ? "bg-[#2F8DE4] text-black dark:text-textDark" : ""
      }`}
    >
      {data?.typeName || data?.name}
      {isSelected && <span className="ml-2">✓</span>}
    </div>
  );
}
