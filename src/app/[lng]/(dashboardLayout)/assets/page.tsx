import AssetManagement from "@/components/Assets/AssetManagement";
import React from "react";

function page({ params: { lng } }) {
  return <AssetManagement lng={lng} />;
}

export default page;
