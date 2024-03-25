import React from "react";
import TokenizePopup from "./TokenizePopup";
import { useTranslation } from "@/app/i18n/client";

function TokenizeTab({ assetData, lng }) {
  const { t } = useTranslation(lng, "assets");
  console.log(assetData?.assetType?.contractAddress);

  return (
    <div className="flex flex-col justify-between h-full bg-white min-h-[300px] dark:bg-bgDark rounded-md p-[30px]">
      <div className="w-full flex my-[40px] bg-gradient-to-r from-[#148DFD] to-[#FFE2F9] md:h-[80px] h-[100px] justify-center gap-1 rounded-md px-[10px] items-center text-white md:flex-row flex-col md:justify-between">
        <p className="text-base font-bold ">{t("tokenize-question")}</p>
        <TokenizePopup nftContract={assetData?.assetType?.contractAddress} nftId={assetData?.nftId} lng={lng} />
      </div>
    </div>
  );
}

export default TokenizeTab;
