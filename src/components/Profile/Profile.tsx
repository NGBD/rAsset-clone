"use client";
import React, { useState } from "react";
import Title from "../Title";
import { getUserProfile } from "@/api-modules/profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import EditProfile from "./EditProfile";
import { useTranslation } from "@/app/i18n/client";

function Profile({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "profile");
  const { address } = useAccount();
  const { isLogin } = useAuthContext();
  const [userProfile, setUserProfile] = useState<any>();

  useQuery(
    ["getUserProfile", address, isLogin],
    async () => {
      const response = await getUserProfile();
      setUserProfile(response);
      return response;
    },
    {
      enabled: isLogin && !!address,
    }
  );

  return (
    <div className="max-w-maxContent mx-auto">
      <Title>{t("title")}</Title>
      <EditProfile data={userProfile} lng={lng} />
    </div>
  );
}

export default Profile;
