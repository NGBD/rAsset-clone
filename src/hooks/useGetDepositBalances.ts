import { processDepositBalanceData } from "@/lib/processDepositBalanceData";
import { useState } from "react";
import { useRewardReaderContract } from "./useContract";
import { REWARD_READER_ADDRESS } from "@/constants/env";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

export default function useGetDepositBalances(
  tokenContractAddress: string,
  bonusContractAddress: string,
  escrowedAddress: string,
  stakedAddress: string,
  stakedBonusAddress: string,
  stakedBonusFeeAddress: string
) {
  const { readRewardReaderContract } = useRewardReaderContract(REWARD_READER_ADDRESS);
  const [depositBalanceData, setDepositBalanceData] = useState<any>();
  const { address } = useAccount();

  useQuery(
    [
      "getDepositBalances",
      tokenContractAddress,
      bonusContractAddress,
      escrowedAddress,
      stakedAddress,
      stakedBonusAddress,
      stakedBonusFeeAddress,
      address,
    ],
    async () => {
      const depositBalances = await readRewardReaderContract("getDepositBalances", [
        address,
        [tokenContractAddress, escrowedAddress, stakedAddress, stakedBonusAddress, bonusContractAddress],
        [stakedAddress, stakedAddress, stakedBonusAddress, stakedBonusFeeAddress, stakedBonusFeeAddress],
      ]);
      const converDepositBalances = depositBalances.map((i) => BigNumber.from(i));
      const processedDepositBalances = processDepositBalanceData(converDepositBalances);
      setDepositBalanceData(processedDepositBalances);
      return depositBalances;
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

  return depositBalanceData;
}
