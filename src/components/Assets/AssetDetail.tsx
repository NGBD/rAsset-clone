"use client";
import Title from "../Title";
import ArrowLeft from "../icon/ArrowLeft";
import MenuTabInfo from "../MenuTabInfo";
import AssetBanner from "./AssetBanner";
import ProofTab from "./ProofTab";
import NftTab from "./NftTab";
import TokenizeTab from "./TokenizeTab";
import ShareBtn from "./ShareBtn";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAssetDetails } from "@/api-modules/assets";
import TraitsTab from "./TraitsTab";
import { useState } from "react";
import ImageAssetDetail from "../ImageAssetDetail";
import Image from "next/image";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import RowInfo from "../RowInfo";
import { useTranslation } from "@/app/i18n/client";
import { format } from "date-fns";
import Link from "next/link";
import { PUBLIC_URL } from "@/constants";
import { getListDepositoryCenter } from "@/api-modules/depository";
import { getNameFromId } from "@/lib";

const listMenuTabInfo = [
  { id: "traits", label: "traits" },
  { id: "proof", label: "proof" },
  { id: "nft", label: "nft" },
  { id: "tokenize", label: "tokenize" },
];

function AssetDetail({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "assets");
  const [activeTab, setActiveTab] = useState<string>("traits");
  const [showOverView, setShowOverView] = useState(true);
  const [listCenter, setListCenter] = useState<any>();
  const router = useRouter();
  const { assetId } = useParams();

  useQuery(["getListDepositoryCenter"], async () => {
    const queryObj = {
      offset: 0,
      limit: 10,
    };
    const response = await getListDepositoryCenter(queryObj);
    setListCenter(response?.data);
    return response?.data;
  });

  const handleClickOverView = () => {
    setShowOverView(!showOverView);
  };
  const { data: assetDetails } = useQuery(
    ["getAssetDetails", assetId],
    async () => {
      const response = await getAssetDetails(assetId);
      return response.data;
    },
    {
      enabled: !!assetId,
    }
  );

  return (
    <div className="pb-10 bg-[#EEF0F3] max-w-maxContent dark:bg-bgDarkSecondary mx-auto">
      <div className="flex gap-[10px] items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Title>{t("title-detail")}</Title>
      </div>
      {assetDetails ? (
        <div
          className={`md:grid md:grid-cols-2 mt-5 gap-5 flex flex-col md:gap-4 ${
            showOverView ? "" : "md:hidden hidden"
          } 
          }`}
        >
          <div className="w-full h-full relative">
            {assetDetails?.images?.length > 0 ? (
              <ImageAssetDetail assetDetails={assetDetails} />
            ) : (
              <Image
                priority
                src={"/images/img-default.png"}
                alt="asset-image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover w-full h-auto rounded-t-md"
              />
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <InfoBlock className="flex-row items-center">
              <span className="w-full" onClick={handleClickOverView}>
                <BlockTitle label={lng === "en" ? assetDetails?.assetName : assetDetails?.assetNameVi} />
                <p className="font-semibold text-base capitalize">
                  {assetDetails?.assetType?.typeKey} #{assetDetails?.nftId}
                </p>
              </span>
              <ShareBtn slug={assetDetails?.slug} />
            </InfoBlock>
            <InfoBlock>
              <BlockTitle label={t("overview")} />
              <RowInfo label={t("asset-type")} value={assetDetails?.assetType?.typeName} />
              <RowInfo label={t("status")} value={`${assetDetails?.isPublic ? "Public" : "Private"}`} />
              <RowInfo label={t("network")} value={"Polygon"} />
              <RowInfo
                label={t("created-time")}
                value={assetDetails?.createdAt ? format(new Date(assetDetails?.createdAt), "dd-MM-yyy") : ""}
              />
              <RowInfo label={t("center")} value={getNameFromId(assetDetails?.depositoryCenter, listCenter?.data)} />
            </InfoBlock>
            <InfoBlock>
              <BlockTitle label={t("description")} />
              <div className="font-normal text-base text-justify">
                {lng === "en" ? assetDetails?.shortDescription : assetDetails?.shortDescriptionVi} {""}
                <Link href={`${PUBLIC_URL}/${assetDetails?.slug}`} target="_blank" className="text-primary">
                  More
                </Link>
              </div>
            </InfoBlock>
          </div>
        </div>
      ) : (
        <AssetDetailSkeletonLoading />
      )}
      <AssetBanner
        className={`${showOverView ? "hidden" : ""} cursor-pointer mt-5`}
        onClick={handleClickOverView}
        assetDetails={assetDetails}
      />
      <div className="mt-[40px] z-[999] w-full h-full">
        <MenuTabInfo
          className="mb-1 h-[30px]"
          activeTab={activeTab}
          listMenu={listMenuTabInfo}
          setActiveTab={setActiveTab}
          lng={lng}
        />

        {activeTab === "traits" && <TraitsTab assetId={assetId} />}
        {activeTab === "proof" && <ProofTab assetId={assetId} />}
        {activeTab === "nft" && <NftTab assetId={assetId} />}
        {activeTab === "tokenize" && <TokenizeTab assetData={assetDetails} lng={lng} />}
      </div>
    </div>
  );
}

export default AssetDetail;

function AssetDetailSkeletonLoading() {
  return (
    <div className="md:grid md:grid-cols-2 mt-5 gap-5 dark:text-textDark flex flex-col">
      <div className="h-full flex flex-col">
        <div className="md:h-4/5 h-[200px] mb-5 w-full skeleton-loading rounded-md relative"></div>
        <div className="md:h-[90px] rounded-md w-full flex justify-between gap-3">
          <div className="md:h-[90px] h-[60px] skeleton-loading rounded-md w-full"></div>
          <div className="md:h-[90px] h-[60px] rounded-md skeleton-loading w-full"></div>
          <div className="md:h-[90px] h-[60px] rounded-md skeleton-loading w-full"></div>
          <div className="md:h-[90px] h-[60px] rounded-md skeleton-loading w-full"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3 h-full">
        <div className="flex justify-between items-center px-6 py-[10px] h-[66px] cursor-pointer rounded-md bg-white dark:bg-bgDark">
          <div className="flex flex-col gap-2 w-full">
            <div className="font-semibold text-xl skeleton-loading w-[60%] h-6"></div>
            <div className="font-semibold text-base skeleton-loading w-[30%] h-4"></div>
          </div>
          <ShareBtn slug={""} />
        </div>
        <div className="flex flex-col justify-between px-6 py-[10px] rounded-md bg-white  dark:bg-bgDark">
          <p className="font-semibold text-xl pb-2">Overview</p>
          <div className="flex flex-col gap-1 just ify-start">
            <div className="flex justify-between">
              <p>Asset Type</p>
              <div className="h-5 skeleton-loading w-20"></div>
            </div>
            <div className="flex justify-between">
              <p>Status</p>
              <div className="h-5 skeleton-loading w-20"></div>
            </div>
            <div className="flex justify-between">
              <p>Accepted Currency</p>
              <div className="h-5 skeleton-loading w-20"></div>
            </div>
            <div className="flex justify-between">
              <p>Created Time</p>
              <div className="h-5 skeleton-loading w-20"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-6 py-[10px] h-full rounded-md bg-white  dark:bg-bgDark">
          <p className="font-semibold text-xl pb-2">Description</p>
          <div className="flex flex-col gap-1">
            <div className="h-5 skeleton-loading w-full"></div>
            <div className="h-5 skeleton-loading w-full"></div>
            <div className="h-5 skeleton-loading w-full"></div>
            <div className="h-5 skeleton-loading w-[40%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
