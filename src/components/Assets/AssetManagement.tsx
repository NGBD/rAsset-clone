"use client";
import React, { useState } from "react";
import FilterDropDown from "../FilterDropDown";
import Title from "../Title";
import AssetCard from "./AssetCard";
import { GetNftsForOwnerOptions } from "alchemy-sdk";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { getAssetTypes } from "@/api-modules/assets";
import { getNftsByrOnwerAlchemy } from "@/lib/getNftsByrOnwerAlchemy";
import { useRouter } from "next/navigation";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import EmptyPage from "../EmptyPage";
import BackArrow from "../icon/BackArrow";
import { useTranslation } from "@/app/i18n/client";

function AssetManagement({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "assets");
  const [allAssetTypes, setAllAssetTypes] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<any>();

  const router = useRouter();
  const { updateSearchParams, searchParams } = useUpdateSearchParams();
  const pageKey = searchParams.get("pageKey");

  const { address } = useAccount();
  const { isLogin } = useAuthContext();

  useQuery(
    ["getAssetTypes"],
    async () => {
      const response = await getAssetTypes();
      setAllAssetTypes([{ typeKey: "all", typeName: "All" }, ...response.data.data]);
      setTypeSelected({ typeKey: "all", typeName: "All" });
      return response.data;
    },
    {
      enabled: isLogin,
    }
  );

  const { data: userNfts } = useQuery(
    ["getUserNfts", address, isLogin, typeSelected, allAssetTypes, pageKey],
    async () => {
      let contractAddresses: string[] = [];
      if (typeSelected.typeKey == "all") {
        contractAddresses = allAssetTypes.filter((type) => type.typeKey !== "all").map((type) => type.contractAddress);
      } else {
        contractAddresses = [typeSelected.contractAddress];
      }
      const alchemyOptions: GetNftsForOwnerOptions = {
        pageSize: 10,
        contractAddresses,
      };

      if (pageKey) {
        alchemyOptions.pageKey = pageKey;
      }

      const response = await getNftsByrOnwerAlchemy(address, alchemyOptions);
      return response;
    },
    {
      enabled: isLogin && !!address && !!typeSelected && !!allAssetTypes,
    }
  );

  const handleClickNextBtn = () => {
    if (userNfts.pageKey) {
      updateSearchParams("pageKey", userNfts.pageKey);
    }
  };

  const handleClickBackBtn = () => {
    if (pageKey) {
      router.back();
    }
  };

  return (
    <div className="max-w-maxContent mx-auto">
      <Title>{t("title")}</Title>
      <div className="flex w-full items-center pb-5 gap-2 justify-between">
        <div>
          <FilterDropDown
            listDropdown={allAssetTypes}
            showing={typeSelected}
            setShowing={setTypeSelected}
            title={t("type-filter")}
            textDefault={"All"}
            className="w-full pt-2"
          />
          <p className="my-3 font-semibold dark:text-textDark text-base">
            {t("total")}: {userNfts?.totalCount}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClickBackBtn}
              className="flex border rounded-md disabled:opacity-50 disabled:cursor-not-allowed gap-2 px-2 bg-gray-300 whitespace-nowrap items-center"
              disabled={!pageKey}
            >
              {t("back-button")}
              <BackArrow />
            </button>
            <button
              onClick={handleClickNextBtn}
              className="flex gap-2 border rounded-md px-2 bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed items-center"
              disabled={!userNfts?.pageKey}
            >
              <BackArrow className="rotate-180" />
              {t("next-button")}
            </button>
          </div>
        </div>
      </div>
      {userNfts?.totalCount === 0 && (
        <EmptyPage
          title={t("empty-notification")}
          classNameContainer="min-h-[calc(100vh-80px-16px-52px-94px-130px-60px)]"
          className="w-[300px] md:w-[450px] h-[360px] justify-around"
          description={t("description-empty")}
          firstBtn={t("depository")}
          hrefFirstBtn="/depositories"
          secondBtn="Marketplace"
        />
      )}
      {userNfts && userNfts?.totalCount !== 0 && (
        <div>
          <div className="md:grid justify-between md:grid-cols-5 flex flex-col gap-5 pb-6">
            {userNfts?.ownedNfts.map((nft, index) => (
              <AssetCard data={nft} key={`${nft.tokenId}-${index}`} />
            ))}
          </div>
        </div>
      )}
      {!userNfts && (
        <div>
          <div className="md:grid justify-between md:grid-cols-5 flex flex-col gap-5 pb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <LoadingNftCard key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetManagement;

function LoadingNftCard() {
  return (
    <div className="smooth-transform">
      <div className="min-w-[98px] aspect-square w-full skeleton-loading rounded-t-md relative cursor-pointer"></div>
      <div className="w-full h-[60px] min-w-[98px] p-[10px] bg-white dark:bg-bgDark shadow-2xl rounded-b-md">
        <div className="w-full skeleton-loading h-4 rounded-sm"></div>
        <div className="w-1/2 skeleton-loading h-4 mt-2 rounded-sm"></div>
      </div>
    </div>
  );
}
