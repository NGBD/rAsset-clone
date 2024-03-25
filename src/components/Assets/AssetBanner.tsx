import React from "react";
import Image from "next/image";
import ShareBtn from "./ShareBtn";
import BlockTitle from "../BlockTitle";
import InfoBlock from "../InfoBlock";

function AssetBanner({ className = "", onClick, assetDetails }) {
  return (
    <div className={`flex gap-5 smooth-transform ${className}`}>
      <Image
        src={assetDetails?.mainImage || "/public/images/img-default.png"}
        alt="asset1"
        className="object-cover rounded-md"
        width={80}
        height={80}
      />

      <InfoBlock className="flex-row items-center w-full px-6 py-[10px]">
        <span className="w-full" onClick={onClick}>
          <BlockTitle label={assetDetails?.assetName} />
          <p className="font-semibold text-base uppercase">
            {assetDetails?.assetType?.typeKey} #{assetDetails?.nftId}
          </p>
        </span>
        <ShareBtn slug={assetDetails?.slug} />
      </InfoBlock>
    </div>
  );
}

export default AssetBanner;
