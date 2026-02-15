import { ethers } from "ethers";

export const getProvider = () => {
    if (!(window as any).ethereum) throw new Error("Meta Mask not installed");

    return new ethers.BrowserProvider(
        (window as any).ethereum
    );
};

export const getSigner = async () => {
  const provider = getProvider();
  
  return await provider.getSigner();
};

export const connectWallet = async () => {
    const provider = getProvider();

    const accounts = await provider.send("eth_requestAccounts",[]);

    return accounts[0];
};