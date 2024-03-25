"use client";
import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useThemeContext } from "@/contexts/ThemeContext";

const chainIdConfig = process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID === "137" ? polygon : polygonMumbai;

const { chains, publicClient, webSocketPublicClient } = configureChains([chainIdConfig], [publicProvider()]);

const projectId = "863e8d3a85406255198df03f522f31ce";

const { wallets } = getDefaultWallets({
  appName: "rAssets",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "rAssets",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function RainbowProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = React.useState(false);
  const { currentTheme } = useThemeContext();

  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={
          currentTheme === "dark"
            ? darkTheme({
                accentColor: "#5550DC",
                borderRadius: "medium",
              })
            : lightTheme({
                accentColor: "#5550DC",
                borderRadius: "medium",
              })
        }
        chains={chains}
        appInfo={demoAppInfo}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
