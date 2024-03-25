import { ALCHEMY_API_KEY, POLYGON_CHAIN_ID } from "@/constants/env";
import { Alchemy, GetNftsForOwnerOptions, Network, NftOrdering } from "alchemy-sdk";

export const getNftsByrOnwerAlchemy = async (address: string, options: GetNftsForOwnerOptions = {}) => {
  const config = {
    apiKey: ALCHEMY_API_KEY,
    network: POLYGON_CHAIN_ID == "137" ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI,
  };

  const alchemy = new Alchemy(config);
  options.orderBy = NftOrdering.TRANSFERTIME;

  const response = await alchemy.nft.getNftsForOwner(address, options);
  return response;
};
