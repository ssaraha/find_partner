import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ["user", "company"], 
        default: "user"
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,//16 charachers
            ref: "User",
            default: []
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,//16 charachers
            ref: "User",
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: ""
    },
    likedProject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
    interessedProject: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
    likedRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
        },
    ],
    interessedrequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
        },
    ],
    categoriesWorked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: []
        },
    ],
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetpasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;