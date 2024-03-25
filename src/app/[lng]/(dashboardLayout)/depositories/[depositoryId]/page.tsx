import DepositoryDetail from "@/components/Depository/DepositoryDetail";
import React from "react";

function page({ params: { lng } }) {
  return <DepositoryDetail lng={lng} />;
}

export default page;
