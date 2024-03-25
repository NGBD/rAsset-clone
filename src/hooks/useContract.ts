import { readContract, writeContract } from "@wagmi/core";
import type { ExtractAbiFunctionNames } from "abitype";
import { POLYGON_CHAIN_ID } from "@/constants/env";
import { Erc20Abi } from "../abis/Erc20";
import { useMemo } from "react";
import { Erc721Abi } from "../abis/Erc721";
import { TokenizeAbi } from "../abis/Tokenize";
import { RewardReaderAbi } from "@/abis/RewardReader";
import { UniV3PoolAbi } from "@/abis/UniV3Pool";

// "nonpayable" for write contract
// "view" for read contract

type ReadErc20FunctionNames = ExtractAbiFunctionNames<typeof Erc20Abi, "view">;
type WriteErc20FunctionNames = ExtractAbiFunctionNames<typeof Erc20Abi, "nonpayable">;

export const useErc20Contract = (address: string) => {
  const readErc20Contract = (functionName: ReadErc20FunctionNames, args?: any) =>
    readContract({
      address: address as `0x${string}`,
      abi: Erc20Abi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const writeErc20Contract = (functionName: WriteErc20FunctionNames, args: any) =>
    writeContract({
      address: address as `0x${string}`,
      abi: Erc20Abi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const erc20Contract = { readErc20Contract, writeErc20Contract };

  return useMemo(() => erc20Contract, [address]);
};

type ReadErc721FunctionNames = ExtractAbiFunctionNames<typeof Erc721Abi, "view">;
type WriteErc721FunctionNames = ExtractAbiFunctionNames<typeof Erc721Abi, "nonpayable">;
export const useErc721Contract = (address: string) => {
  const readErc721Contract = (functionName: ReadErc721FunctionNames, args: any) =>
    readContract({
      address: address as `0x${string}`,
      abi: Erc721Abi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const writeErc721Contract = (functionName: WriteErc721FunctionNames, args: any) =>
    writeContract({
      address: address as `0x${string}`,
      abi: Erc721Abi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const erc721Contract = { readErc721Contract, writeErc721Contract };

  return useMemo(() => erc721Contract, [address]);
};

type ReadTokenizeunctionNames = ExtractAbiFunctionNames<typeof TokenizeAbi, "view">;
type WriteTokenizeunctionNames = ExtractAbiFunctionNames<typeof TokenizeAbi, "nonpayable">;
export const useTokenizeContract = (address: string) => {
  const readTokenizeContract = (functionName: ReadTokenizeunctionNames, args: any) =>
    readContract({
      address: address as `0x${string}`,
      abi: TokenizeAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const writeTokenizeContract = (functionName: WriteTokenizeunctionNames, args: any) =>
    writeContract({
      address: address as `0x${string}`,
      abi: TokenizeAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const tokenizeContract = { readTokenizeContract, writeTokenizeContract };

  return useMemo(() => tokenizeContract, [address]);
};

type ReadRewardReaderFunctionNames = ExtractAbiFunctionNames<typeof RewardReaderAbi, "view">;
type WriteRewardReaderFunctionNames = ExtractAbiFunctionNames<typeof RewardReaderAbi, "nonpayable">;
export const useRewardReaderContract = (contractAddress: string) => {
  const readRewardReaderContract = (functionName: ReadRewardReaderFunctionNames, args?: any) =>
    readContract({
      address: contractAddress as `0x${string}`,
      abi: RewardReaderAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const writeRewardReaderContract = (functionName: WriteRewardReaderFunctionNames, args: any) =>
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: RewardReaderAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const rewardReaderContract = { readRewardReaderContract, writeRewardReaderContract };

  return useMemo(() => rewardReaderContract, [contractAddress]);
};

type ReadUniV3FunctionNames = ExtractAbiFunctionNames<typeof UniV3PoolAbi, "view">;
type WriteUniV3FunctionNames = ExtractAbiFunctionNames<typeof UniV3PoolAbi, "nonpayable">;
export const useUniV3Contract = (contractAddress: string) => {
  const readUniV3Contract = (functionName: ReadUniV3FunctionNames, args?: any) =>
    readContract({
      address: contractAddress as `0x${string}`,
      abi: UniV3PoolAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const writeUniV3Contract = (functionName: WriteUniV3FunctionNames, args: any) =>
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: UniV3PoolAbi,
      chainId: Number(POLYGON_CHAIN_ID),
      functionName: functionName,
      args: args,
    });

  const uniV3Contract = { readUniV3Contract, writeUniV3Contract };

  return useMemo(() => uniV3Contract, [contractAddress]);
};
