import React from "react";
import InfoBox from "./InfoBox";
import { getAssetTraits } from "@/api-modules/assets";
import { useQuery } from "@tanstack/react-query";
import EmptyPage from "../EmptyPage";

function TraitsTab({ assetId }) {
  const { data } = useQuery(
    ["getAssetTraits", assetId],
    async () => {
      const response = await getAssetTraits(assetId);

      return response.data;
    },
    {
      enabled: !!assetId,
    }
  );

  return (
    <div className="flex h-full bg-white min-h-[300px] rounded-md p-[30px] dark:bg-bgDark">
      {data && data?.length !== 0 && (
        <div className={`md:grid md:grid-cols-3 flex flex-col w-full rounded-md gap-8`}>
          {data?.map((trait) => (
            <InfoBox key={trait.id} nameBox={trait.trait.traitName} className="h-[100px]" detailInfo={trait.value} />
          ))}
        </div>
      )}
      {data?.length === 0 && <EmptyPage className="h-[170px] items-center gap-5 p-0" description="No data" />}
      {!data && (
        <div className={`md:grid md:grid-cols-3 flex flex-col w-full rounded-md gap-8`}>
          {[1, 2, 3, 4, 5, 6]?.map((i) => (
            <InfoBoxSkeletonLoading key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TraitsTab;

function InfoBoxSkeletonLoading() {
  return (
    <div className="h-[100px] flex flex-col justify-center gap-4 rounded-md border border-input">
      <div className="h-8 skeleton-loading rounded-md w-[70%] mt-2 mx-auto"></div>
      <div className="h-5 skeleton-loading rounded-md w-[30%] mx-auto"></div>
      <div className="h-5 skeleton-loading rounded-md w-[80%] mb-2 mx-auto"></div>
    </div>
  );
}
