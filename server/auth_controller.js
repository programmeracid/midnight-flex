import User from "./config/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username: username, password: hashedPassword });
        await newUser.save();

        // Generate token
        generateToken(newUser._id, res);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        console.log(1);
        const { username , password } = req.body;
        console.log(username);
        console.log(2);
        // Check user
        const user = await User.findOne({ username });
        console.log(3);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log(4);
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        console.log("valid credentials");
        // Generate token
        generateToken(user._id, res);

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfilePic = async (req, res) => {
    try {
        const { profile_pic } = req.body;

        // Find user by ID from JWT
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`Updating profile pic of ${user.username}`);

        // Update profile field
        user.profile_pic = profile_pic;
        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            profile: user.profile_pic
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        maxAge:0
    });
    res.status(200).json({ message: "Logged out successfully" });
};


export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Decode the token to get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("username"); // Fetch only the username

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Authenticated", username: user.username });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};



// Generate JWT Token
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
