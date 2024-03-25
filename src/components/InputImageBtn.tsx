import { IKUpload } from "imagekitio-react";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";
import VerifyIcon from "./icon/VerifyIcon";

function InputImageBtn({ data, lng, urlImg, setUrlImg, disabled = null }) {
  const { t } = useTranslation(lng, "profile");

  const onError = (error: any) => {
    console.log("upload error", error);
  };

  const onSuccess = (res: any) => {
    const newUrl = res?.url;
    setUrlImg(newUrl);
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col items-center">
          <div className="relative w-[160px] aspect-square h-[160px]">
            <Image
              src={urlImg || data?.data?.avatar || "/images/avatar.jpeg"}
              fill
              sizes="width: 160px"
              alt="avatar"
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <p className="font-semibold text-[28px] text-primary dark:text-textDark text-center">
              {(data?.data?.firstName || "---") + " " + (data?.data?.lastName || "---") || "--- ---"}
            </p>
            {data?.data?.isEmailVerified && <VerifyIcon className="w-6 h-6 fill-[#5550DC] dark:fill-white" />}
          </div>
          <label className="mt-7">
            <div
              className={`border border-primary text-primary dark:border-white dark:text-textDark cursor-pointer min-w-[160px] rounded-md font-medium py-3 px-5 smooth-transform flex justify-center items-center gap-3 text-base ${
                disabled ? "hidden" : ""
              }`}
            >
              {t("upload")}
              <IKUpload className="hidden" onError={onError} onSuccess={onSuccess} disabled={disabled} />
            </div>
          </label>
        </div>
      ) : (
        <SkeletonAvatar lng={lng} />
      )}
    </>
  );
}

export default InputImageBtn;

function SkeletonAvatar({ lng }) {
  const { t } = useTranslation(lng, "profile");
  return (
    <div className="flex flex-col items-center">
      <div className="w-[160px] h-[160px] rounded-full skeleton-loading"></div>
      <div className="h-8 w-[150px] skeleton-loading mt-2 rounded-md"></div>
      <div className="border mt-7 border-primary text-primary dark:border-white dark:text-textDark cursor-pointer min-w-[160px] rounded-md font-medium py-3 px-5 smooth-transform flex justify-center items-center gap-3 text-base">
        {t("upload")}
      </div>
    </div>
  );
}
