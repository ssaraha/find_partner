import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendEmail } from "../email/sendEmail.js";

import crypto from "crypto";

export const signup = async (req, res) => {
    try {
        const { username, name, email, password, categories } = req.body;
        let { role } = req.body;

        const query = {
            $or: [
                { email },
                { username }
            ]
            };
        if (!username || !name || !email || !password) {
            throw new Error("All fields are required");
        }

        const userAlreadyExist = await User.findOne(query);
        if (userAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format."})
        }

        if (!role) {
            role= "user"
        }
        else {
            role = "company"
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(10000 + Math.random() * 900000).toString();
        const newUser = new User({
            username,
            name,
            email, 
            role,
            categoriesWorked: categories,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000//24h
        });

        await newUser.save();

        //JWT GENERATE TOKEN
        generateTokenAndSetCookie(res, newUser._id);
        // const { password: pass, ...rest } = newUser._doc;
        //SEND EMAIL
        sendEmail(newUser.email, "verificationToken", verificationToken, '', "");
        // sendEmail("solofoniainarakotoharimanana@gmail.com", "verificationToken", verificationToken, '', "");

        return res.status(201).json({
            success: true,
            message: "User Created successfully",
            user: {
                ...newUser._doc,
                password: undefined
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();

        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true, 
        message: "Logged out successfully."
    })
    
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined
        user.verificationTokenExpiredAt = undefined

        await user.save();
        
        //SEND EMAIL
        sendEmail(user.email, "verifyEmail", '', user.username, "");
        // sendEmail("solofoniainarakotoharimanana@gmail.com", "verifyEmail", '', user.username, "");
        const { password: pass, ...rest } = user;
        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Lgout error ", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        
        //GENERATE RESET TOKEN
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExipesAt = Date.now() + 1 * 60 * 60 * 1000;//1 Hour
        user.resetPasswordToken = resetToken;
        user.resetpasswordExpiredAt = resetTokenExipesAt;

        await user.save();

        //send email
        sendEmail(user.email, "resetPassword", "", "", `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        return res.status(200).json({
            success: true,
            message:"Password reset link sent to your email "
        })

    } catch (error) {
        // console.log("ERROR >>> ", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });       
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetpasswordExpiredAt: {$gt: Date.now()}
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.verificationTokenExpiredAt = undefined;

        await user.save();

        //send email
        sendEmail(user.email, "resetSuccessEmail", "", "", "");

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log("ERROR >>> ", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}