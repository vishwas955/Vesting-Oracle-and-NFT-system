import { ethers } from "ethers";
import { vesting } from "../config/contracts";

export const createVestingSchedule = async(walletAddress: string) => {
    const amount = ethers.parseUnits("1000", 18);

    const releaseTime = Math.floor(Date.now()/1000)+86400;

    const tx = await vesting.createSchedule(walletAddress, amount, releaseTime);
    const reciept = await tx.wait();

    return reciept.hash;
};
