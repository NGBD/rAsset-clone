import BigNumber from "bignumber.js";
import useStakingData from "./useStakingData";
import { BASIS_POINTS_DIVISOR, DECIMALS, SECONDS_PER_YEAR } from "@/constants";
import { useTokenPrice } from "./useTokenPrice";
import { useMemo } from "react";
import useNativeTokenPrice from "./useNativeTokenPrice";
import useGetDepositBalances from "./useGetDepositBalances";
import useGetSupplyData from "./useGetSupplyData";

export function useApr(
  uniV3PoolAddress: string,
  tokenContractAddress: string,
  bonusContractAddress: string,
  escrowedAddress: string,
  stakedAddress: string,
  stakedBonusAddress: string,
  stakedBonusFeeAddress: string
) {
  const tokenPrice = useTokenPrice(uniV3PoolAddress, tokenContractAddress);
  const stakingData: any = useStakingData(stakedAddress, stakedBonusAddress, stakedBonusFeeAddress);

  const nativeTokenPrice = useNativeTokenPrice();

  const depositBalanceData: any = useGetDepositBalances(
    tokenContractAddress,
    bonusContractAddress,
    escrowedAddress,
    stakedAddress,
    stakedBonusAddress,
    stakedBonusFeeAddress
  );
  const { supplyData }: { supplyData: any } = useGetSupplyData(
    tokenContractAddress,
    bonusContractAddress,
    escrowedAddress,
    stakedAddress,
    stakedBonusAddress,
    stakedBonusFeeAddress
  );

  const processPoolData = useMemo(() => {
    if (tokenPrice && stakingData && nativeTokenPrice && depositBalanceData && supplyData) {
      const maxBoostMultiplier = 2;
      const feeTokenTrackerAnnualRewardsUsd = new BigNumber(stakingData?.feeTokenTracker.tokensPerInterval.toString())
        .multipliedBy(SECONDS_PER_YEAR)
        .multipliedBy(nativeTokenPrice.toString())
        .dividedBy(DECIMALS);

      const feeTokenSupply = stakingData.feeTokenTracker.totalSupply;

      const feeTokenSupplyUsd = new BigNumber(feeTokenSupply.toString())
        .multipliedBy(tokenPrice.toString())
        .dividedBy(1e18);

      let tokenAprForNativeToken = new BigNumber(0);
      if (new BigNumber(feeTokenSupplyUsd).gt(0)) {
        tokenAprForNativeToken = new BigNumber(feeTokenTrackerAnnualRewardsUsd.toString())
          .multipliedBy(BASIS_POINTS_DIVISOR)
          .dividedBy(feeTokenSupplyUsd.toString());
      }

      const bnTokenInFeeToken = depositBalanceData.bnTokenInFeeToken;
      const bonusTokenInFeeToken = depositBalanceData.bonusTokenInFeeToken;

      let boostBasisPoints = new BigNumber(0);
      if (bnTokenInFeeToken && bonusTokenInFeeToken && bonusTokenInFeeToken.gt(0)) {
        boostBasisPoints = new BigNumber(bnTokenInFeeToken.toString())
          .multipliedBy(BASIS_POINTS_DIVISOR)
          .dividedBy(bonusTokenInFeeToken.toString());
      }

      const tokenBoostAprForNativeToken = new BigNumber(tokenAprForNativeToken)
        .multipliedBy(boostBasisPoints)
        .div(BASIS_POINTS_DIVISOR);

      const stakedTokenTrackerAnnualRewardsUsd = new BigNumber(
        stakingData.stakedTokenTracker.tokensPerInterval.toString()
      )
        .multipliedBy(SECONDS_PER_YEAR)
        .multipliedBy(tokenPrice.toString())
        .div(1e18);

      const tokenAprForNativeTokenWithBoost = new BigNumber(tokenAprForNativeToken).plus(tokenBoostAprForNativeToken);

      const stakedTokenTrackerSupplyUsd = new BigNumber(supplyData.stakedTokenTracker.toString())
        .multipliedBy(tokenPrice?.toString())
        .dividedBy(1e18);

      let tokenAprForEsToken = new BigNumber(0);
      if (new BigNumber(stakedTokenTrackerSupplyUsd).gt(0)) {
        tokenAprForEsToken = new BigNumber(stakedTokenTrackerAnnualRewardsUsd.toString())
          .multipliedBy(BASIS_POINTS_DIVISOR)
          .div(stakedTokenTrackerSupplyUsd.toString());
      }

      const tokenAprTotalWithBoost = new BigNumber(tokenAprForNativeToken.toString())
        .plus(tokenBoostAprForNativeToken)
        .plus(tokenAprForEsToken);

      const stakedTokenTrackerRewards = new BigNumber(stakingData.stakedTokenTracker.claimable.toString()).div(1e18);

      const stakedTokenTrackerRewardsUsd = new BigNumber(stakingData.stakedTokenTracker.claimable.toString())
        .multipliedBy(tokenPrice.toString())
        .div(1e18);

      const feeTokenTrackerRewards = new BigNumber(stakingData.feeTokenTracker.claimable.toString()).div(1e18);
      const feeTokenTrackerRewardsUsd = new BigNumber(stakingData.feeTokenTracker.claimable.toString())
        .multipliedBy(nativeTokenPrice)
        .div(1e18);

      const totalTokenRewardsUsd = new BigNumber(stakedTokenTrackerRewardsUsd.toString()).plus(
        feeTokenTrackerRewardsUsd
      );

      const tokenInStakedToken = depositBalanceData.tokenInStakedToken;
      const tokenInStakedTokenUsd = new BigNumber(tokenInStakedToken.toString())
        .multipliedBy(tokenPrice.toString())
        .div(1e18);

      const esTokenInStakedToken = depositBalanceData.esTokenInStakedToken;
      const esTokenInStakedTokenUsd = new BigNumber(esTokenInStakedToken.toString())
        .multipliedBy(tokenPrice.toString())
        .div(1e18);

      const bonusTokenTrackerRewards = new BigNumber(stakingData.bonusTokenTracker.claimable.toString()).div(1e18);

      const maxTokenAprForNativeToken = new BigNumber(tokenAprForNativeToken).plus(
        tokenAprForNativeToken.multipliedBy(maxBoostMultiplier)
      );

      return {
        tokenAprTotalWithBoost,
        boostBasisPoints,
        totalTokenRewardsUsd,
        tokenInStakedToken,
        tokenInStakedTokenUsd,
        stakedTokenTrackerRewards,
        stakedTokenTrackerRewardsUsd,
        feeTokenTrackerRewards,
        feeTokenTrackerRewardsUsd,
        bonusTokenTrackerRewards,
        bnTokenInFeeToken,
        tokenBoostAprForNativeToken,
        tokenAprForNativeToken,
        tokenAprForNativeTokenWithBoost,
        esTokenInStakedToken,
        esTokenInStakedTokenUsd,
        maxTokenAprForNativeToken,
      };
    }
  }, [tokenPrice, stakingData, nativeTokenPrice, depositBalanceData, supplyData]);

  return {
    tokenApr: processPoolData?.tokenAprTotalWithBoost,
    boostBasisPoints: processPoolData?.boostBasisPoints,
    totalTokenRewardsUsd: processPoolData?.totalTokenRewardsUsd,
    tokenInStakedToken: processPoolData?.tokenInStakedToken,
    tokenInStakedTokenUsd: processPoolData?.tokenInStakedTokenUsd,
    feeTokenTrackerRewards: processPoolData?.feeTokenTrackerRewards,
    feeTokenTrackerRewardsUsd: processPoolData?.feeTokenTrackerRewardsUsd,
    stakedTokenTrackerRewards: processPoolData?.stakedTokenTrackerRewards,
    stakedTokenTrackerRewardsUsd: processPoolData?.stakedTokenTrackerRewardsUsd,
    bonusTokenTrackerRewards: processPoolData?.bonusTokenTrackerRewards,
    bnTokenInFeeToken: processPoolData?.bnTokenInFeeToken,
    tokenBoostAprForNativeToken: processPoolData?.tokenBoostAprForNativeToken,
    tokenAprForNativeToken: processPoolData?.tokenAprForNativeToken,
    tokenAprForNativeTokenWithBoost: processPoolData?.tokenAprForNativeTokenWithBoost,
    esTokenInStakedToken: processPoolData?.esTokenInStakedToken,
    esTokenInStakedTokenUsd: processPoolData?.esTokenInStakedTokenUsd,
    maxTokenAprForNativeToken: processPoolData?.maxTokenAprForNativeToken,
    tokenPrice,
  };
}
