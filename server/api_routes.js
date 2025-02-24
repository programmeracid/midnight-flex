import express from "express";
import User from "./config/user_model.js";

const router = express.Router();

router.get("/:username", async (req, res) => {
    try {
        const playerData = await findPlayerByUsername(req.params.username);
        res.json(playerData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
export default router;

const findPlayerByUsername = async (username) => {
    try {
        const player = await User.findOne({ username });
        return player ? { status: player.status } : { status: "" };
    } catch (error) {
        console.error("Error fetching player:", error);
        throw new Error("Database error");
    }
};