"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Title from "../Title";
import ArrowLeft from "../icon/ArrowLeft";
import InformationCard from "./InformationCard";
import StatusCard from "./StatusCard";
import ActivitiesCard from "./ActivitiesCard";
import { useQuery } from "@tanstack/react-query";
import { getDepositoryDetail } from "@/api-modules/depository";
import { useTranslation } from "@/app/i18n/client";

function DepositoryDetail({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "depositories");
  const router = useRouter();
  const params = useParams();
  const { depositoryId } = params;
  const [depositoryDetail, setDepositoryDetail] = useState<any>();

  useQuery(
    ["getDepositoryDetail", depositoryId],
    async () => {
      const response = await getDepositoryDetail(depositoryId);
      setDepositoryDetail(response?.data);
      return response?.data;
    },
    {
      enabled: !!depositoryId,
    }
  );

  return (
    <div className="max-w-maxContent rounded-md mx-auto">
      <div className="flex gap-[10px] items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Title>{t("title-detail")}</Title>
      </div>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
        <InformationCard data={depositoryDetail} lng={lng} />
        <div className="flex flex-col gap-5">
          <StatusCard status={depositoryDetail?.status} lng={lng} />
          <ActivitiesCard activities={depositoryDetail?.activities} lng={lng} />
        </div>
      </div>
    </div>
  );
}

export default DepositoryDetail;
