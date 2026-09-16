import mongoose from "mongoose"

const requestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    completionTime: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    interessed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    startDate: {
        type: Date,
    },
    statusInfo: {
        type: Number,
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }, 
    status: {
        type: String,
        enum: ['created', 'accepted', 'rejected', 'finished'],
        default: 'created'
    },
    declinedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Request = mongoose.model('Request', requestSchema);

export default Request;