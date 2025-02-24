import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import {connectDB} from "./config/db.js";
import bcrypt from 'bcryptjs';
import User from './config/user_model.js';
import authRoutes from './auth_routes.js';
import apiRoutes from './api_routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const _dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "../client", "dist", "index.html"));
    })
}

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(5001, () => {
    connectDB();

    console.log("Server started at http://localhost:5001");
});


    