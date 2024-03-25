import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ArrowDownIconBlack from "../icon/ArrowDownIconBlack";

function DropDown({
  title = "",
  listDropdown,
  showing,
  setShowing,
  textDefault = "",
  className = "",
  placeholder = "",
}) {
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
    <motion.div className={`relative w-full border rounded-md border-input px-6 py-2 text-[#000000] ${className}`}>
      <div ref={node}>
        {title && <p className="mb-1 text-sm text-title font-medium">{title}</p>}
        <div
          onClick={toggleOpenMenu}
          className={`flex items-center h-[24px] justify-between gap-2 border-[#394F68] cursor-pointer capitalize hover:border-primary smooth-transform`}
        >
          <div className="flex items-center gap-1">
            {showing ? (
              <p className="text-[#000000] font-semibold dark:text-textDark text-base">
                {showing?.typeName || showing?.name || textDefault}
              </p>
            ) : (
              <p className="text-[#9ca3af] font-semibold text-base">{placeholder}</p>
            )}
          </div>
          <ArrowDownIconBlack />
        </div>
      </div>

      <motion.div
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={subMenuAnimate}
        className={`absolute right-0 w-full shadow-md`}
        style={{
          borderRadius: 5,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 1,
        }}
      >
        <div
          id="list-dropdown"
          className="smooth-transform z-50 flex w-full flex-col gap-1 rounded-b-md bg-[#fff] dark:bg-bgDark dark:text-textDark py-3 max-h-[250px] overflow-y-auto border"
        >
          {listDropdown?.map((i, index) => (
            <DropDownItem key={index} data={i} setShowing={setShowing} showing={showing} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DropDown;

function DropDownItem({ data, showing, setShowing }) {
  const isSelected = showing === data;

  return (
    <div
      onClick={() => setShowing(data)}
      className={`w-full px-6 py-3 m text-sm cursor-pointer capitalize bg-opacity-20 hover:bg-[#2F8DE415] smooth-transform ${
        isSelected ? "bg-[#2F8DE4] text-black" : ""
      }`}
    >
      {data?.typeName || data?.name}
      {isSelected && <span className="ml-2">✓</span>}
    </div>
  );
}
