import { depositoryCenterUrl, getDepositoryDetailUrl, getDepositoryUrl } from "@/constants/ApiUrl";
import { postAPI, requestAPI } from "@/lib/api";
import { convertObjectToQueryString } from "@/lib/convertObjToQueryString";

export const getListDepository = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${getDepositoryUrl}${queryString}`,
  });
};

export const createNewDepository = (newDepository) =>
  postAPI({
    url: `${getDepositoryUrl}/mint-nft`,
    data: newDepository,
  });

export const getDepositoryDetail = (depositoryRequestId) => {
  return requestAPI({
    url: `${getDepositoryDetailUrl}/${depositoryRequestId}`,
  });
};

export const getListDepositoryCenter = (paramsObj) => {
  const queryString = convertObjectToQueryString(paramsObj);
  return requestAPI({
    url: `${depositoryCenterUrl}${queryString}`,
  });
};
