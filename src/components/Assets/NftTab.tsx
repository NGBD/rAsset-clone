import React from "react";
import InfoBox from "./InfoBox";
import { useQuery } from "wagmi";
import { getAssetInfo } from "@/api-modules/assets";
import { shortenAddress } from "@/lib/shortenAddress";
import EmptyPage from "../EmptyPage";

function NftTab({ assetId }) {
  const { data } = useQuery(
    ["getAssetInfo", assetId],
    async () => {
      const response = await getAssetInfo(assetId);

      return response.data;
    },
    {
      enabled: !!assetId,
    }
  );

  return (
    <div className="flex h-full min-h-[300px] bg-white rounded-md p-[30px] dark:bg-bgDark">
      {data && data?.length !== 0 && (
        <div className="md:grid md:grid-cols-3 flex flex-col w-full rounded-md gap-8">
          <InfoBox
            nameBox="CONTRACT ADDRESS"
            className="overflow-auto h-[100px]"
            detailInfo={shortenAddress(data?.contractAddress)}
            copy={data?.contractAddress}
          />
          <InfoBox nameBox="NFT ID" className="h-[100px]" detailInfo={data?.nftId} />
          <InfoBox nameBox="CHAIN" detailInfo={data?.chain} className="h-[100px]" />
          <InfoBox nameBox="TOKEN STANDARD" detailInfo={data?.tokenStandard} className="h-[100px]" />
        </div>
      )}
      {data?.length === 0 && <EmptyPage className="h-[150px] items-center gap-5 p-0" description="No data" />}
      {!data && (
        <div className={`md:grid md:grid-cols-3 flex flex-col w-full rounded-md gap-8`}>
          {[1, 2, 3, 4, 5, 6]?.map((i) => (
            <InfoBoxSkeletonLoading key={i} />
          ))}
        </div>
      )}
      {/* {!isSubmited && (
        <div className="w-full flex my-[70px] bg-gradient-to-r from-[#148DFD] left-[-10px] to-[#FFE2F9] h-[80px] rounded-md px-[10px] items-center text-white justify-between">
          <p className="font-bold text-base ">Do you want tokenize this NFT?</p>
          <TokenizeBtn className="z-[50px]" setIsSubmited={setIsSubmited} />
        </div>
      )} */}
    </div>
  );
}

export default NftTab;

function InfoBoxSkeletonLoading() {
  return (
    <div className="h-[100px] flex flex-col justify-center gap-4 rounded-md border border-title">
      <div className="h-8 skeleton-loading rounded-md mt-2 w-[70%] mx-auto"></div>
      <div className="h-5 skeleton-loading w-[30%] rounded-md mx-auto"></div>
      <div className="h-5 skeleton-loading mb-2 w-[80%] rounded-md mx-auto"></div>
    </div>
  );
}
