import { ethers } from "ethers";
import { organisationToken, vesting, adminWallet } from "../config/contracts";

export const ensureApproval = async() => {

    const allowance = await organisationToken.allowance(
        adminWallet,
        vesting.target
    );

    const requiredAmount = ethers.parseUnits("1000000", 18);

    if(allowance < requiredAmount){
        console.log("Approving vesting contract");

        const tx = await organisationToken.approve(
            vesting.target,
            requiredAmount
        );
        await tx.wait();

        console.log("Vesting contract Approved");
    }else {
        console.log("Approval already sufficient");
    }
}