import User from "../models/auth-user-model.js";
import Booking from "../models/booking-model.js";
import Confirm_Booking from "../models/confirm-booking-model.js";
import Service from "../models/services-model.js";

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, gender, password, confirmPassword } = req.body
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(401).json({ message: "Email already exist." })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ message: "Password Not Matched" })
        }
        const userData = await User.create({ firstName, lastName, email, phone, gender, password, confirmPassword })
        res.status(201).json({ message: "Registration Successfully", token: await userData.generateToken() })

    } catch (error) {
        console.log("Register controller error:", error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const verifyPassword = await userExist.comparePassword(password)
        if (verifyPassword) {
            res.status(200).json({
                message: "Login SuccessFul", token: await userExist.generateToken()
            })
        } else {
            res.status(401).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        console.log("Login controller error:", error);
    }
}

const booking = async (req, res) => {
    try {
        const { firstName, lastName, phone, address, gender, date, testFor } = req.body
        await Booking.create({ firstName, lastName, phone, address, gender, date, testFor })
        res.status(201).json({ message: "Booking recieved, soon it will be confirmed" })
    } catch (error) {
        console.log("Booking controller error:", error);
    }
}

const labServices = async (req, res) => {
    try {
        const labServiceData = await Service.find()
        res.status(200).json(labServiceData)
    } catch (error) {
        console.log("labServices controller error:", error);
    }
}

const loggedUser = async (req, res) => {
    try {
        const loggedUserDetail = req.user
        res.status(200).json(loggedUserDetail)
    } catch (error) {
        console.log("loggedUser controller error:", error);
    }
}

const userBooking = async (req, res) => {
    try {
        const loggedUserDetail = req.user
        const bookingStatus = await Confirm_Booking.findOne({ phone: loggedUserDetail.phone })
        res.status(200).json(bookingStatus)
    } catch (error) {
        console.log("loggedUser controller error:", error);
    }
}

export { register, login, booking, labServices, loggedUser, userBooking }