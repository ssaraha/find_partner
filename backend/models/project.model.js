import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
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
	fileDescription: {
		type: String,
		default: ""
	},
	status: {
	 	type: String,
	 	required: true,
		enum: ["created", "inprogressed", "finished"],
		default: "created"
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true
	},
	request: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Request",
	},
    likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	],
	comments: [
		{
			text: {
				type: String,
				required: true,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		},
	],
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;