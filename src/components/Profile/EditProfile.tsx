import { shortenAddress } from "@/lib/shortenAddress";
import { format } from "date-fns";
import React, { useState } from "react";
import PrimaryBtn from "../PrimaryBtn";
import SecondaryInput from "../SecondaryInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api-modules/profile";
import { toast } from "react-toastify";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import { useTranslation } from "@/app/i18n/client";
import { useThemeContext } from "@/contexts/ThemeContext";
import InputImageBtn from "../InputImageBtn";

function EditProfile({ data, lng }) {
  const [urlImg, setUrlImg] = useState<any>();
  const { t } = useTranslation(lng, "profile");
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [twitter, setTwitter] = useState<any>();
  const [telegram, setTelegram] = useState<any>();
  const [dateOfBirth, setDateOfBirth] = useState<any>();
  const [edit, setEdit] = useState(false);
  const { currentTheme } = useThemeContext();

  const updateMutation = useMutation(
    async (newUserProfile) => {
      return await updateUserProfile(newUserProfile);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update success");
          queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
          setEdit(false);
        } else {
          toast.error(data?.response?.data || data?.message || "Opps! Something went wrong...");
        }
      },
      onError: (err: any) => {
        console.log("Update error", err?.message);
        toast.error(err?.response?.data?.message || err?.message);
      },
    }
  );

  function handleUpdate() {
    const objSubmit = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      telegram: telegram,
      twitter: twitter,
      dateOfBirth: dateOfBirth,
      avatar: urlImg,
    };
    // @ts-ignore
    updateMutation.mutate(objSubmit);
  }
  return (
    <div className="md:grid md:grid-cols-37 flex flex-col gap-5">
      <div className="pt-14 px-6 pb-5 flex flex-col items-center bg-white dark:bg-bgDark rounded-md">
        <InputImageBtn data={data} lng={lng} urlImg={urlImg} setUrlImg={setUrlImg} disabled={!edit} />
        <p className="text-grayLight text-center mt-2">{t("note")}</p>
      </div>
      {data ? (
        <div className="pb-5 rounded-md flex flex-col justify-between bg-white dark:bg-bgDark gap-4">
          <InfoBlock>
            <div className="flex items-center justify-between">
              <BlockTitle label={t("personal-info")} />
              <div className="flex gap-2 items-end">
                {edit ? (
                  <PrimaryBtn className=" h-10 font-semibold text-base uppercase" onClick={handleUpdate}>
                    {t("save-btn")}
                  </PrimaryBtn>
                ) : (
                  <PrimaryBtn className="h-10 font-semibold text-base uppercase" onClick={() => setEdit(true)}>
                    {t("edit-btn")}
                  </PrimaryBtn>
                )}
              </div>
            </div>
            <div
              className={`md:grid md:grid-cols-2 flex flex-col gap-6 ${currentTheme === "dark" ? "inputDarmode" : ""}`}
            >
              <SecondaryInput
                title={t("first-name")}
                defaultValue={data?.data?.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                placeholder={t("placeholder-first-name")}
                readOnly={!edit}
              />
              <SecondaryInput
                readOnly={!edit}
                title={t("last-name")}
                defaultValue={data?.data?.lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                placeholder={t("placeholder-last-name")}
              />
              <SecondaryInput
                readOnly={!edit}
                title={t("username")}
                defaultValue={data?.data?.username}
                onChange={(e) => setUsername(e.target.value)}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                placeholder={t("placeholder-username")}
              />
              <SecondaryInput
                readOnly={!edit}
                title={t("date-of-birth")}
                defaultValue={
                  data?.data?.dateOfBirth
                    ? format(new Date(data?.data?.dateOfBirth), "yyyy-MM-dd")
                    : "Enter your birthday"
                }
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                type="date"
                placeholder={"Enter your birthday"}
              />
            </div>
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("security")} />
            {edit ? (
              <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                <SecondaryInput
                  readOnly={!edit}
                  title={t("email")}
                  defaultValue={data?.data?.email}
                  className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                  classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary " : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder-email")}
                />
                <SecondaryInput
                  readOnly={!edit}
                  title={t("phone-number")}
                  defaultValue={data?.data?.phoneNumber}
                  className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                  classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary " : ""}
                  type="number"
                  placeholder={t("placeholder-phone-number")}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            ) : (
              <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
                <SecondaryInput
                  verify={data?.data?.isEmailVerified}
                  title={t("email")}
                  typeData="email"
                  defaultValue={data?.data?.email}
                  readOnly={true}
                  valueInput={data?.data?.email}
                  placeholder={t("placeholder-email")}
                />
                <SecondaryInput
                  typeData="phoneNumber"
                  verify={data?.data?.isPhoneNumberVerified}
                  title={t("phone-number")}
                  defaultValue={data?.data?.phoneNumber}
                  readOnly={true}
                  valueInput={data?.data?.phoneNumber}
                  type="number"
                  placeholder={t("placeholder-phone-number")}
                />
              </div>
            )}
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("linked-accounts")} />
            <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
              <SecondaryInput
                readOnly={!edit}
                title={t("twitter")}
                defaultValue={data?.data?.twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                placeholder={t("placeholder-twitter")}
              />
              <SecondaryInput
                readOnly={!edit}
                title={t("telegram")}
                defaultValue={data?.data?.telegram}
                className={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                classNameInput={edit ? "bg-gray-200 dark:bg-bgDarkSecondary" : ""}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder={t("placeholder-telegram")}
              />
            </div>
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("linked-wallet")} />
            <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
              <SecondaryInput
                title={t("address")}
                defaultValue={shortenAddress(data?.data?.walletAddress)}
                readOnly={true}
                copy={data?.data?.walletAddress}
              />
            </div>
          </InfoBlock>
        </div>
      ) : (
        <SkeletonProfile lng={lng} />
      )}
    </div>
  );
}

export default EditProfile;

function SkeletonProfile({ lng }) {
  const { t } = useTranslation(lng, "profile");
  return (
    <div className="pb-5 rounded-md flex flex-col justify-between bg-white dark:bg-bgDark gap-4">
      <InfoBlock>
        <div className="flex items-center justify-between">
          <BlockTitle label={t("personal-info")} />
          <div className="flex gap-2 items-end">
            <PrimaryBtn className="h-10 font-semibold text-base uppercase">{t("edit-btn")}</PrimaryBtn>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-6 ">
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("first-name")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("last-name")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("username")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("date-of-birth")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
        </div>
      </InfoBlock>
      <InfoBlock>
        <BlockTitle label={t("security")} />
        <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("email")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("phone-number")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
        </div>
      </InfoBlock>
      <InfoBlock>
        <BlockTitle label={t("linked-accounts")} />
        <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("twitter")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("telegram")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
        </div>
      </InfoBlock>
      <InfoBlock>
        <BlockTitle label={t("linked-wallet")} />
        <div className="md:grid md:grid-cols-2 flex flex-col gap-6">
          <div className="text-base w-full py-2 px-6 border rounded-md border-input">
            <p className="text-sm text-title">{t("address")}</p>
            <div className="h-6 rounded-md w-full mt-1 skeleton-loading"></div>
          </div>
        </div>
      </InfoBlock>
    </div>
  );
}
