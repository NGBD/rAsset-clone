import React, { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { useErc20Contract } from "@/hooks/useContract";
import { signMessage } from "@wagmi/core";
import { ethers } from "ethers";
import { useAuthContext } from "@/contexts/AuthContext";
import { CustomConnectButton } from "../CustomConnectButton";
import { BOX_ARBITRUM_ADDRESS } from "@/constants/env";

function ConnectWallet() {
  const { address } = useAccount();
  const { isLogin } = useAuthContext();

  const chainId = useChainId();
  const { readErc20Contract } = useErc20Contract(BOX_ARBITRUM_ADDRESS);

  const getBalanceWithWagmi = async () => {
    try {
      const data = await readErc20Contract("balanceOf", [address]);
      console.log("balanceOf", data.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    const date = new Date();

    const message = `${date.getTime()}.${address}`;
    const hashMessage = ethers.utils.hashMessage(message);
    const signature = await signMessage({ message: hashMessage });

    const payload = {
      walletAddress: address,
      message,
      signature,
      chainId: chainId,
    };
    console.log("payload", payload);
  };

  useEffect(() => {
    if (address && !isLogin) {
      handleLogin();
      getBalanceWithWagmi();
    }
  }, [address, !isLogin]);

  return (
    <div className="flex flex-col gap-5">
      <CustomConnectButton />
    </div>
  );
}

export default ConnectWallet;
