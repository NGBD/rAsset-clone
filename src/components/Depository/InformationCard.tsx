import React from "react";
import TextDescription from "../TextDescription";
import Image from "next/image";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import SecondaryInput from "../SecondaryInput";
import { useTranslation } from "@/app/i18n/client";

function InformationCard({ data, lng }) {
  const { t } = useTranslation(lng, "depositories");

  return (
    <InfoBlock className="justify-start pb-7 gap-5">
      <BlockTitle label={t("infomation")} />
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <SecondaryInput title={t("request-ID")} defaultValue={data?._id} readOnly />
          <SecondaryInput title={t("asset-type")} defaultValue={data?.assetType?.typeName} readOnly />
          <SecondaryInput title={t("center")} defaultValue={data?.depositoryCenter?.name} readOnly />
          <SecondaryInput title={t("asset-name")} defaultValue={data?.name} readOnly />
          <TextDescription title={t("description")} defaultValue={data?.description} readOnly onChange={undefined} />
        </div>
        <div className="md:flex md:flex-wrap grid grid-cols-3 gap-7 mt-5 h-min">
          {data?.assetMedia?.map((i) => (
            <div key={i} className="max-w-[90px] max-h-[90px] aspect-square w-full relative">
              <Image src={i} fill alt={"assset"} sizes="10vw" className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </InfoBlock>
  );
}

export default InformationCard;
