import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
////////////////signup///////////////
export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ error: "Please Fillyyy in all fields" });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password dont match" });
        }
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (user) {
            return res.status(400).json({ error: "User already Exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await prisma.user.create({
            data: {
                fullname,
                username,
                password,
                gender,
                profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
            },
        });
        if (newUser) {
            generateToken(newUser.id, res);
            //generate token in a second
            res.status(201).json({
                id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilepic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid Data" });
        }
    }
    catch (error) {
        console.log("error in signUp controller", error.message);
        res.status(500).json({ error: "inetrnal server Error" });
    }
};
//////////////////////login///////////
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid User" });
        }
        // const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        // if (!isPasswordCorrect) {
        //   return res.status(400).json({ error: "invalid Password" });
        // }
        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
        });
    }
    catch (error) {
        console.log("error in signUp controller", error.message);
        res.status(500).json({ error: "inetrnal server Error" });
    }
};
/////////////////logout//////////////
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "internal server Error" });
    }
};
/////////////////getme///////////////
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            id: user.id,
            fullname: user.fullname,
            username: user.fullname,
            profilepic: user.profilepic,
        });
    }
    catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
