import { useEffect, useState } from "react";
import { useErc20Contract } from "./useContract";

export function useTotalSupply(tokenContractAddress: string) {
  const { readErc20Contract } = useErc20Contract(tokenContractAddress);
  const [totalSupply, setTotalSupply] = useState<any>();

  const getTotalSypply = async () => {
    try {
      const totalSupply = await readErc20Contract("totalSupply");
      setTotalSupply(totalSupply);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tokenContractAddress) {
      getTotalSypply();
    }
  }, [tokenContractAddress]);

  return totalSupply;
}
