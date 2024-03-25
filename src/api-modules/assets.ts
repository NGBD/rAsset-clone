import { getAssetDetailUrl, getAssetTypesUrl } from "@/constants/ApiUrl";
import { requestAPI } from "@/lib/api";

export const getAssetTypes = () =>
  requestAPI({
    url: getAssetTypesUrl,
  });

export const getAssetDetails = (assetId) =>
  requestAPI({
    url: `${getAssetDetailUrl}/${assetId}`,
  });

export const getAssetInfo = (assetId) =>
  requestAPI({
    url: `${getAssetDetailUrl}/${assetId}/nft-info`,
  });

export const getAssetTraits = (assetId) =>
  requestAPI({
    url: `${getAssetDetailUrl}/${assetId}/traits`,
  });

export const getAssetProof = (assetId) =>
  requestAPI({
    url: `${getAssetDetailUrl}/${assetId}/asset-proof`,
  });
