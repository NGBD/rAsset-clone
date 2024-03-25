import React from "react";
import DotGray from "../icon/DotGray";
import { format } from "date-fns";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import { useTranslation } from "@/app/i18n/client";

function ActivitiesCard({ activities, lng }) {
  const { t } = useTranslation(lng, "depositories");
  return (
    <InfoBlock className="h-full gap-5 justify-start">
      <BlockTitle label={t("activities")} />
      <div className="flex flex-col-reverse gap-3 max-h-[300px] overflow-auto">
        {activities?.map((i) => (
          <span className="flex gap-4 item" key={i?._id}>
            <div className="flex gap-3">
              <DotGray className="w-[10px] h-[10px] mt-[7px]" />
              <p className="whitespace-nowrap font-semibold w-[100px]">
                {format(new Date(i?.createdAt), "dd-MM-yyyy")}
              </p>
            </div>
            <p>{lng === "en" ? i?.message : i?.messageVi}</p>
          </span>
        ))}
      </div>
    </InfoBlock>
  );
}

export default ActivitiesCard;
