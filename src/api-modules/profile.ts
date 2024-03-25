import { getProfileUrl, vefiryEmailUrl } from "@/constants/ApiUrl";
import { patchAPI, postAPI, requestAPI } from "@/lib/api";

export const getUserProfile = () =>
  requestAPI({
    url: getProfileUrl,
  });

export const updateUserProfile = (newUserProfile) =>
  patchAPI({
    url: getProfileUrl,
    data: newUserProfile,
  });

export const getOtpEmail = () =>
  postAPI({
    url: `${vefiryEmailUrl}/request-otp`,
  });

export const verifyOtpEmail = (otp) =>
  postAPI({
    url: `${vefiryEmailUrl}/verify`,
    data: otp,
  });
