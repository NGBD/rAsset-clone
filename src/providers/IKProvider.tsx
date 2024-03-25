import React from "react";
import { IKContext } from "imagekitio-react";
import ImageKit from "imagekit";

const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/abbdhs1kb/";

const IMAGEKIT_PUBLIC_KEY = "public_MANMXeTRQd3BDfAVH40afbWlXYY=";

const IMAGEKIT_PRIVATE_KEY = "private_YyiJqoPYP0TepHR3Qphqii5YtEY=";

function IKProvider({ children }: { children: React.ReactNode }) {
  const imageKit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });

  const authenticator = async () => {
    try {
      const response = imageKit.getAuthenticationParameters();

      if (!response) {
        throw new Error(`FetAuthenticationParameters function failed!`);
      }

      const { signature, expire, token } = response;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <IKContext urlEndpoint={IMAGEKIT_URL_ENDPOINT} publicKey={IMAGEKIT_PUBLIC_KEY} authenticator={authenticator}>
      {children}
    </IKContext>
  );
}

export default IKProvider;
