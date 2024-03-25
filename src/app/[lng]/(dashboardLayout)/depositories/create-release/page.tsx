import CreateRealease from "@/components/Depository/CreateRealease";
import React from "react";

function page({ params: { lng } }) {
  return <CreateRealease lng={lng} />;
}

export default page;
