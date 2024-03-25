import SharesManagement from "@/components/Shares/SharesManagement";
import React from "react";

function page({ params: { lng } }) {
  return <SharesManagement lng={lng} />;
}

export default page;
