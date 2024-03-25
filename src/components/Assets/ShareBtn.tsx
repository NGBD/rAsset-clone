import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import MotionDialogContent from "../MotionDialogContent";
import TwitterIcon from "../icon/TwitterIcon";
import ShareLinkIcon from "../icon/ShareLinkIcon";
import CloseDialogIcon from "../icon/CloseDialogIcon";
import CopyIcon from "../icon/CopyIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VIcon from "../icon/VIcon";
import QRCode from "qrcode.react";
import { FacebookIcon, FacebookShareButton, TelegramShareButton, TwitterShareButton } from "react-share";
import TelegramIcon2 from "../icon/TelegramIcon2";
import { PUBLIC_URL } from "@/constants";

function ShareBtn({ className = "", slug }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const [copiedText, setCopiedText] = useState(false);
  const prefixLink = PUBLIC_URL;
  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer" onClick={open}>
        <ShareLinkIcon />
      </div>

      <AnimatePresence>
        {showDialog && (
          <DialogOverlay onDismiss={close} className="z-50 w-full items-center flex text-black dark:text-white">
            <MotionDialogContent
              aria-label="Share popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 w-[450px] !bg-transparent"
              style={{ width: "350px", padding: "0" }}
            >
              <motion.div
                className="flex flex-col bg-white dark:bg-[#23262F] p-8 md:w-[450px] w-[350px] gap-4 rounded-[20px]"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between ">
                    <div className="text-[24px] font-bold">Share</div>
                    <div className="border border-grayLight dark:border-[#353945] rounded-full w-8 h-8 flex items-center justify-center">
                      <CloseDialogIcon onClick={close} className="cursor-pointer fill-black dark:fill-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      className="w-[160px] h-[160px] border-dashed border-[#5550DC] border-[2px] flex justify-center
                  items-center rounded-lg"
                    >
                      <div className="rounded-[8px] bg-[#554FDE] p-2">
                        <QRCode value={`${prefixLink}/${slug}`} size={110} fgColor="white" bgColor="#554FDE" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold leading-3 text-[16px] pb-3">COPY LINK</p>
                    <CopyToClipboard onCopy={() => setCopiedText(true)} text={`${prefixLink}/${slug}`}>
                      <div className="flex justify-between border border-[#E6E8EC] dark:border-[#353945] gap-5 px-4 py-3 rounded-md">
                        <p className="font-semibold text-[16px] overflow-hidden">{`${prefixLink}/${slug}`}</p>
                        <div className="bg-transparent rounded cursor-pointer">
                          {copiedText ? <VIcon /> : <CopyIcon />}
                        </div>
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div>
                    <p className="font-bold leading-3 text-[16px] pb-3">SHARE SOCIAL</p>
                    <div className="flex justify-between md:gap-4 gap-2 items-center">
                      <div className="border w-[110px] border-[#E6E8EC] dark:border-[#353945] md:p-4 p-2 flex gap-4 flex-col rounded-md items-center">
                        <FacebookShareButton url={`${prefixLink}/${slug}`}>
                          <FacebookIcon className="rounded-full w-8 h-8" />
                        </FacebookShareButton>
                        <p className="text-[16px] font-semibold">Facebook</p>
                      </div>
                      <div className="border w-[110px] border-[#E6E8EC] dark:border-[#353945] md:p-4 p-2 flex gap-4 flex-col rounded-md items-center">
                        <TelegramShareButton url={`${prefixLink}/${slug}`}>
                          <TelegramIcon2 className="w-8 h-8  fill-black" />
                        </TelegramShareButton>
                        <p className="text-[16px] font-semibold">Telegram</p>
                      </div>
                      <div className="border w-[110px] border-[#E6E8EC] dark:border-[#353945] md:p-4 p-2 flex gap-4 flex-col rounded-md items-center">
                        <TwitterShareButton url={`${prefixLink}/${slug}`}>
                          <TwitterIcon className="w-8 h-7 fill-black dark:fill-white" />
                        </TwitterShareButton>
                        <p className="text-[16px] font-semibold">X</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShareBtn;
