import mongoose from "mongoose";

const vestingSchema = new mongoose.Schema(
    {
        beneficiary: {
            type: String,
            required: true
        },
        amount:{
            type: String,
            required: true
        },
        releaseTime:{
            type: Number,
            required: true
        },
        claimed:{
            type: Boolean,
            default: false
        },
        txHash:{
            type: String
        }
    },
    {timestamps: true}
);

export default mongoose.model("VestingSchedule", vestingSchema);