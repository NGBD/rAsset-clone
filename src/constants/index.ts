export const MAX_UINT_AMOUNT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const SECONDS_PER_DAY = 86_400;

export const SECONDS_PER_YEAR = 31_536_000;

export const DECIMALS = 1e18;

export const BASIS_POINTS_DIVISOR = 10_000;

export const USDC_PRICE = 1;

export const USDC_DECIMALS = 6;

export const FINANCIAL_URL =
  process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID === "137"
    ? "https://financial-stg.rasset.io"
    : "https://financial-dev.rasset.io";

export const PUBLIC_URL =
  process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID === "137"
    ? "https://stg.rasset.io/en/assets"
    : "https://dev.rasset.io/en/assets";

export const AMM_URL =
  process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID === "137" ? "https://amm-stg.rasset.io/" : "https://amm-dev.rasset.io/";
