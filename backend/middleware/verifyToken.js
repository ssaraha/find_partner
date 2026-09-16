import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "UnAuthorized, no token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "UnAuthorized, no token provided"
            })
        }

        req.userId = decoded.userId;
        next();

    } catch (error) {
         return res.status(500).json({
                success: false,
                message: "Server error"
            })
    }
}