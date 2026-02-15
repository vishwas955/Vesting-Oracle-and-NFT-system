import { Request, Response } from "express";
import VestingScheduleModel from "../models/VestingSchedule.model";

export const getVestingSchedule = async(req:Request, res:Response) => {
    try {
        const {walletAddress} = req.params;
        if(!walletAddress){
            return res.status(400).json({success: false, message: "Invalid Request!"});
        }
        const schedules = await VestingScheduleModel.find({
            beneficiary: walletAddress
        });
        console.log("Schedules: ", schedules);
        if(schedules.length === 0){
            return res.status(404).json({success:false, message: "No Vesting Schedule found"});
        }

        return res.status(200).json({success: true, 
            message: `Fetch Vesting Schedule successfully for ${walletAddress}`,
            data:{
                schedules
            }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({success: false, error: "Internal Server Error!"});
    }
};

