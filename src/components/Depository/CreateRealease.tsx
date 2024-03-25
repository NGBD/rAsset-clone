"use client";
import React from "react";
import Title from "../Title";
import ArrowLeft from "../icon/ArrowLeft";
import NotificationTab from "./NotificationTab";
import { useRouter } from "next/navigation";
import SmallComingsoon from "../icon/SmallComingsoon";
import { useTranslation } from "@/app/i18n/client";

function CreateRealease({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "depositories");

  const router = useRouter();

  return (
    <div className="bg-[#EEF0F3] max-w-maxContent dark:bg-bgDarkSecondary rounded-md mx-auto">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Title>{t("title-create-release")}</Title>
      </div>
      <div className="w-full bg-white rounded-md dark:bg-bgDark p-8">
        <NotificationTab
          className="justify-around min-h-[calc(100vh-280px)]"
          icon={<SmallComingsoon />}
          title={t("title-noti-release")}
          secondRow={t("text-4")}
          firstRow={t("text-3")}
        />
      </div>
    </div>
  );
}

export default CreateRealease;
