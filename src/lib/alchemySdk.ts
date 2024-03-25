import { ALCHEMY_API_KEY, POLYGON_CHAIN_ID } from "@/constants/env";
import { Alchemy, Network } from "alchemy-sdk";

export const alchemySdk = () => {
  const config = {
    apiKey: ALCHEMY_API_KEY,
    network: POLYGON_CHAIN_ID == "137" ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI,
  };

  const alchemy = new Alchemy(config);

  return alchemy;
};
