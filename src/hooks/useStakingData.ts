import { useState } from "react";
import { useRewardReaderContract } from "./useContract";
import { REWARD_READER_ADDRESS } from "@/constants/env";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { processStakingData } from "@/lib/processStakingData";

export default function useStakingData(
  stakedAddress: string,
  stakedBonusAddress: string,
  stakedBonusFeeAddress: string
) {
  const { readRewardReaderContract } = useRewardReaderContract(REWARD_READER_ADDRESS);
  const [stakingData, setStakingData] = useState<any>();
  const { address } = useAccount();

  useQuery(
    ["getStakingInfo", stakedAddress, stakedBonusAddress, stakedBonusFeeAddress, address],
    async () => {
      const stakingInfo = await readRewardReaderContract("getStakingInfo", [
        address,
        [stakedAddress, stakedBonusAddress, stakedBonusFeeAddress],
      ]);
      const convertInfo = stakingInfo.map((i) => BigNumber.from(i));
      const processedData = processStakingData(convertInfo);
      setStakingData(processedData);
      return stakingInfo;
    },
    {
      enabled: !!address && !!stakedAddress && !!stakedBonusAddress && !!stakedBonusFeeAddress,
    }
  );

  return stakingData;
}
