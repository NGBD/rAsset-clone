"use client";
import React from "react";
import ArrowDownIconBlack from "../icon/ArrowDownIconBlack";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function FAQQuestionBlock({ data, openDetail, handleOpenDetail }) {
  const subMenuAnimate = {
    open: { opacity: 1, height: "auto", display: "block" },
    collapsed: {
      opacity: 0,
      height: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };
  return (
    <div className="rounded-md border border-input px-6 py-2 dark:text-textDark smooth-transform">
      <div className="flex justify-between items-center cursor-pointer" onClick={handleOpenDetail}>
        <div className="font-medium flex gap-2">
          {`${data?.id}.`} {`${data?.question}`}
        </div>
        <div>
          <ArrowDownIconBlack
            className={`smooth-transform ${openDetail ? "rotate-180" : ""} dark:stroke-[#FFFFFF] stroke-black`}
          />
        </div>
      </div>
      <AnimatePresence>
        <motion.section
          initial="collapsed"
          animate={openDetail ? "open" : "collapsed"}
          variants={subMenuAnimate}
          className={`font-normal border-l-2 dark:border-white border-black bg-white dark:bg-bgDark pl-2 ml-2`}
          transition={{
            duration: 0.4,
            ease: [0.04, 0.62, 0.73, 0.98],
          }}
        >
          {data?.href && (
            <Link className="text-blue-500 underline" target="blank" href={data?.href}>
              Click here
            </Link>
          )}
          {data?.title}
          {data?.list?.map((i) => (
            <div key={i?.id}>
              {i?.title && <p>{i?.title}</p>}
              {i?.answer && <p className="text-justify">{i?.answer}</p>}
            </div>
          ))}
          {data?.detail && <p className="text-justify">{data?.detail}</p>}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

export default FAQQuestionBlock;
