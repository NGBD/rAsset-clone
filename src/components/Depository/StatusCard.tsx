import React from "react";
import LockIcon from "../icon/LockIcon";
import SucceedIcon from "../icon/SucceedIcon";
import NotificationTab from "./NotificationTab";
import FailIcon from "../icon/FailIcon";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import { useTranslation } from "@/app/i18n/client";

function StatusCard({ status, lng }) {
  const { t } = useTranslation(lng, "depositories");
  return (
    <InfoBlock className="gap-5">
      <BlockTitle label={t("status")} />
      <div className="w-full bg-white">
        {status === "submitted" && (
          <NotificationTab
            className="justify-center"
            title={t("submitted")}
            firstRow={t("first-row-submitted")}
            icon={<SucceedIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "verifying" && (
          <NotificationTab
            className="justify-center"
            title={t("verifying")}
            firstRow={t("first-row-verifying")}
            icon={<LockIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "verified" && (
          <NotificationTab
            className="justify-center"
            title={t("verified")}
            firstRow={t("first-row-verified")}
            secondRow={t("second-row-verified")}
            icon={<SucceedIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "processing" && (
          <NotificationTab
            className="justify-center"
            title={t("processing")}
            firstRow={t("first-row-processing")}
            secondRow={t("second-row-processing")}
            thirdRow={t("third-row-processing")}
            icon={<SucceedIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "completed" && (
          <NotificationTab
            className="justify-center"
            title={t("completed")}
            firstRow={t("first-row-completed")}
            secondRow={t("second-row-completed")}
            icon={<SucceedIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "canceled" && (
          <NotificationTab
            className="justify-center"
            title={t("canceled")}
            firstRow={t("first-row-canceled")}
            icon={<FailIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "rejected" && (
          <NotificationTab
            className="justify-center"
            title={t("rejected")}
            firstRow={t("first-row-rejected")}
            secondRow={t("second-row-rejected")}
            thirdRow={t("third-row-rejected")}
            icon={<FailIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
        {status === "minted" && (
          <NotificationTab
            className="justify-center"
            title={t("minted")}
            firstRow={t("first-row-minted")}
            secondRow={t("second-row-minted")}
            icon={<SucceedIcon className="w-[100px] h-[100px] fill-[#5550DC] dark:fill-white" />}
          />
        )}
      </div>
    </InfoBlock>
  );
}

export default StatusCard;
