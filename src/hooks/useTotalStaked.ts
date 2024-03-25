import { useErc20Contract } from "./useContract";
import { useQuery } from "@tanstack/react-query";

export function useTotalStaked(tokenContractAddress: string, stakedAddress: string) {
  const { readErc20Contract } = useErc20Contract(tokenContractAddress);

  const { data } = useQuery(
    ["getPoolTotalStaked", tokenContractAddress, stakedAddress],
    async () => {
      const totalStaked = await readErc20Contract("balanceOf", [stakedAddress]);
      return totalStaked;
    },
    {
      enabled: !!tokenContractAddress && !!stakedAddress,
    }
  );

  return data;
}
