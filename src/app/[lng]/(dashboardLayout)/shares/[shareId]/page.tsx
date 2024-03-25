import SharesDetail from "@/components/Shares/SharesDetail";
import React from "react";

function page({ params: { lng } }) {
  return <SharesDetail lng={lng} />;
}

export default page;
