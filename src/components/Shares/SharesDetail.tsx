"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowLeft from "../icon/ArrowLeft";
import Title from "../Title";
import PrimaryBtn from "../PrimaryBtn";
import { shortenAddress } from "@/lib/shortenAddress";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getShareDetail, getShareMarketData } from "@/api-modules/shares";
import { useErc20Contract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import BigNumber from "bignumber.js";
import { format } from "date-fns";
import InfoBlock from "../InfoBlock";
import RowInfo from "../RowInfo";
import BlockTitle from "../BlockTitle";
import { useTranslation } from "@/app/i18n/client";
import Logo from "../icon/Logo";
import Link from "next/link";
import { useApr } from "@/hooks/useApr";
import { useTotalStaked } from "@/hooks/useTotalStaked";
import { useTotalSupply } from "@/hooks/useTotalSupply";
import { AMM_URL, FINANCIAL_URL, PUBLIC_URL } from "@/constants";

interface ShareDetail {
  asset: {
    assetName: string;
    assetType: {
      contractAddress: string;
      id: string;
      typeName: string;
    };
    id: string;
    nftId: number;
    slug: string;
  };
  tokenContractAddress: string;
  bonusAddress?: string;
  escrowedAddress?: string;
  stakedAddress?: string;
  stakedBonusAddress?: string;
  stakedBonusFeeAddress?: string;
  uniV3Pool?: string;
  decimals: number;
  id: string;
  tokenName: string;
  tokenSymbol: string;
  createdAt: string;
}

interface MarketData {
  highgest24h: number;
  lowest24h: number;
  price: number;
  price24h: number;
  priceChange: number;
  volume24h: number;
}

function SharesDetail({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "shares");
  const router = useRouter();
  const params = useParams();
  const { shareId } = params;
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState("");
  const [marketData, setMarketData] = useState<MarketData>();

  const { data: shareDetailData }: { data: ShareDetail } = useQuery(
    ["getShareDetail", shareId],
    async () => {
      const response = await getShareDetail(shareId);
      return response?.data;
    },
    {
      enabled: !!shareId,
    }
  );

  const getMarketDataMutation = useMutation(
    async (newUserProfile) => {
      return getShareMarketData(newUserProfile);
    },
    {
      onSuccess: (data) => {
        setMarketData(data?.data[shareDetailData?.tokenContractAddress.toLocaleLowerCase()]);
      },
      onError: (err: any) => {
        console.log("Get market data error", err?.message);
      },
    }
  );

  useEffect(() => {
    if (shareDetailData) {
      const payload = {
        tokens: [shareDetailData.tokenContractAddress],
      };
      // @ts-ignore
      getMarketDataMutation.mutate(payload);
    }
  }, [shareDetailData]);

  const { readErc20Contract } = useErc20Contract(shareDetailData?.tokenContractAddress);

  const getUserBalance = async () => {
    try {
      const data = await readErc20Contract("balanceOf", [address]);
      setUserBalance(new BigNumber(data.toString()).dividedBy(1e18).toFixed());
    } catch (error) {
      console.log(error);
    }
  };

  const { tokenAprForNativeTokenWithBoost, tokenInStakedToken, tokenInStakedTokenUsd, tokenPrice } = useApr(
    shareDetailData?.uniV3Pool,
    shareDetailData?.tokenContractAddress,
    shareDetailData?.bonusAddress,
    shareDetailData?.escrowedAddress,
    shareDetailData?.stakedAddress,
    shareDetailData?.stakedBonusAddress,
    shareDetailData?.stakedBonusFeeAddress
  );

  const price = tokenPrice || marketData?.price || 0;

  const tokenTotalStaked = useTotalStaked(shareDetailData?.tokenContractAddress, shareDetailData?.stakedAddress);

  const tokenTotalSupply = useTotalSupply(shareDetailData?.tokenContractAddress);

  useEffect(() => {
    if (address && shareDetailData?.tokenContractAddress) {
      getUserBalance();
    }
  }, [address, shareDetailData?.tokenContractAddress]);

  return (
    <div className="mx-auto max-w-maxContent">
      <div className="flex items-center gap-2 mt-10">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Title>{t("title-detail")}</Title>
      </div>
      {shareDetailData ? (
        <div>
          <InfoBlock className="flex-row items-center">
            <div className="flex items-center gap-4 text-lg">
              <Logo className="w-[30px] h-[30px] fill-[#5550DC] dark:fill-white" />
              <div className="flex flex-wrap max-w-[150px] md:flex-nowrap md:max-w-[500px]">
                <p className="mr-3 font-bold">{shareDetailData?.tokenSymbol}</p>
                <p>{shareDetailData?.tokenName}</p>
              </div>
            </div>

            <PrimaryBtn className="py-1 whitespace-nowrap w-[120px]">
              <Link href={`${FINANCIAL_URL}`} target="_blank">
                {t("list-btn")}
              </Link>
            </PrimaryBtn>
          </InfoBlock>
          <div className="mt-5 md:grid-cols-2 flex flex-col md:gap-5 gap-[10px] md:grid">
            <div className="flex flex-col justify-between gap-[10px]">
              <InfoBlock className="h-full">
                <BlockTitle
                  label={t("token-information")}
                  href={`https://polygonscan.com/address/${shareDetailData?.tokenContractAddress}`}
                />
                <RowInfo
                  label={t("contract-address")}
                  value={shortenAddress(shareDetailData?.tokenContractAddress)}
                  copy={shareDetailData?.tokenContractAddress}
                />

                <RowInfo label={t("token-name")} value={shareDetailData?.tokenName} />
                <RowInfo label={t("token-symbol")} value={shareDetailData?.tokenSymbol} />

                <RowInfo label={t("decimals")} value={`${shareDetailData?.decimals}`} />
                <RowInfo label={t("standard")} value={`ERC20`} />
                <RowInfo label={t("network")} value={"Polygon"} />
                <RowInfo
                  label={t("created-time")}
                  value={
                    shareDetailData?.createdAt
                      ? format(new Date(shareDetailData?.createdAt), "dd-MM-yyyy")
                      : "--/--/---"
                  }
                />
              </InfoBlock>
              <InfoBlock>
                <BlockTitle label={t("asset-information")} href={`${PUBLIC_URL}/${shareDetailData?.asset?.slug}`} />
                <RowInfo label={t("asset-name")} value={shareDetailData?.asset?.assetName} />
                <RowInfo label={t("asset-ID")} value={shareDetailData?.asset?.nftId} />
                <RowInfo
                  label={t("contract-address")}
                  value={shortenAddress(shareDetailData?.asset?.assetType?.contractAddress)}
                  copy={shareDetailData?.asset?.assetType?.contractAddress}
                />
                <RowInfo
                  label={t("created-time")}
                  value={
                    shareDetailData?.createdAt
                      ? format(new Date(shareDetailData?.createdAt), "dd-MM-yyyy")
                      : "--/--/---"
                  }
                />
              </InfoBlock>
            </div>
            <div className="flex flex-col justify-between gap-[10px]">
              <InfoBlock>
                <BlockTitle label={t("balance-information")} />
                <RowInfo
                  label={t("balance")}
                  value={`${new BigNumber(userBalance).toFormat()} ${shareDetailData?.tokenSymbol} `}
                />
                <RowInfo
                  label={t("estimate-value")}
                  value={`$${new BigNumber(userBalance).multipliedBy(Number(price)).toFormat(2)}`}
                />
              </InfoBlock>
              <InfoBlock>
                <BlockTitle label={t("market-information")} href={AMM_URL} />
                <RowInfo label={t("price")} value={`$${new BigNumber(Number(price)).toFormat(2)}`} />
                <RowInfo label={t("change")} value={`${new BigNumber(marketData?.priceChange ?? 0).toFormat(2)}%`} />
                <RowInfo
                  label={t("tvl")}
                  value={`$${new BigNumber(Number(price)).multipliedBy(tokenTotalSupply).div(1e18).toFormat(2)}`}
                />
                <RowInfo label={t("volume")} value={`$${new BigNumber(marketData?.volume24h || 0).toFormat(5)}`} />
              </InfoBlock>
              <InfoBlock>
                <BlockTitle
                  label={t("financial-information")}
                  href={`${FINANCIAL_URL}/pool-detail/${shareDetailData?.id}`}
                />
                <RowInfo
                  label={t("your-staked")}
                  value={`${new BigNumber(tokenInStakedToken?.toString() || 0).dividedBy(1e18).toFormat(2)} ${
                    shareDetailData?.tokenSymbol
                  } ($${new BigNumber(tokenInStakedTokenUsd || 0).toFormat(2)})`}
                />
                <RowInfo
                  label={t("estimate-apr")}
                  value={`${new BigNumber(tokenAprForNativeTokenWithBoost || 0).dividedBy(1e2).toFormat(2)}%`}
                />
                <RowInfo
                  label={t("total-staked")}
                  value={`${new BigNumber(tokenTotalStaked?.toString() || 0).dividedBy(1e18).toFormat()} ${
                    shareDetailData?.tokenSymbol
                  } ($${new BigNumber(tokenTotalStaked?.toString() || 0)
                    .multipliedBy(Number(price) || 0)
                    .dividedBy(1e18)
                    .toFormat(2)})`}
                />
                <RowInfo
                  label={t("total-supply")}
                  value={`${new BigNumber(tokenTotalSupply).div(1e18).toFormat()} ${
                    shareDetailData?.tokenSymbol
                  } ($${new BigNumber(tokenTotalSupply).multipliedBy(Number(price)).div(1e18).toFormat(2)})`}
                />
              </InfoBlock>
            </div>
          </div>
        </div>
      ) : (
        <SharesDetailSkeleton lng={lng} />
      )}
    </div>
  );
}

export default SharesDetail;

function SkeletonValue() {
  return <div className="w-20 h-6 rounded-md skeleton-loading"></div>;
}

function SharesDetailSkeleton({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "shares");
  return (
    <div>
      <InfoBlock className="flex-row items-center">
        <div className="flex items-center gap-4 text-lg">
          <div className="w-[30px] h-[30px] skeleton-loading rounded-full"></div>
          <div className="flex flex-wrap max-w-[150px] gap-1">
            <div className="w-20 h-6 rounded-md skeleton-loading"></div>
            <div className="w-20 h-6 rounded-md skeleton-loading"></div>
          </div>
        </div>
        <div className="w-24 h-10 py-1 rounded-md skeleton-loading"></div>
      </InfoBlock>
      <div className="flex-col gap-5 mt-5 md:grid-cols-2 md:grid">
        <div className="flex flex-col justify-between gap-[10px]">
          <InfoBlock>
            <BlockTitle label={t("token-information")} href="/" />
            <RowInfo value={<SkeletonValue />} label={t("contract-address")} />
            <RowInfo value={<SkeletonValue />} label={t("token-name")} />
            <RowInfo value={<SkeletonValue />} label={t("token-symbol")} />
            <RowInfo label={t("decimals")} value={<SkeletonValue />} />
            <RowInfo label={t("standard")} value={<SkeletonValue />} />
            <RowInfo value={<SkeletonValue />} label={"Network"} />
            <RowInfo value={<SkeletonValue />} label={t("created-time")} />
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("asset-information")} href="/" />
            <RowInfo value={<SkeletonValue />} label={t("asset-name")} />
            <RowInfo value={<SkeletonValue />} label={t("asset-ID")} />
            <RowInfo value={<SkeletonValue />} label={t("contract-address")} />
            <RowInfo value={<SkeletonValue />} label={t("created-time")} />
          </InfoBlock>
        </div>
        <div className="flex flex-col justify-between gap-[10px]">
          <InfoBlock>
            <BlockTitle label={t("balance-information")} />
            <RowInfo label={t("balance")} value={<SkeletonValue />} />
            <RowInfo label={t("estimate-value")} value={<SkeletonValue />} />
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("market-information")} href="/" />

            <RowInfo label={t("price")} value={<SkeletonValue />} />
            <RowInfo label={t("change")} value={<SkeletonValue />} />
            <RowInfo label={t("tvl")} value={<SkeletonValue />} />
            <RowInfo label={t("volume")} value={<SkeletonValue />} />
          </InfoBlock>
          <InfoBlock>
            <BlockTitle label={t("financial-infomation")} href="/" />
            <RowInfo label={t("your-staked")} value={<SkeletonValue />} />
            <RowInfo label={t("estimate-apr")} value={<SkeletonValue />} />
            <RowInfo label={t("total-staked")} value={<SkeletonValue />} />
            <RowInfo label={t("total-supply")} value={<SkeletonValue />} />
          </InfoBlock>
        </div>
      </div>
    </div>
  );
}
