import React from "react";
import Image from "next/image";
import CloseDialogIcon from "./icon/CloseDialogIcon";
import DragIcon from "./icon/DragIcon";
import { IKUpload } from "imagekitio-react";
import { toast } from "react-toastify";
import { useTranslation } from "@/app/i18n/client";

function UploadMultipleImage({ urlImgs, setUrlImgs, lng }) {
  const { t } = useTranslation(lng, "depositories");

  const onError = (error: any) => {
    console.log("upload error", error);
    toast.error("Upload error");
  };
  const onSuccess = (res: any) => {
    const newUrl = res?.url;
    setUrlImgs([...urlImgs, newUrl]);
    toast.success("Upload success");
  };

  const handleRemoveImage = (index) => {
    const updatedUrlImgs = [...urlImgs];
    updatedUrlImgs.splice(index, 1);
    setUrlImgs(updatedUrlImgs);
  };

  return (
    <div>
      <div className="text-lg mb-5 font-medium">{t("img-note")}</div>
      <div className="md:flex md:flex-wrap gap-7 w-full grid grid-cols-2">
        {urlImgs?.map((i, index) => (
          <div
            key={index}
            className="md:w-[100px] md:h-[100px] rounded-md aspect-square w-full border border-primary relative"
          >
            <Image
              src={i}
              fill
              alt={"assset"}
              sizes="10vw"
              className="object-cover w-full h-full rounded-md pointer-events-none"
            />
            <div
              className="absolute top-[-6px] right-[-6px] p-1 rounded-md bg-primary cursor-pointer"
              onClick={() => {
                handleRemoveImage(index);
              }}
            >
              <CloseDialogIcon width={10} height={10} fill="#FFFFFF" />
            </div>
          </div>
        ))}
        <label>
          <div
            className={`md:w-[100px] md:h-[100px] border-[2px] items-center flex cursor-pointer justify-center  border-primary border-dashed rounded-md aspect-square relative ${
              urlImgs?.length > 4 ? "hidden" : ""
            }`}
          >
            <DragIcon />
            <IKUpload className="hidden" onError={onError} onSuccess={onSuccess} />
          </div>
        </label>
      </div>
    </div>
  );
}

export default UploadMultipleImage;
