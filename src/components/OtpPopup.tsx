import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import MotionDialogContent from "./MotionDialogContent";
import CloseDialogIcon from "./icon/CloseDialogIcon";
import OtpInput from "react-otp-input";
import PrimaryBtn from "./PrimaryBtn";
import { toast } from "react-toastify";

function OtpPopup({ className = "", keyWord, valueInput }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
    setOtp("");
    clearTimeout(countdownTimer);
  };
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [count, setCount] = useState(120);

  let countdownTimer;
  useEffect(() => {
    if (sendOtp && count > 0) {
      countdownTimer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      clearTimeout(countdownTimer);
      setSendOtp(false);
    }

    return () => {
      clearTimeout(countdownTimer);
    };
  }, [count, sendOtp]);

  const hanldeGetCode = () => {
    setSendOtp(true);
    setCount(120);
  };

  useEffect(() => {
    if (otp === "123456") {
      setShowDialog(false);
      toast.success("Verification successful");
    } else if (otp.length === 6) {
      toast.error("Incorrect Code");
      setOtp("");
    }
  }, [otp]);

  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer flex gap-2 items-center" onClick={open}>
        <p className="text-[#FD3E14] bg-[#FD3E14] px-1 h-4 bg-opacity-20 whitespace-nowrap rounded-md text-xs">
          {"Unverified"}
        </p>
        <p className="underline text-primary">{"Verifiy"}</p>
      </div>
      <AnimatePresence>
        {showDialog && (
          <DialogOverlay onDismiss={close} className="z-50 flex items-center justify-center w-full text-black">
            <MotionDialogContent
              aria-label="Tokenize popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 min-w-[343px] !m-0 md:min-w-[460px] !bg-transparent"
              style={{ width: 550 }}
            >
              <motion.div
                className="flex flex-col md:gap-4 gap-2 bg-white dark:bg-bgDark text-black dark:text-textDark p-4 rounded-md"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                <div className="flex md:items-center items-start gap-2 justify-between">
                  <p className="font-semibold md:text-2xl text-lg">{`Enter ${keyWord} Verification Code`}</p>
                  <CloseDialogIcon onClick={close} className="cursor-pointer fill-black dark:fill-white" />
                </div>
                <div className="md:text-base text-sm font-medium">
                  {`A 6-digit code was sent to ${valueInput}.`}
                  <br /> Enter it within 2 minutes.
                </div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType="number"
                  containerStyle={"w-full flex justify-between"}
                  renderInput={(props) => (
                    <div className="md:w-[50px] md:h-[50px] w-8 h-8 border border-input flex justify-center  rounded-md">
                      <input {...props} className="focus:outline-none bg-white dark:bg-bgDark" />
                    </div>
                  )}
                />
                {!sendOtp && (
                  <PrimaryBtn className="md:w-[150px] w-[100px] md:mt-4 md:h-10 h-8" onClick={hanldeGetCode}>
                    Get Code
                  </PrimaryBtn>
                )}
                {sendOtp && 0 <= count && count <= 120 && (
                  <PrimaryBtn
                    className="md:w-[150px] w-[100px] md:h-10 h-8 md:mt-4 bg-[#D9D9D9] whitespace-nowrap"
                    onClick={hanldeGetCode}
                  >{`Resend in ${count}s`}</PrimaryBtn>
                )}
                <div className="flex md:flex-row md:text-base text-sm flex-col md:gap-2">
                  <p className="text-title">{`No longer using thit ${keyWord}?`}</p>
                  <div className="text-primary cursor-pointer" onClick={close}>
                    {`Switch ${keyWord}`}
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
export default OtpPopup;
