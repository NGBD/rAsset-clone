import { MARKET_URL } from "./env";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const refreshAccessTokenUrl = `${baseUrl}/auth/refrest-token`;

export const getNonceUrl = `${baseUrl}/depositories/web3/nonce`;

export const loginUrl = `${baseUrl}/depositories/web3/sign`;

export const getAssetTypesUrl = `${baseUrl}/publics/asset-types`;

export const getAssetDetailUrl = `${baseUrl}/depositories/assets`;

export const getProfileUrl = `${baseUrl}/depositories/owners/profile`;

export const getSharesUrl = `${baseUrl}/depositories/shares`;

export const getDepositoryUrl = `${baseUrl}/depositories/depository-requests`;

export const getDepositoryDetailUrl = `${baseUrl}/depositories/depository-requests`;

export const depositoryCenterUrl = `${baseUrl}/depositories/depository-centers`;

export const vefiryEmailUrl = `${baseUrl}/depositories/users/email`;

export const marketDataUrl = `${MARKET_URL}/v1/getTokenData`;
