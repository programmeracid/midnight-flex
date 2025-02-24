import jwt from "jsonwebtoken";
import User from "./config/user_model.js";

const protect = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request object (excluding password)
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

export default protect;
