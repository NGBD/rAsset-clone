import TestComponent from "@/components/Test/TestComponent";
import React from "react";

async function page({ params: { lng } }) {
  return <TestComponent lng={lng} />;
}

export default page;
