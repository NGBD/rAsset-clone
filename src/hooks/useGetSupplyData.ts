import { useRewardReaderContract } from "./useContract";
import { REWARD_READER_ADDRESS } from "@/constants/env";
import { useState } from "react";
import { BigNumber } from "ethers";
import { useAccount, useQuery } from "wagmi";
import { processBalanceAndSupplyData } from "@/lib/processBalanceAndSupplyData";

export default function useGetSupplyData(
  tokenContractAddress: string,
  bonusContractAddress: string,
  escrowedAddress: string,
  stakedAddress: string,
  stakedBonusAddress: string,
  stakedBonusFeeAddress: string
) {
  const { readRewardReaderContract } = useRewardReaderContract(REWARD_READER_ADDRESS);
  const { address } = useAccount();
  const [balanceAndSupplyData, setBalanceAndSupplyData] = useState<any>();

  useQuery(
    [
      "getTokenBalancesWithSupplies",
      tokenContractAddress,
      bonusContractAddress,
      escrowedAddress,
      stakedAddress,
      stakedBonusAddress,
      stakedBonusFeeAddress,
      address,
    ],
    async () => {
      const tokenBalancesWithSupplies = await readRewardReaderContract("getTokenBalancesWithSupplies", [
        address,
        [tokenContractAddress, escrowedAddress, stakedAddress, stakedBonusAddress, bonusContractAddress],
      ]);
      const converTokenBalancesWithSupplies = tokenBalancesWithSupplies.map((i) => BigNumber.from(i));

      setBalanceAndSupplyData(converTokenBalancesWithSupplies);
      return tokenBalancesWithSupplies;
    },
    {
      enabled:
        !!address &&
        !!tokenContractAddress &&
        !!bonusContractAddress &&
        !!escrowedAddress &&
        !!stakedAddress &&
        !!stakedBonusAddress &&
        !!stakedBonusFeeAddress,
    }
  );

  const { balanceData, supplyData } = processBalanceAndSupplyData(balanceAndSupplyData);

  return { balanceData, supplyData };
}
