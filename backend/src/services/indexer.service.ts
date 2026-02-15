import { vesting } from "../config/contracts";
import VestingScheduleModel from "../models/VestingSchedule.model";

const startIndexer = () => {
    console.log("Indexer Listning");

    vesting.on(
        "ScheduledCreated",
        async (beneficiary, amount, releaseTime, event) => {
            try {
                await VestingScheduleModel.create({
                    beneficiary: beneficiary.toLowerCase(), 
                    amount: amount.toString(), 
                    releaseTime: Number(releaseTime),
                    txHash: event.log.transactionHash
                });
                console.log("Indexed vesting for:", beneficiary);
            } catch (error) {
                console.error("Indexer Error", error)
            }
        }
    );

    vesting.on(
        "TokensClaimed",
        async (beneficiary, amount) => {
        try {
            await VestingScheduleModel.updateMany(
            {
                beneficiary: beneficiary.toLowerCase(),
                releaseTime: { $lte: Math.floor(Date.now() / 1000) },
                claimed: false
            },
            {
                $set: { claimed: true }
            }
            );
            console.log("Schedule marked as claimed");
        } catch (err) {
            console.error("TokensClaimed error:", err);
        }
        }
    );
};

export default startIndexer;