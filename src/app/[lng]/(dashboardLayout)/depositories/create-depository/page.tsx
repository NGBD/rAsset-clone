import CreateDepository from "@/components/Depository/CreateDepository";
import React from "react";

function page({ params: { lng } }) {
  return <CreateDepository lng={lng} />;
}

export default page;
