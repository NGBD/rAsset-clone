import { useEffect, useState } from "react";
import { useUniV3Contract } from "./useContract";
import { BigNumberish } from "ethers";
import { Token as UniToken } from "@uniswap/sdk-core";
import { Pool } from "@uniswap/v3-sdk";
import { FEE_TOKEN_ADDRESS, POLYGON_CHAIN_ID } from "@/constants/env";
import { USDC_DECIMALS } from "@/constants";
// import { parseValue } from "@/lib/parseValue";
// import expandDecimals from "@/lib/expandDecimals";

export function useTokenPrice(uniV3PoolAddress: string, tokenAddress: string) {
  const { readUniV3Contract } = useUniV3Contract(uniV3PoolAddress);
  const [tokenPrice, setTokenPrice] = useState<BigNumberish>();

  const handleGetTokenprice = async () => {
    const [uniPoolSlot0, fee, liquidity] = await Promise.all([
      readUniV3Contract("slot0"),
      readUniV3Contract("fee"),
      readUniV3Contract("liquidity"),
    ]);

    if (uniPoolSlot0) {
      const tokenA = new UniToken(Number(POLYGON_CHAIN_ID), FEE_TOKEN_ADDRESS, USDC_DECIMALS, "SYMBOL", "NAME");
      const tokenB = new UniToken(Number(POLYGON_CHAIN_ID), tokenAddress, 18, "SYMBOL", "NAME");

      const pool = new Pool(
        tokenA, // tokenA
        tokenB, // tokenB
        Number(fee), // fee
        uniPoolSlot0[0].toString(),
        liquidity.toString(), // liquidity
        uniPoolSlot0[1] // tickCurrent
      );

      const price = pool.token0.address === tokenAddress ? pool.token0Price.toFixed() : pool.token1Price.toFixed();

      // const poolTokenPrice = pool.priceOf(tokenB).toSignificant(6);
      // const poolTokenPriceAmount = parseValue(poolTokenPrice, 18);
      // const price = poolTokenPriceAmount?.mul(USDC_PRICE).div(expandDecimals(1, USDC_DECIMALS));

      setTokenPrice(price);
    }
  };

  useEffect(() => {
    if (uniV3PoolAddress) {
      handleGetTokenprice();
    }
  }, [uniV3PoolAddress]);

  return tokenPrice;
}
