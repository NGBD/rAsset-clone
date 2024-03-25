import React from "react";
import DepositoryManagement from "@/components/Depository/DepositoryManagement";

function page({ params: { lng } }) {
  return <DepositoryManagement lng={lng} />;
}

export default page;
