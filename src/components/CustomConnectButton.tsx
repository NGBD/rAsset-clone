import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import ArrowDownIconBlack from "./icon/ArrowDownIconBlack";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="hidden">
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="hidden">
                    Wrong network
                  </button>
                );
              }
              return (
                <div
                  style={{ display: "flex", gap: 12 }}
                  className="shadow-mobileButton h-10 smooth-transform flex rounded-md dark:bg-bgDarkSecondary font-bold"
                >
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="px-[10px] gap-1 ju367v11 text-[#25292E] dark:text-textDark rounded-md"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image alt={chain.name ?? "Chain icon"} src={chain.iconUrl} width={24} height={24} />
                        )}
                      </div>
                    )}
                    <div className="hidden md:flex items-center">
                      <p>{chain.name}</p>
                    </div>
                    <ArrowDownIconBlack className="stroke-black dark:stroke-white" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
