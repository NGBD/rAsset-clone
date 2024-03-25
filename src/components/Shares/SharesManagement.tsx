"use client";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import FilterDropDown from "../FilterDropDown";
import Table from "../Table";
import BigNumber from "bignumber.js";
import { getAssetTypes } from "@/api-modules/assets";
import { useQuery } from "@tanstack/react-query";
import { getShares } from "@/api-modules/shares";
import { BigNumber as BigNumberEthers } from "ethers";
import { useAccount } from "wagmi";
import useDebounce from "@/hooks/useDebounce";
import EmptyPage from "../EmptyPage";
import { useRouter } from "next/navigation";
import PrimaryInput from "../PrimaryInput";
import { useTranslation } from "@/app/i18n/client";
import Logo from "../icon/Logo";
// import Link from "next/link";
// import CloseDialogIcon from "../icon/CloseDialogIcon";
import { POLYGON_CHAIN_ID, REWARD_READER_ADDRESS } from "@/constants/env";
import { useRewardReaderContract } from "@/hooks/useContract";
import { processDepositBalanceData } from "@/lib/processDepositBalanceData";
import { Erc20Abi } from "@/abis/Erc20";
import { readContract } from "@wagmi/core";

const headerTextAlignRight = ["Balance", "Percentage", "Số dư", "Phần trăm", "Total Supply", "Tổng cung", "Staking"];

function SharesManagement({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "shares");
  const [allAssetTypes, setAllAssetTypes] = useState<any>([]);
  const [typeSelected, setTypeSelected] = useState<any>({ typeKey: "all", typeName: "All" });
  const { address } = useAccount();
  const [searchParams, setSearchParams] = useState<any>("");
  const debouncedSearchValue = useDebounce(searchParams, 500);
  const [closeWarning, setCloseWarning] = useState(false);
  const { readRewardReaderContract } = useRewardReaderContract(REWARD_READER_ADDRESS);

  // const handleCloseWarning = () => {
  //   setCloseWarning(true);
  // };

  const router = useRouter();

  const redirect = (prefix, itemId) => {
    router.push(`${prefix}/${itemId}`);
  };

  useQuery(["getAssetTypes"], async () => {
    const response = await getAssetTypes();
    setAllAssetTypes([typeSelected, ...response.data.data]);
    return response.data;
  });

  const sharesData = useQuery(["getShares", debouncedSearchValue, typeSelected], async () => {
    const queryObj = {
      offset: 0,
      limit: 100,
      search: debouncedSearchValue,
    };

    if (typeSelected.typeKey !== "all") {
      queryObj["assetTypeId"] = typeSelected.id;
    }

    const response = await getShares(queryObj);

    const checkBalanceOrStake = await Promise.all(
      response.data.data.map(async (share) => {
        let result = share;
        const check: any[] = [
          readContract({
            address: share.tokenContractAddress,
            abi: Erc20Abi,
            chainId: Number(POLYGON_CHAIN_ID),
            functionName: "balanceOf",
            args: [address],
          }),
          readContract({
            address: share.tokenContractAddress,
            abi: Erc20Abi,
            chainId: Number(POLYGON_CHAIN_ID),
            functionName: "totalSupply",
          }),
        ];
        if (share?.uniV3Pool) {
          check.push(
            readRewardReaderContract("getDepositBalances", [
              address,
              [
                share?.tokenContractAddress,
                share?.escrowedAddress,
                share?.stakedAddress,
                share?.stakedBonusAddress,
                share?.bonusAddress,
              ],
              [
                share?.stakedAddress,
                share?.stakedAddress,
                share?.stakedBonusAddress,
                share?.stakedBonusFeeAddress,
                share?.stakedBonusFeeAddress,
              ],
            ])
          );
        }

        const [tokenBalance, totalSupply, depositBalances] = await Promise.all(check);
        result = { ...result, tokenBalance, totalSupply };

        if (depositBalances) {
          const converDepositBalances = depositBalances.map((i) => BigNumberEthers.from(i));
          const processedDepositBalances: any = processDepositBalanceData(converDepositBalances);
          result = { ...result, stakeData: processedDepositBalances };
        }

        return result;
      })
    );

    const data = checkBalanceOrStake.filter(
      (share) =>
        new BigNumber(share.tokenBalance).gt(0) ||
        share?.stakeData?.tokenInStakedToken.gt(0) ||
        share?.stakeData?.esTokenInStakedToken.gt(0)
    );
    return data;
  });

  const columnsSharesTable = [
    {
      Header: " ",
      columns: [
        {
          Header: t("col-1"),
          accessor: (data: any) => (
            <div className="flex items-center justify-end gap-3 md:justify-start">
              <Logo className="w-[30px] h-[30px] fill-[#5550DC] dark:fill-white" />
              <p>{data?.tokenSymbol}</p>
            </div>
          ),
        },
        {
          Header: t("col-2"),
          accessor: (data: any) => (
            <div>
              <p>{data?.tokenName}</p>
            </div>
          ),
        },
        {
          Header: t("col-3"),
          accessor: (data: any) => <div>{data.assets.assetName}</div>,
        },
        {
          Header: t("col-4"),
          accessor: (data: any) => (
            <div className="flex justify-end text-[#ffb672]">
              {new BigNumber(data?.tokenBalance).dividedBy(1e18).toFormat()} {data?.tokenSymbol}
            </div>
          ),
        },
        {
          Header: t("staking"),
          accessor: (data: any) => (
            <div className="flex flex-col items-end">
              <p className="text-[#ea72ff]">
                {`${new BigNumber(data?.stakeData?.tokenInStakedToken?.toString() || 0).dividedBy(1e18).toFormat(2)} ${
                  data?.tokenSymbol
                }`}
              </p>
              <p className="text-[#4dbeff]">
                {`${new BigNumber(data?.stakeData?.esTokenInStakedToken?.toString() || 0)
                  .dividedBy(1e18)
                  .toFormat(2)} Es${data?.tokenSymbol}`}
              </p>
            </div>
          ),
        },
        {
          Header: t("col-5"),
          accessor: (data: any) => (
            <div className="flex justify-end">
              {new BigNumber(data?.tokenBalance)
                .plus(data.stakeData?.tokenInStakedToken?.toString() || 0)
                .div(data?.totalSupply)
                .multipliedBy(1e2)
                .toFormat(2)}
              %
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    if (sharesData?.data?.length === 0) {
      setCloseWarning(true);
    }
  }, [sharesData, address]);

  // useEffect(() => {
  //   const marqueeElem = marqueeRef.current;

  //   const stopAnimation = () => {
  //     if (marqueeElem.scrollWidth <= marqueeElem.clientWidth) {
  //       marqueeElem.style.animation = "none";
  //     } else {
  //       marqueeElem.style.animation = "marquee 20s linear infinite";
  //     }
  //   };

  //   stopAnimation();

  //   window.addEventListener("resize", stopAnimation);

  //   return () => {
  //     window.removeEventListener("resize", stopAnimation);
  //   };
  // }, []);
  console.log("shareData", sharesData?.data);

  return (
    <div className="mx-auto max-w-maxContent">
      {/* <div
        className={`py-1 w-full h-10 bg-[#B4B4EB] z-10 flex fixed md:top-[80px] top-[60px] md:left-[100px] left-0 text-lg md:pr-[100px] text-black overflow-hidden items-center ${
          closeWarning ? "" : "hidden"
        }`}
      >
        <span className="flex items-center justify-center w-full whitespace-nowrap" ref={marqueeRef}>
          Do not miss !!! The real asset value of VHI - Vinhomes Westpoint has grown. &nbsp;
          <Link
            href={"https://forms.gle/CtHQUqsTxXfJb3w58"}
            target="_blank"
            className="font-bold underline text-primary h-7"
          >
            Vote
          </Link>
          &nbsp; here!
        </span>
        <div className={`right-0 pr-2 cursor-pointer bg-[#B4B4EB] fixed`} onClick={handleCloseWarning}>
          <CloseDialogIcon />
        </div>
      </div> */}
      <Title className={`py-4 ${closeWarning ? "pt-10" : "pt-4"}`}>{t("title")}</Title>
      <div className="flex flex-col-reverse justify-between gap-5 items-end md:flex-row">
        <FilterDropDown
          listDropdown={allAssetTypes}
          showing={typeSelected}
          setShowing={setTypeSelected}
          title={t("type-filter")}
          textDefault="All"
          className="w-[100px]"
        />
        <PrimaryInput
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          className="md:max-w-[450px]"
          placeholder={t("search-placeholder")}
        />
      </div>
      <div className="flex justify-between mt-4 mb-2">
        <p className="text-base font-semibold dark:text-textDark">Total: {sharesData?.data?.length}</p>
      </div>
      <div className="table-style">
        {sharesData?.data && sharesData?.data?.length > 0 && (
          <Table
            redirectUrl="/shares"
            redirectFuntion={redirect}
            pageSizePagination={100}
            headerTextAlignRight={headerTextAlignRight}
            data={sharesData?.data}
            columns={columnsSharesTable}
          />
        )}
        {!sharesData?.data && <SharesTableSkeletonloading />}

        {sharesData?.data?.length === 0 && (
          <EmptyPage
            classNameContainer="min-h-[calc(100vh-80px-16px-52px-68px-130px)] items-center"
            className="w-[300px] md:w-[450px] h-[350px] justify-around"
            title={t("empty-notification")}
          />
        )}
      </div>
    </div>
  );
}

export default SharesManagement;

function SharesTableSkeletonloading() {
  return (
    <div className="pt-1 bg-white dark:bg-bgDark">
      <div className="flex flex-col gap-5 mt-5 md:hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <MobileRowSkeleton key={i} />
        ))}
      </div>
      <div className="hidden md:block">
        <div
          className="grid w-full p-2 h-[43px] grid-cols-[22%,30%,15%,20%,13%] px-5
        "
        >
          <div className="w-[50px] h-6 rounded-md skeleton-loading" />
          <div className="w-[60px] h-6 skeleton-loading rounded-md" />
          <div className="w-[60px] h-6 skeleton-loading rounded-md" />
          <div className="w-[70px] h-6 skeleton-loading rounded-md" />
          <div className="w-[60px] items-end h-6 skeleton-loading  rounded-md" />
        </div>
        <div className="px-5 mt-5 md:flex md:flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="w-full max-w-maxContent h-[72px] grid grid-cols-[22%,30%,15%,20%,13%] items-center">
      <div className="flex items-center w-full h-12 gap-5">
        <div className="w-8 h-8 rounded-full skeleton-loading"></div>
        <div className="w-20 h-6 rounded-md skeleton-loading"></div>
      </div>
      <div className="w-[50%] h-6  skeleton-loading rounded-md" />
      <div className="w-[30%] h-6  skeleton-loading rounded-md" />
      <div className="w-[30%] h-6  skeleton-loading rounded-md" />
      <div className="w-[30%] h-6  skeleton-loading rounded-md" />
    </div>
  );
}

function MobileRowSkeleton() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between py-3 mt-1">
        <div className="h-6 w-[40px] skeleton-loading  rounded-md" />
        <div className="flex items-center h-12 gap-5">
          <div className="w-8 h-8 rounded-md skeleton-loading"></div>
          <div className="flex flex-col gap-1">
            <div className="w-20 h-6 rounded-md skeleton-loading"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="h-6 w-[60px] skeleton-loading  rounded-md" />
        <div className="w-[150px] h-6 skeleton-loading  rounded-md" />
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="h-6 w-[60px] skeleton-loading  rounded-md" />
        <div className="w-[80px] h-6 skeleton-loading  rounded-md" />
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="h-6 w-[50px] skeleton-loading  rounded-md" />
        <div className="w-[60px] h-6 skeleton-loading  rounded-md" />
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="h-6 w-[40px] skeleton-loading  rounded-md" />
        <div className="w-[60px] h-6 skeleton-loading  rounded-md" />
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="h-6 w-[60px] skeleton-loading  rounded-md" />
        <div className="w-[50px] h-6 skeleton-loading  rounded-md" />
      </div>
    </div>
  );
}
