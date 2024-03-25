"use client";
import React, { useState } from "react";
import Title from "../Title";
import FilterDropDown from "../FilterDropDown";
import { getAssetTypes } from "@/api-modules/assets";
import { useQueries } from "@tanstack/react-query";
import EmptyPage from "../EmptyPage";
import Table from "../Table";
import DefaultImageDepository from "../icon/DefaultImageDepository";
import NewDepositoryBtn from "./NewDepositoryBtn";
import useDebounce from "@/hooks/useDebounce";
import { getListDepository } from "@/api-modules/depository";
import { listDepositoryStatus, listDepositoryType, listFilterStatus } from "@/constants/Filter";
import { format } from "date-fns";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import PrimaryInput from "../PrimaryInput";
import { useTranslation } from "@/app/i18n/client";
import { getNameFromKey } from "@/lib";

const headerTextAlignRight = ["Date", "Ngày"];
const headerTextAlignCenter = [
  "Asset Type",
  "Depository Type",
  "Loại",
  "Lưu ký",
  "Status",
  "Trạng thái",
  "Depository Center",
  "Trung tâm lưu ký",
];

function DepositoryManagement({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "depositories");
  const { address } = useAccount();
  const { isLogin } = useAuthContext();
  const [searchParams, setSearchParams] = useState<any>("");
  const [typeSelected, setTypeSelected] = useState<any>({ typeKey: "all", typeName: "All", id: "" });
  const [allAssetTypes, setAllAssetTypes] = useState<any>([]);
  const limit = 20;
  const debouncedSearchValue = useDebounce(searchParams, 500);
  const [listDepository, setListDepository] = useState<any>();
  const [depositorySelected, setDepositorySelected] = useState<any>();
  const [statusSelected, setStatusSelected] = useState<any>();

  const router = useRouter();

  const redirect = (prefix, itemId) => {
    router.push(`${prefix}/${itemId}`);
  };

  useQueries({
    queries: [
      {
        queryKey: ["getAssetTypes"],
        queryFn: async () => {
          const response = await getAssetTypes();
          setAllAssetTypes([typeSelected, ...response.data.data]);
          return response.data;
        },
      },
      {
        queryKey: [
          "getListDepository",
          isLogin,
          address,
          typeSelected,
          debouncedSearchValue,
          depositorySelected,
          statusSelected,
        ],
        queryFn: async () => {
          const queryObj = {
            offset: 0,
            limit: limit,
            search: debouncedSearchValue,
          };
          if (typeSelected) {
            queryObj["assetType"] = typeSelected.id;
          }
          if (depositorySelected) {
            queryObj["depositoryType"] = depositorySelected.key;
          }
          if (statusSelected) {
            queryObj["status"] = statusSelected.key;
          }
          const response = await getListDepository(queryObj);
          setListDepository(response?.data);
          return response?.data;
        },
      },
    ],
  });

  const columnsDepositoryTable = [
    {
      Header: " ",
      columns: [
        {
          Header: t("col-1"),
          accessor: (data: any) => (
            <div className="flex gap-3 items-center md:justify-start justify-end ">
              <div className="w-[30px] h-[30px] items-center flex justify-center">
                <DefaultImageDepository />
              </div>
              <p>{data?.name}</p>
            </div>
          ),
        },
        {
          Header: t("col-2"),
          accessor: (data: any) => <div className="flex justify-center">{data?.assetType?.typeName}</div>,
        },
        {
          Header: t("col-3"),
          accessor: (data: any) => (
            <div className="flex justify-center">{data?.depositoryType === "mint_nft" ? "Mint NFT" : "Release"}</div>
          ),
        },
        {
          Header: t("center"),
          accessor: (data: any) => <div className="flex justify-center">{data?.depositoryCenter?.name}</div>,
        },
        {
          Header: t("col-5"),
          accessor: (data: any) => (
            <div className=" flex justify-center capitalize">
              <p
                className={`${
                  data?.status === "submitted"
                    ? "text-[#00FF00]"
                    : data?.status === "verifying"
                    ? "text-[#FFFF00]"
                    : data?.status === "verified"
                    ? "text-[#0000FF]"
                    : data?.status === "processing"
                    ? "text-[#FFA500]"
                    : data?.status === "completed"
                    ? "text-[#000000] dark:text-[#FFFFFF]"
                    : data?.status === "canceled"
                    ? "text-[#808080]"
                    : data?.status === "rejected"
                    ? "text-[#FF0000]"
                    : "text-[#5550DC]"
                }`}
              >
                {getNameFromKey(data?.status, listFilterStatus)}
              </p>
            </div>
          ),
        },
        {
          Header: t("col-4"),
          accessor: (data: any) => (
            <div className="flex justify-end ">
              {data?.createdAt ? format(new Date(data?.createdAt), "dd-MM-yyyy") : ""}
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-maxContent mx-auto">
      <div className="flex justify-between items-center">
        <Title className="py-4">{t("title")}</Title>
        <NewDepositoryBtn lng={lng} />
      </div>
      <div className="flex md:flex-row flex-col-reverse justify-between items-end gap-5">
        <div className="flex flex-row gap-5 w-full">
          <FilterDropDown
            listDropdown={allAssetTypes}
            showing={typeSelected}
            setShowing={setTypeSelected}
            title={t("filter-asset")}
            textDefault="All"
            className="w-[100px]"
          />
          <FilterDropDown
            listDropdown={listDepositoryType}
            showing={depositorySelected}
            setShowing={setDepositorySelected}
            title={t("filter-type")}
            textDefault="All"
            className="w-[100px] whitespace-nowrap"
          />
          <FilterDropDown
            listDropdown={listDepositoryStatus}
            showing={statusSelected}
            setShowing={setStatusSelected}
            title={t("filter-status")}
            textDefault="All"
            className="w-[100px]"
          />
        </div>
        <PrimaryInput
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          className="md:max-w-[450px] mt-3"
          placeholder={t("placeholder")}
        />
      </div>
      <div className="flex justify-between mt-4 mb-2">
        <p className="font-semibold text-base dark:text-textDark">
          {t("total")}: {listDepository?.data?.length}
        </p>
      </div>
      <div className="table-style">
        {listDepository?.data && listDepository?.data?.length > 0 && (
          <Table
            redirectUrl="/depositories"
            redirectFuntion={redirect}
            pageSizePagination={100}
            data={listDepository?.data}
            columns={columnsDepositoryTable}
            headerTextAlignRight={headerTextAlignRight}
            headerTextAlignCenter={headerTextAlignCenter}
          />
        )}
        {!listDepository?.data && <TableSkeletonloading />}
        {listDepository?.data?.length === 0 && (
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

export default DepositoryManagement;

function TableSkeletonloading() {
  return (
    <div className="bg-white dark:bg-bgDark pt-1">
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
          <div className="w-[50px] h-6 skeleton-loading rounded-md" />
          <div className="w-[60px] h-6 skeleton-loading rounded-md" />
          <div className="w-[60px] h-6 skeleton-loading rounded-md" />
          <div className="w-[70px] h-6 skeleton-loading rounded-md" />
          <div className="w-[60px] items-end h-6 skeleton-loading rounded-md" />
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
      <div className="w-full h-12 flex gap-5 items-center">
        <div className="w-8 h-8 rounded-full skeleton-loading"></div>
        <div className="w-20 h-6 skeleton-loading rounded-md"></div>
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
      <div className="flex items-center py-3 justify-between mt-1">
        <div className="h-6 w-[40px] skeleton-loading rounded-md" />
        <div className="h-12 flex gap-5 items-center">
          <div className="w-8 h-8 rounded-full skeleton-loading"></div>
          <div className="flex flex-col gap-1">
            <div className="w-20 h-6 skeleton-loading rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center py-3  justify-between">
        <div className="h-6 w-[60px] skeleton-loading rounded-md" />
        <div className="w-[150px] h-6 skeleton-loading rounded-md" />
      </div>
      <div className="flex items-center py-3  justify-between">
        <div className="h-6 w-[60px] skeleton-loading rounded-md" />
        <div className="w-[80px] h-6 skeleton-loading rounded-md" />
      </div>
      <div className="flex items-center py-3  justify-between">
        <div className="h-6 w-[50px] skeleton-loading rounded-md" />
        <div className="w-[60px] h-6 skeleton-loading rounded-md" />
      </div>
      <div className="flex items-center py-3  justify-between">
        <div className="h-6 w-[40px] skeleton-loading rounded-md" />
        <div className="w-[60px] h-6 skeleton-loading rounded-md" />
      </div>
      <div className="flex items-center py-3  justify-between">
        <div className="h-6 w-[60px] skeleton-loading rounded-md" />
        <div className="w-[50px] h-6 skeleton-loading rounded-md" />
      </div>
    </div>
  );
}
