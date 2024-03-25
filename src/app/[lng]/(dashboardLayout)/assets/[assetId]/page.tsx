import AssetDetail from "@/components/Assets/AssetDetail";
import React from "react";

function page({ params: { lng } }) {
  return <AssetDetail lng={lng} />;
}

export default page;
