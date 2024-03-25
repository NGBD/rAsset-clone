import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAssetProof } from "@/api-modules/assets";
import InfoBox from "./InfoBox";
import EmptyPage from "../EmptyPage";

function ProofTab({ assetId }) {
  const { data } = useQuery(
    ["getAssetProof", assetId],
    async () => {
      const response = await getAssetProof(assetId);

      return response.data;
    },
    {
      enabled: !!assetId,
    }
  );

  return (
    <div className="flex h-full min-h-[300px] bg-white rounded-md p-[30px] dark:bg-bgDark">
      {data && data?.length !== 0 && (
        <div className={`md:grid md:grid-cols-3 flex w-full flex-col rounded-md gap-8`}>
          {data?.map((i) => (
            <InfoBox key={i?.id} nameBox={i?.proofType?.proofTypeName} className="h-[100px]" href={i?.value} />
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

export default ProofTab;

function InfoBoxSkeletonLoading() {
  return (
    <div className="h-[100px] flex flex-col justify-center gap-4 rounded-md border border-input">
      <div className="h-8 skeleton-loading w-[70%] rounded-md mx-auto"></div>
      <div className="h-4 skeleton-loading w-[30%] rounded-md mx-auto"></div>
    </div>
  );
}
