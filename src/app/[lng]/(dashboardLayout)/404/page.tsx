import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="min-h-screen flex">
      <Image src={"/images/404.svg"} alt={"404"} width={300} height={300} className="mx-auto items-center" />
    </div>
  );
}

export default page;
