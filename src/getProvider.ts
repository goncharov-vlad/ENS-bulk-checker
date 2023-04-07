import { ethers } from 'ethers';

export default function getProvider() {
  return new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
}
