const { User } = require("../../models/User")
const { Booking } = require("../../models/MovieBooking")

const bcrypt = require("bcrypt");
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const send_otp = require("../../config/nodemailer");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10h"
        }
    )
}

const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const check_user = await User.findOne({ email: email });

        if (!check_user) {
            return res.status(404).json({ message: "User not found" });
        }

        const same_pass = await bcrypt.compare(password, check_user.password);

        if (!same_pass) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = generateToken(check_user);
        res.status(200).json({ message: "Login successful", token, user: { name: check_user.name, email: check_user.email, role: check_user.role, balance: check_user.balance } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const userRegister = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                "string.empty": "Name is required"
            }),
            email: Joi.string().email().required().messages({
                "string.empty": "Email is required",
                "string.email": "Invalid email format"
            }),
            password: Joi.string().min(6).required().messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least 6 characters"
            }),
            role: Joi.string().valid("User", "Vendor").required().messages({
                "any.only": "Role must be User or Vendor",
                "string.empty": "Role is required"
            }),
            balance: Joi.number()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        const { name, email, password, role } = req.body;

        const already_registered = await User.findOne({ email })
        if (already_registered) {
            return res.status(409).json({ message: "User already exists" });
        }

        const new_pass = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: new_pass,
            role,
            balance: 2000
        });
        await newUser.save();
        res.status(201).json({ message: "User successfully created", user: newUser });
    }
    catch (error) {
        console.error("Error in the userRegister function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const userForgotPassowrd = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await send_otp(email, otp);
        res.status(200).json({ message: "OTP successfully sent to your mail" });
    } catch (error) {
        console.error("OTP error:", error);
        res.status(500).json({ message: "Failed to send the OTP" });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || !otp) {
            return res.status(400).json({ message: "OTP not found" });
        }

        if (Date.now() > user.otpExpiresAt) {
            return res.status(410).json({ message: "OTP expired" });
        }
        if (parseInt(otp) !== user.otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }
        res.status(200).json({ message: "OTP verified" });

    } catch (error) {
        console.error("verifyOTP error: ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -otp -otpExpiresAt");
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        const { name, email, role, balance,profilePic  } = user;
        res.status(200).json({ user: { name, email, role, balance,profilePic } });
    } catch (error) {
        console.error("userDetails error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, new_pass } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const hashed_pass = await bcrypt.hash(new_pass, 10);
        user.password = hashed_pass;
        user.otp = null;
        user.otpExpiresAt = null;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const { name, email, profilePic } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (profilePic !== undefined) {
            user.profilePic = profilePic;
        }

        await user.save();

        res.status(200).json({ message: "Successfully updated user info", user });
    } catch (error) {
        console.error("Error in the updateTopic function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    userLogin,
    userRegister,
    userForgotPassowrd,
    verifyOTP,
    resetPassword,
    userDetails,
    updateUserInfo,
}

