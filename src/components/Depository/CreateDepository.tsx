"use client";
import { getAssetTypes } from "@/api-modules/assets";
import React, { useState } from "react";
import TextDescription from "../TextDescription";
import DropDown from "./DropDown";
import Title from "../Title";
import ArrowLeft from "../icon/ArrowLeft";
import { useRouter } from "next/navigation";
import PrimaryBtn from "../PrimaryBtn";
import SucceedIcon from "../icon/SucceedIcon";
import NotificationTab from "./NotificationTab";
import { toast } from "react-toastify";
import { useMutation, useQueries } from "@tanstack/react-query";
import { createNewDepository, getListDepositoryCenter } from "@/api-modules/depository";
import UploadMultipleImage from "../UploadMultipleImage";
import SecondaryInput from "../SecondaryInput";
import InfoBlock from "../InfoBlock";
import { useTranslation } from "@/app/i18n/client";

function CreateDepository({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "depositories");
  const [typeSelected, setTypeSelected] = useState<any>();
  const [allAssetTypes, setAllAssetTypes] = useState<any>();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [assetName, setAssetName] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [urlImgs, setUrlImgs] = useState<any>([]);
  const [dataRequest, setDataRequest] = useState<any>();
  const [center, setCenter] = useState<any>();
  const [listCenter, setListCenter] = useState<any>();

  useQueries({
    queries: [
      {
        queryKey: ["getAssetTypes"],
        queryFn: async () => {
          const response = await getAssetTypes();
          setAllAssetTypes(response.data.data);
          return response.data;
        },
      },
      {
        queryKey: ["getListDepositoryCenter"],
        queryFn: async () => {
          const queryObj = {
            offset: 0,
            limit: 10,
          };
          const response = await getListDepositoryCenter(queryObj);
          setListCenter(response?.data);
          return response?.data;
        },
      },
    ],
  });

  const createDepositoryMutation = useMutation(
    async (newDepository) => {
      return await createNewDepository(newDepository);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Create new success");
          setDataRequest(data);
          setIsSubmit(true);
        } else {
          const errorMessages = data?.response?.data?.message;
          console.log(data);
          toast.error(errorMessages?.join("\n") || data?.message || "Opps! Something went wrong...");
        }
      },
      onError: (err: any) => {
        console.log("Create new error", err?.message);
        toast.error(err?.response?.data?.message || err?.message || "Create error...");
        setIsSubmit(false);
      },
    }
  );

  const handleCreateDepository = () => {
    // @ts-ignore
    createDepositoryMutation.mutate({
      assetType: typeSelected.id,
      name: assetName,
      description: description,
      assetMedia: urlImgs,
      depositoryCenter: center?.id,
    });
  };

  return (
    <div className="bg-[#EEF0F3] max-w-maxContent dark:bg-bgDarkSecondary rounded-md dark:text-textDark mx-auto">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Title>{t("title-create-depository")}</Title>
      </div>
      {isSubmit ? (
        <InfoBlock>
          <NotificationTab
            className="min-h-[calc(100vh-280px)] justify-around"
            icon={
              <SucceedIcon className="w-[150px] h-[150px] md:h-[200px] md:w-[200px] fill-primary dark:fill-white" />
            }
            title={t("title-noti")}
            secondRow={t("text-1")}
            firstRow={t("text-2")}
            action={t("view-detail")}
            href={`/depositories/${dataRequest?.data?.id}`}
          />
        </InfoBlock>
      ) : (
        <div className="flex flex-col justify-between w-full bg-white rounded-md dark:bg-bgDark p-10 min-h-[calc(100vh-210px)]">
          <div className="md:grid md:grid-cols-2 flex flex-col md:gap-[100px] gap-10">
            <div>
              <div className="text-lg mb-5 font-medium">{t("fill-note")}</div>
              <div className="flex flex-col gap-5">
                <DropDown
                  listDropdown={listCenter?.data}
                  showing={center}
                  setShowing={setCenter}
                  title={t("center")}
                  placeholder={t("placeholder-center")}
                />
                <DropDown
                  listDropdown={allAssetTypes}
                  showing={typeSelected}
                  setShowing={setTypeSelected}
                  title={t("asset-type")}
                  placeholder={t("placeholder-asset-type")}
                />
                <SecondaryInput
                  title={t("asset-name")}
                  onChange={(e) => setAssetName(e.target.value)}
                  classNameInput="bg-white font-semibold"
                  placeholder={t("placeholder-asset-name")}
                />
                <TextDescription
                  title={t("description")}
                  onChange={(e) => setDescription(e.target.value)}
                  className="max-h-[150px] border-input"
                  placeholder={t("placeholder-asset-description")}
                  readOnly={false}
                />
              </div>
            </div>
            <UploadMultipleImage urlImgs={urlImgs} setUrlImgs={setUrlImgs} lng={lng} />
          </div>
          <PrimaryBtn
            className="max-w-[200px] w-full mx-auto md:mt-5 mt-10"
            disabled={!typeSelected || !urlImgs.length || !description || !assetName}
            onClick={handleCreateDepository}
          >
            {t("reg-btn")}
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}

export default CreateDepository;
