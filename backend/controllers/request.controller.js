import User from "../models/user.model.js";
import Request from "../models/request.model.js";
import Project from "../models/project.model.js";

import { sendEmail } from "../email/sendEmail.js";
import NotificationModel from "../models/notification.model.js";


export const fetchRequestOfUser = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const requests = await Request.find({
            $and: [
                { "owner": user._id },
                { "isActive": true }
            ] }).populate({
            path: "project",
            select: "title description"
        }).populate({
            path: "company",
            select: "username email"
        });

        return res.status(200).json({
            success: true,
            message: "List requests of user connected",
            requests
        })
    } catch (error) {

    }
}

export const createRequest = async (req, res) => {
   
    try {
        const { title, description, owner, project, completionTime, company} = req.body;
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const projectRequest = await Project.findById(project).populate('owner', 'username');
        if (!projectRequest) {
            return res.status(400).json({
                success: false,
                message: "Project not found"
            })
        }

        const request = new Request({
            title,
            description,
            owner: user,
            project,
            completionTime,
            company
        })

        await request.save();

        projectRequest.request = request._id;
        await projectRequest.save();

        //CREATE NOTIFICATION 
        const notification = new NotificationModel({
            description: `You have a new request from ${projectRequest.owner.username} `,
            request,
            sender: request.owner,
            receiver: user._id
        });

        await notification.save()

        res.status(200).send({
            success: true,
            message: "Notification sended successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }

}

export const acceptRequest = async (req, res) => {
    try {
        const {requestId} = req.params
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(500).json({
                success: false,
                message: "Request not found"
            })
        }
        const company = await User.findById(req.user._id);
        if (!company) {
            return res.status(500).json({
                success: false,
                message: "Company not found"
            })
        }
        const project = await Project.findById(request.project).populate({
            path: "owner",
            select: "username email"
        });

        if (!project) {
            return res.status(500).json({
                success: false,
                message: "Project not found"
            })
        }

        request.status = "accepted";
        request.company = company._id;
        request.startDate = new Date()
        request.statusInfo = 10;

        project.status = "inprogressed";

        await request.save();
        await project.save();

        sendEmail(project.owner.email, "acceptRequest", "", project.owner.username, "");

        return res.status(200).json({
            success: true,
             message: "Request accepted",
            request
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const acceptedRequest = async (req, res) => {
    try {
        const company = await User.findById(req.user._id);
        if (!company) {
            return res.status(400).json({
                success:  false,
                message: "User not found"
            })
        }

        const requests = await Request.find({
            $and: [
                { "company": company._id },
                {
                   $or: [
                         { "status": "accepted" },
                        { "status": "finished" }
                    ] 
                }
            ]
        }).populate({
            path: "owner",
            select: "username"
        })

        return res.status(200).json({
            success: true,
            message: "Requests accepted",
            requests
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export const fetchRequestDedicatedToCompany = async (req, res) => {
    try {
        console.log("COMPANY CONNECTED >>> ", req.user);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const fetchRequestByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const requests = await Request.find({ project: projectId });
        res.status(200).json({
            success: true,
            message: "Requests by projects",
            requests
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const fetchRequestOfCompany = async (req, res) => {
    try {
        const company = await User.findById(req.user._id);
        if(!company){
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const requests = await Request.aggregate([
            {
                $match: {
                    $and: [
                        { company: req.user._id },
                        {
                            $or: [
                                { status: "created" },
                                {
                                    $and: [
                                        { status: "created" },
                                        {interessed: {$in: [req.user._id]}}
                                    ]
                                }
                            ]
                        },
                        { isActive: true }
                    ]

                }
            }
        ])


         res.status(200).json({
            success: true,
             message: "Request of company",
            requests
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const likeAndDislikeRequest = async(req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(400).json({
                success: false,
                message: "Request not found"
            })
        }
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isLiked = request.likes.includes(user._id);

        if (isLiked) {
            await Request.findByIdAndUpdate(requestId, {
                $pull: {likes: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $pull: {likedRequest: request._id}
            })
        }
        else {
            await Request.findByIdAndUpdate(requestId, {
                $push: {likes: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $push: {likedRequest: request._id}
            })
        }


        return res.status(200).json({
            success: true,
            message: "Like/Unlike request successfully",
            request,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
export const interessedAndUninteressedRequest = async(req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(400).json({
                success: false,
                message: "Request not found"
            })
        }
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isInteressed = request.interessed.includes(user._id);

        if (isInteressed) {
            await Request.findByIdAndUpdate(requestId, {
                $pull: {interessed: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $pull: {interessedrequest: request._id}
            })
        }
        else {
             await Request.findByIdAndUpdate(requestId, {
                $push: {interessed: user._id}
            })
            await User.findByIdAndUpdate(user._id, {
                $push: {interessedrequest: request._id}
            })
        }

        return res.status(200).json({
            success: true,
            message: "Interessed/Uninteressed  request successfully",
            request,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const declineRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(500).json({
                success: false,
                message: "User not found"
            })
        }
        
        const request = await Request.findById(requestId);
        if (!request) {
            res.status(500).json({
                success: false,
                message: "Request not found"
            })
        }

        const project = await Project.findOne({ request: request.id });

        request.isActive = false;
        request.declinedBy = user._id;

        project.request = null;

        await request.save();
        await project.save();

        sendEmail(project.owner.email, "declineRequest", "", project.owner.username, "");

        return res.status(200).json({
            success: true,
            message: "Request declined successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateStatusInfo = async (req, res) => {
    try {
        const { requestId } = req.params;
        const {statusInfo} = req.body
        console.log(req.body)
        const request = await Request.findById(requestId);
        request.statusInfo = statusInfo;

        await request.save();
        res.status(200).json({
            success: true,
            message: "Request upated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const fetchRequestById = async(req, res) => {
    try {
        const {requestId} = req.params;
        const request = await Request.findById(requestId).populate({
            path: "owner",
            select: "username"
        });
        if (!request) {
            res.status(400).json({
                success: false,
                message: "Request not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Fetching request with success",
            request
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const finishRequest = async (req, res) => {
   try {
        const {requestId} = req.params;
        const request = await Request.findById(requestId).populate({
            path: "owner",
            select: "username"
        });
        if (!request) {
            res.status(400).json({
                success: false,
                message: "Request not found."
            })
        }
        //CHANGE FINISH PROJECT STATUS
        const project = await Project.findById(request.project);
        
        if (!project) {
            res.status(400).json({
                success: false,
                message: "Projejct not found."
            })
        }

        project.status = "finished";

        request.statusInfo = 100;
        request.status = "finished";

        await project.save();
        await request.save();

        sendEmail(project.owner.email, "finishRequest", "", request.owner.username, "");

        return res.status(200).json({
            success: true,
            message: "Fetching request with success",
            request
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const fetchRequestsByStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const {status} = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const requests = await Request.find({
            $and: [
                {company: user._id},
                {status: status}
            ]
        })

        return res.status(200).json({
            success: true,
            message: "Request by company via status",
            requests
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}