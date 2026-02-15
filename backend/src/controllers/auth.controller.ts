import { Request, Response } from "express";
import UserModel from "../models/User.model";
import uploadToIPFS from "../config/ipfs";
import { mintMemberNFT } from "../services/nft.service";
import { createVestingSchedule } from "../services/vesting.service";

export const signup = async (req: Request, res: Response) => {
    try {
        const {name, email, walletAddress} = req.body;
        if(!name || !email || !walletAddress){
            return res.status(400).json({success: false, message: "Invalid Request!"});
        }

        const existing = await UserModel.findOne({walletAddress});
        if(existing){
            return res.status(409).json({success: false, message: "User Already Exists!"});
        }


        const metadata = {
            name: "Member Badge",
            Description: "Welcome to CryptoCorp",
            image:"ipfs://bafkreih6ojmxhzzdke7jf4fu62itthw27i6r6twvpxbb7tszepz73563ye"
        };

        const tokenURI = await uploadToIPFS(metadata);
        console.log(`token URI: ${tokenURI}`);

        const nftHash = await mintMemberNFT(walletAddress, tokenURI);
        console.log("nft hash: ",nftHash);

        const user = await UserModel.create({
            name, email, WalletAddress: walletAddress.toLowerCase(), nftId: Number(nftHash.tokenId)
        });

        const createVestingScheduleHash = await createVestingSchedule(walletAddress);

        console.log(`Vesting Schedule: ${createVestingScheduleHash}`);

        return res.status(201).json({success: true, 
            message:"Sign Up successful! NFT minted and token vested", 
            data:{
                user,createVestingScheduleHash
            }
        }); 
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({success: false, error: "Internal Server Error!"});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {walletAddress} = req.body;
        if(!walletAddress){
            return res.status(400).json({success: false, message: "Invalid Request!"});
        }

        const user = await UserModel.findOne({WalletAddress: walletAddress});
        if(!user){
            return res.status(404).json({success: false, message: "User not found!"});
        }
        return res.status(200).json({success: true, message: "User data found", data:{
            user
        }});
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({success: false, error: "Internal Server Error!"});
    }
};