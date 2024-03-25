import useMultiLanguage from "@/hooks/useMultiLanguage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AssetCard({ data }) {
  const { currentLang } = useMultiLanguage();
  const test = 10 % 9;
  console.log(test);

  return (
    <div className="scale-[98%] hover:scale-100 smooth-transform">
      <Link href={`/${currentLang}/assets/${data.rawMetadata.assetId}`}>
        <div className="min-w-[100px] aspect-square w-full relative cursor-pointer">
          <Image
            priority
            src={data.rawMetadata.image || "/images/img-default.png"}
            alt="asset image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-auto rounded-t-md"
          />
          <div
            className={`absolute top-[10px] right-[10px] rounded-md px-3 py-1 text-white cursor-pointer ${
              data?.rawMetadata?.isStable ? "bg-primary" : "bg-green-600"
            }`}
          >
            {data?.rawMetadata?.isStable ? "Stable" : "Grow"}
          </div>
        </div>
        <div className="w-full min-w-[100px] h-[60px] p-[10px] bg-white dark:bg-bgDark shadow-2xl rounded-b-md">
          <p className="text-base font-bold truncate dark:text-textDark">{data.rawMetadata.name}</p>
          <p className="text-title truncate text-xs dark:text-textDark">
            {data.contract.name} #{data.tokenId}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AssetCard;
