import Profile from "@/components/Profile/Profile";
import React from "react";

function page({ params: { lng } }) {
  return <Profile lng={lng} />;
}

export default page;
