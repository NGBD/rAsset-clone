import { DialogOverlay } from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../PrimaryBtn";
import MotionDialogContent from "../MotionDialogContent";
import CloseDialogIcon from "../icon/CloseDialogIcon";
import Link from "next/link";
import { shortenAddress } from "@/lib/shortenAddress";
import useDebounce from "@/hooks/useDebounce";
import { useErc721Contract, useTokenizeContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { TOKENIZE_CONTRACT_ADDRESS } from "@/constants/env";
import { toast } from "react-toastify";
import { waitForTransaction } from "@wagmi/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useMultiLanguage from "@/hooks/useMultiLanguage";
import SecondaryInput from "../SecondaryInput";
import { useTranslation } from "@/app/i18n/client";

function TokenizePopup({ className = "", nftContract, nftId, lng }) {
  const { t } = useTranslation(lng, "assets");

  const [showDialog, setShowDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const router = useRouter();
  const { currentLang } = useMultiLanguage();
  const queryClient = useQueryClient();

  const [tokenName, setTokenName] = useState("");
  const debouncedTokenName = useDebounce(tokenName, 500);

  const [tokenSymbol, setTokenSymbol] = useState("");
  const debouncedTokenSymbol = useDebounce(tokenSymbol, 500);

  const [tokenSupply, setTokenSupply] = useState(0);
  const debouncedTokenSupply = useDebounce(tokenSupply, 500);

  const { address } = useAccount();

  const [isApproved, setIsApproved] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const { readErc721Contract, writeErc721Contract } = useErc721Contract(nftContract);

  const checkUserData = async () => {
    try {
      const contractApproved = await readErc721Contract("getApproved", [nftId]);
      console.log("contractApproved", contractApproved);
      // @ts-ignore
      if (contractApproved.toLowerCase().includes(TOKENIZE_CONTRACT_ADDRESS.toLowerCase())) setIsApproved(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) {
      checkUserData();
    }
  }, [address]);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const { hash } = await writeErc721Contract("approve", [TOKENIZE_CONTRACT_ADDRESS, nftId]);
      const finish = async () => {
        await waitForTransaction({ hash });
        await checkUserData();
      };
      toast.promise(finish(), {
        pending: "Process approve...",
        success: "Approved",
        error: "Approve error",
      });
    } catch (error) {
      console.log("Error approve nft for tokenize contract: ", error);
      toast.error(error?.message || error?.reason);
    } finally {
      setIsLoading(false);
    }
  };

  const { writeTokenizeContract } = useTokenizeContract(TOKENIZE_CONTRACT_ADDRESS);

  const handleTokenizeAsset = async () => {
    setIsLoading(true);
    try {
      const { hash } = await writeTokenizeContract("tokenize", [
        nftContract,
        nftId,
        debouncedTokenName,
        debouncedTokenSymbol,
        debouncedTokenSupply,
      ]);
      const finish = async () => {
        await waitForTransaction({ hash });
        queryClient.invalidateQueries({ queryKey: ["getUserNfts"] });
        queryClient.invalidateQueries({ queryKey: ["getShares"] });
        close();
        router.push(`/${currentLang}/shares`);
      };
      toast.promise(finish(), {
        pending: "Process tokenize...",
        success: "Tokenize asset successful!",
        error: "Tokenize asset failed, please try again!",
      });
    } catch (error) {
      console.log("Error tokenize asset: ", error);
      toast.error(error?.message || error?.reason);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${className} bg-opacity-100`}>
      <div className="cursor-pointer" onClick={open}>
        <PrimaryBtn className="max-w-[130px] h-10 rounded-md whitespace-nowrap">{t("tokenize-button")}</PrimaryBtn>
      </div>

      <AnimatePresence>
        {showDialog && (
          <DialogOverlay
            onDismiss={close}
            className="z-50 flex items-center justify-center w-full dark:text-textDark text-black"
          >
            <MotionDialogContent
              aria-label="Tokenize popup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 min-w-[343px] !m-0 md:min-w-[450px] !bg-transparent"
              style={{ width: 450 }}
            >
              <motion.div
                className="flex flex-col bg-white dark:bg-bgDark md:p-[30px] p-5 rounded-md"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                <div className="flex items-center justify-between pb-6 rounded-t-lg">
                  <p className="text-lg font-bold">TOKENIZE</p>
                  <CloseDialogIcon onClick={close} className="cursor-pointer fill-black dark:fill-white" />
                </div>
                <div className="flex flex-col  text-base justify-between gap-3">
                  <p className="text-sm font-semibold">
                    Your NFT will be locked and the Token will be mint to your wallet.
                  </p>
                  <SecondaryInput
                    title="NFT contract"
                    defaultValue={shortenAddress(nftContract || "")}
                    classNameInput="bg-white"
                    readOnly
                  />
                  <SecondaryInput title="NFT ID" defaultValue={nftId} readOnly />
                  <SecondaryInput
                    classNameInput="bg-white"
                    title="Token name"
                    placeholder="Enter token name"
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                  <SecondaryInput
                    classNameInput="bg-white"
                    title="Token symbol"
                    placeholder="Enter token symbol"
                    onChange={(e) => setTokenSymbol(e.target.value)}
                  />
                  <SecondaryInput
                    classNameInput="bg-white"
                    title="Total supply"
                    onChange={(e) => setTokenSupply(Number(e.target.value))}
                    placeholder="Enter token supply"
                  />
                </div>
                <div className="flex flex-col justify-start gap-4 mt-10">
                  <div className="flex justify-start gap-2  text-sm font-normal">
                    <input checked={isChecked} type="checkbox" onChange={handleCheckboxChange} />
                    <label>
                      I accept&nbsp;
                      <Link href={"https://www.youtube.com/watch?v=0tFUfuEhh28"} className="text-primary">
                        Term Of Use
                      </Link>
                      &nbsp; and&nbsp;
                      <Link href={"https://www.youtube.com/watch?v=xS8hBELdkqc"} className="text-primary">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {isApproved ? (
                    <PrimaryBtn
                      onClick={handleTokenizeAsset}
                      className={`text-white rounded-md w-full h-10 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={
                        !isChecked ||
                        !nftContract ||
                        !nftId ||
                        !tokenName ||
                        !tokenSupply ||
                        !tokenSymbol ||
                        !isApproved ||
                        isLoading
                      }
                    >
                      Tokenize asset
                    </PrimaryBtn>
                  ) : (
                    <PrimaryBtn
                      onClick={handleApprove}
                      className={`text-white rounded-md w-full h-10 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={
                        !isChecked || !nftContract || !nftId || !tokenName || !tokenSupply || !tokenSymbol || isLoading
                      }
                    >
                      Approve
                    </PrimaryBtn>
                  )}
                </div>
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TokenizePopup;
