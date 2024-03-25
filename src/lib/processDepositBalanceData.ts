export function processDepositBalanceData(depositBalances) {
  if (!depositBalances || depositBalances.length === 0) {
    return;
  }

  const keys = [
    "tokenInStakedToken",
    "esTokenInStakedToken",
    "stakedTokenInBonusToken",
    "bonusTokenInFeeToken",
    "bnTokenInFeeToken",
    "glpInStakedGlp",
  ];
  const data = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    data[key] = depositBalances[i];
  }

  return data;
}
