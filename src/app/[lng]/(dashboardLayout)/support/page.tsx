import React from "react";
import Support from "@/components/Support/Support";

function page({ params: { lng } }) {
  return <Support lng={lng} />;
}

export default page;
