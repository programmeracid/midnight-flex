import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            unique: true,
        },
        profile_pic:{
            type: String,
            default: ""
        },
        status:{
            type: String,
            default: ""
        }
    },
    {timestamps: true}

);

const User = mongoose.model("User", userSchema); //keep model name in Upper case first letter

export default User;