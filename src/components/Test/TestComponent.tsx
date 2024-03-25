"use client";
import React from "react";
import TestImage from "./TestImage";
import { useAccount, useChainId } from "wagmi";
import { useTranslation } from "../../app/i18n/client";
// import { useThemeContext } from "@/contexts/ThemeContext";
import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import { IKUpload } from "imagekitio-react";

function TestComponent({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "test-page");
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  // const { handleChangeTheme } = useThemeContext();

  const onError = (error: any) => {
    console.log("upload error", error);
  };
  const onSuccess = (res: any) => {
    console.log(res);
  };

  return (
    <div className="p-5 mt-20 ml-20">
      <div className="max-w-[500px]">
        <p>
          {t("account")}: {address}
        </p>
        <br />
        <p>
          {t("is-connected")}: {JSON.stringify(isConnected)}
        </p>
        <p>
          {t("chain-id")}: {chainId}
        </p>
        {/* <ConnectWallet /> */}
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <span key={l}>
                {index > 0 && " or "}
                <Link href={`/${l}`}>{l}</Link>
              </span>
            );
          })}
      </div>
      <div className="mt-5 p-5 w-max bg-white dark:bg-black">
        <p className="text-black dark:text-white">Text added dark/light mode</p>
      </div>
      {/* <button className="my-5" onClick={handleChangeTheme}>
        {t("change-theme")}
      </button> */}
      <br />
      <IKUpload
        // onChange={(e) => setLoadingImage(true)}
        onError={onError}
        onSuccess={onSuccess}
      />
      <br />
      <TestImage />
    </div>
  );
}

export default TestComponent;
