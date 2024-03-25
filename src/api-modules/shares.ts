import { getSharesUrl, marketDataUrl } from "@/constants/ApiUrl";
import { postAPI, requestAPI } from "@/lib/api";
import { convertObjectToQueryString } from "@/lib/convertObjToQueryString";

export const getShares = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getSharesUrl}${queryString}`,
  });
};

export const getShareDetail = (shareId) => {
  return requestAPI({
    url: `${getSharesUrl}/${shareId}`,
  });
};

//Stat
export const getShareDetailStats = (tokenAddress) => {
  return requestAPI({
    url: `${getSharesUrl}/stats/${tokenAddress}`,
  });
};

export const getShareMarketData = (tokens) => {
  return postAPI({
    url: marketDataUrl,
    data: tokens,
  });
};
