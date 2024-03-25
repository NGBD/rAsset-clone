export enum DepositoryStatus {
  ALL = "all",
  SUBMITTED = "submitted",
  VERIFYING = "verifying",
  VERIFIED = "verifyed",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCEL = "cancel",
  REJECT = "reject",
  MINTED = "minted",
}

export enum DepositoryType {
  ALL = "all",
  MINT_NFT = "mint_nft",
  RELEASE = "release",
}

export const listDepositoryType = [
  { id: 0, name: "All", key: "" },
  { id: 1, name: "Mint NFT", key: "mint_nft" },
  { id: 2, name: "Release", key: "release" },
];

export const listDepositoryStatus = [
  { id: 0, name: "All", key: "" },
  { id: 1, name: "Submitted", key: "submitted" },
  { id: 2, name: "Verifying", key: "verifying" },
  { id: 3, name: "Verified", key: "verified" },
  { id: 4, name: "Processing", key: "processing" },
  { id: 5, name: "Completed", key: "completed" },
  { id: 6, name: "Canceled", key: "canceled" },
  { id: 7, name: "Rejected", key: "rejected" },
];

export const listFilterStatus = [
  { id: 0, name: "All", key: "" },
  { id: 1, name: "Submitted", key: DepositoryStatus.SUBMITTED },
  { id: 2, name: "Verifying", key: DepositoryStatus.VERIFYING },
  { id: 3, name: "Verified", key: DepositoryStatus.VERIFIED },
  { id: 4, name: "Processing", key: DepositoryStatus.PROCESSING },
  { id: 5, name: "Completed", key: DepositoryStatus.COMPLETED },
  { id: 6, name: "Canceled", key: DepositoryStatus.CANCEL },
  { id: 7, name: "Rejected", key: DepositoryStatus.REJECT },
  { id: 8, name: "Minted", key: DepositoryStatus.MINTED },
];
