import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
           type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamp: true })

const NotificationModel = mongoose.model('NotificationSchema', notificationSchema);

export default NotificationModel;