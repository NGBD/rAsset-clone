import { getNonceUrl, loginUrl } from "@/constants/ApiUrl";
import { postAPI } from "@/lib/api";

export const getNonce = (payload) =>
  postAPI({
    url: getNonceUrl,
    data: payload,
  });

export const login = (payload) =>
  postAPI({
    url: loginUrl,
    data: payload,
  });
