import { ethers } from "ethers";
import MemberNFT from "../contracts/MemberNFT.json";
import Vesting from "../contracts/Vesting.json";
import OrganizationToken from "../contracts/OrganizationToken.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL as string);

export const adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATEKEY as string, provider);

export const memberNFT = new ethers.Contract(
    process.env.MemberNFT as string,
    MemberNFT,
    adminWallet
);

export const organisationToken = new ethers.Contract(
    process.env.OrganizationToken as string,
    OrganizationToken,
    adminWallet
);

export const vesting = new ethers.Contract(
    process.env.Vesting as string,
    Vesting,
    adminWallet
);