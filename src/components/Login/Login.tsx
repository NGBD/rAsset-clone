"use client";
import React from "react";
import LoginLogo from "../icon/LoginLogo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LogoWName from "../icon/LogoWName";
import DiscordIcon from "../icon/DiscordIcon";
import YoutubeIcon from "../icon/YoutubeIcon";
import TwitterIcon from "../icon/TwitterIcon";
import Logo from "../icon/Logo";
import NameIcon from "../icon/NameIcon";
import TelegramIcon from "../icon/TelegramIcon";
import Link from "next/link";

function Login() {
  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
      <div
        className="w-full flex flex-col items-center h-full mx-auto gap-5"
        style={{
          backgroundImage: `url("/images/login-bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-[72px] flex gap-5 items-center mt-5">
          <Logo className="h-[72px] w-[78px] fill-white" />
          <NameIcon className="h-9 w-[135px]" />
        </div>
        <div className="md:h-[50%] h-[40%]">
          <LoginLogo className="w-full h-full" />
        </div>
        <div className="flex items-center flex-col">
          <p className="text-xl mb-5 text-white">Login to manage your assets</p>
          <ConnectButton />
        </div>
      </div>
      <div className="bg-[#141416] py-3 flex items-center w-full fixed bottom-0 flex-col-reverse md:flex-row md:gap-10 gap-4 justify-between">
        <div className="flex gap-10 md:mx-10 mx-5 items-center">
          <LogoWName className="h-[40px] w-[160px] hidden md:block" />
          <p className="text-xs">Copyright © 2024 Rasset LLC. All rights reserved</p>
        </div>
        <div className="flex justify-around md:w-[30%] w-full items-center">
          <TelegramIcon className="h-6 w-6 mr-3 fill-white" />
          <DiscordIcon className="fill-white h-5" />
          <Link href={"https://www.youtube.com/@rAsset_io"} target="_blank">
            <YoutubeIcon className="fill-white h-5" />
          </Link>

          <Link href={"https://twitter.com/rAsset_io"} target="_blank">
            <TwitterIcon className="fill-white h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
