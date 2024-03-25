"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { browserRedirectToIndexAfterSignOut } from "../lib/redirect";
import cookie from "cookie";
import { useRouter } from "next/navigation";
import { useAccount, useMutation } from "wagmi";
import useMultiLanguage from "@/hooks/useMultiLanguage";
import { toast } from "react-toastify";
import { signMessage, disconnect } from "@wagmi/core";
import { getNonce, login } from "@/api-modules/auth";

type ContextType = {
  isLogin: boolean;
  checkLogin: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<ContextType>({
  isLogin: false,
  checkLogin: () => null,
  handleLogout: () => null,
});

function AuthProvier({ children }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { currentLang } = useMultiLanguage();
  const { address } = useAccount();
  const currenAddress = useRef(address);

  const handleLogout = useCallback(() => {
    window.document.cookie = cookie.serialize("accessToken", "", {
      maxAge: -1, // Expire the accessToken immediately.
      path: "/",
    });
    browserRedirectToIndexAfterSignOut();
  }, []);

  const checkLogin = () => {
    const cookies = cookie.parse(window.document.cookie);
    if (cookies?.accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      router.push(`/login`);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const getSignature = async (message: string) => {
    try {
      const signature = await signMessage({
        message,
      });
      return signature;
    } catch (error) {
      toast.error(error?.reason || error?.message);
      await disconnect();
    }
  };

  const loginMutation = useMutation(
    async (payload: any) => {
      return await login(payload);
    },
    {
      onSuccess: async (data) => {
        window.document.cookie = cookie.serialize("accessToken", data.data.accessToken, {
          maxAge: data.data.expiresIn,
          path: "/",
        });
        currenAddress.current = address;
        toast.success("Login successful!");
        checkLogin();
        router.push(`/${currentLang}/`);
      },
      onError: (error) => {
        console.log("Error login", error);
      },
    }
  );

  const getNonceMutation = useMutation(
    async (payload: any) => {
      return await getNonce(payload);
    },
    {
      onSuccess: async (data) => {
        const { nonce, signMessage } = data.data;

        const signature = await getSignature(signMessage);

        const loginPayload = {
          address,
          signature,
          nonce,
        };

        if (signature) {
          loginMutation.mutate(loginPayload);
        }
      },
      onError: (error) => {
        console.log("Error get nonce", error);
      },
    }
  );

  useEffect(() => {
    if (address && address !== currenAddress.current) {
      const getNoncePayload = {
        address,
      };
      getNonceMutation.mutate(getNoncePayload);
    }
  }, [address]);

  const contextValue = useMemo(() => {
    return {
      isLogin,
      checkLogin,
      handleLogout,
    };
  }, [isLogin]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvier, useAuthContext };
