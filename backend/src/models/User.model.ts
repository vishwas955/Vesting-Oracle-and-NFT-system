import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true
        },
        nftId:{
            type: Number,
            required: true
        },

        WalletAddress:{
            type: String,
            required: true,
            unique: true
        }
    },
    {timestamps: true}
);

export default mongoose.model("User", UserSchema);