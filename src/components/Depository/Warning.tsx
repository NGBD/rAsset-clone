import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import MotionDialogContent from "../MotionDialogContent";
import NotificationTab from "./NotificationTab";
import FailIcon from "../icon/FailIcon";
import CloseDialogIcon from "../icon/CloseDialogIcon";

function Warning({ className = "", name }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer p-4 hover:bg-blue-200 dark:hover:bg-bgDarkSecondary" onClick={open}>
        <p className=" whitespace-nowrap">{name}</p>
      </div>
      <AnimatePresence>
        {showDialog && (
          <DialogOverlay
            onDismiss={close}
            className="z-50 flex items-center justify-center w-full text-black dark:text-textDark"
          >
            <MotionDialogContent
              aria-label="Verify infomation popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 min-w-[343px] !m-0 !bg-transparent"
              style={{ width: 500 }}
            >
              <motion.div className="flex flex-col bg-white rounded-xl" initial={{ y: +30 }} animate={{ y: 0 }}>
                <div className="w-full bg-white dark:bg-bgDark rounded-md p-3">
                  <div className="flex md:items-center items-start gap-2 justify-end">
                    <CloseDialogIcon onClick={close} className="cursor-pointer fill-black dark:fill-white" />
                  </div>
                  <NotificationTab
                    className="justify-center"
                    icon={<FailIcon className="w-[100px] h-[100px] fill-primary dark:fill-[#ffffff]" />}
                    thirdRow="Please verify your account information to continue!"
                    action={"View profile"}
                    href="/profile"
                  />
                </div>
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Warning;
