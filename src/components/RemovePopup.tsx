import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import MotionDialogContent from "./MotionDialogContent";
import CloseDialogIcon from "./icon/CloseDialogIcon";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api-modules/profile";
import { toast } from "react-toastify";

function RemovePopup({ className = "", updateKey, keyWord }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
  };
  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    async (newUserProfile) => {
      return await updateUserProfile(newUserProfile);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Remove success");
          close();
          queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
        } else {
          toast.error(data?.response?.data || data?.message || "Opps! Something went wrong...");
        }
      },
      onError: (err: any) => {
        console.log("Remove error", err?.message);
        toast.error(err?.response?.data?.message || err?.message);
      },
    }
  );

  function handleUpdate() {
    const objSubmit = {};
    objSubmit[updateKey] = "";
    // @ts-ignore
    updateMutation.mutate(objSubmit);
  }

  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer flex gap-2 items-center" onClick={open}>
        <p className="text-primary bg-primary px-1 h-4 bg-opacity-20 whitespace-nowrap rounded-md text-xs">
          {"Verified"}
        </p>
        <p className="underline text-primary">Remove</p>
      </div>
      <AnimatePresence>
        {showDialog && (
          <DialogOverlay
            onDismiss={close}
            className="z-50 flex items-center justify-center w-full text-black dark:text-textDark"
          >
            <MotionDialogContent
              aria-label="Tokenize popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 min-w-[343px] !m-0 md:min-w-[460px] !bg-transparent"
              style={{ width: 520 }}
            >
              <motion.div
                className="flex flex-col gap-4 bg-white dark:bg-bgDark p-4 rounded-md"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-2xl">{`Remove ${keyWord}`}</p>
                  <CloseDialogIcon onClick={close} className="cursor-pointer fill-black dark:fill-white" />
                </div>
                <div className="text-base font-medium md:py-5">{`Are you sure you want to remove ${keyWord}?`}</div>
                <div className="flex justify-center gap-5">
                  <SecondaryBtn
                    className="md:w-[150px] w-[100px] md:h-10 h-8 text-primary dark:text-textDark"
                    onClick={close}
                  >
                    Cancel
                  </SecondaryBtn>
                  <PrimaryBtn className="md:w-[150px] w-[100px] md:h-10 h-8" onClick={handleUpdate}>
                    Confirm
                  </PrimaryBtn>
                </div>
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
export default RemovePopup;
