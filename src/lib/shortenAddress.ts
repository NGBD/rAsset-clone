export function shortenAddress(address = "", length = 6) {
  return address && `${address.substring(0, 8)}...${address.substring(address.length - length)}`;
}
