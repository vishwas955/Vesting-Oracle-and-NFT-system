import { Request, Response } from "express";
import VestingScheduleModel from "../models/VestingSchedule.model";
import { ethers } from "ethers";

export const getTotalVested = async(req: Request, res: Response) => {
    try {
        const schedules = await VestingScheduleModel.find({claimed: false});
        
        if(schedules.length === 0){
            return res.status(404).json({success:false, message: "No Tokens currently Vested"});
        }
        let total = 0n;

        for (const schedule of schedules) {
            total += BigInt(schedule.amount);
        }

        return res.status(200).json({
            success: true,
            message: "Total Vested Token found.",
            totalVestedWei: total.toString(),
            totalVestedFormatted: ethers.formatUnits(total, 18)
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({success: false, error: "Internal Server Error!"});
    }
}