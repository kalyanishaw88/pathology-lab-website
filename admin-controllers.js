import Admin from "../models/admin-login-model.js"
import User from "../models/auth-user-model.js"
import Booking from "../models/booking-model.js"
import Confirm_Booking from "../models/confirm-booking-model.js"
import Report from "../models/report-model.js"
import Service from "../models/services-model.js"

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const adminEmail = await Admin.findOne({ email })
        const adminPassword = await Admin.findOne({ password })
        if (!adminEmail && !adminPassword) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        res.status(200).json({
            message: "Welcome Admin!!", token: await adminEmail.generateToken()
        })
    } catch (error) {
        console.log("Admin Login controller error:", error);
    }
}

const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.log("All Users controller error:", error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.deleteOne({ _id: id })
        return res.status(200).json({ message: "User Deleted" })
    } catch (error) {
        console.log("Delete Users:", error);
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await User.findOne({ _id: id }).select({ password: 0 })
        res.status(200).json(userData)
    } catch (error) {
        console.log("Edit Users:", error);
    }
}

const updateUser = async (req, res) => {
    try {
        const userUpdate = req.body
        const id = req.params.id
        const updatedData = await User.updateOne({ _id: id }, { $set: userUpdate })
        res.status(200).json(updatedData)
    } catch (error) {
        console.log("Update Users:", error);
    }
}

const allBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find()
        res.status(200).json(allBookings)
    } catch (error) {
        console.log("All Users controller error:", error);
    }
}

const bookigConfirmation = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await Booking.findOne({ _id: id })
        res.status(200).json(userData)
    } catch (error) {
        console.log("Confirm Bookings:", error);
    }
}

const bookigConfirmationDetails = async (req, res) => {
    try {
        const { firstName, lastname, phone, testDate, price } = req.body
        await Confirm_Booking.create({ firstName, lastname, phone, testDate, price })
        res.status(200).json({ message: "Booking Confirmed" })
    } catch (error) {
        console.log("Confirm Bookings:", error);
    }
}

const deleteBooking = async (req, res) => {
    try {
        const id = req.params.id
        await Booking.deleteOne({ _id: id })
        return res.status(200).json({ message: "Booking Data Deleted" })
    } catch (error) {
        console.log("Delete Users:", error);
    }
}

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const image = req.file.filename
    const { description, price, test_days, parameters, pre_requisit, testName } = req.body
    await Service.create({ description, price, test_days, parameters, pre_requisit, testName, image })
    res.status(200).json({ message: "File uploaded successfully" });
};

const report = async (req, res) => {
    const { firstName, lastName, gender, date, testFor, normal, testedValue, reportOverview, costPrice } = req.body
    await Report.create({ firstName, lastName, gender, date, testFor, normal, testedValue, reportOverview, costPrice })
    res.status(200).json({ message: "Report creation completed!!" });
};

const getReportForGenerate = async (req, res) => {
    try {
        const id = req.params.id
        const reportData = await Booking.findOne({ _id: id })
        res.status(200).json(reportData)
    } catch (error) {
        console.log("getReportForGenerate Users:", error);
    }
}

const clientreport = async (req, res) => {
    try {
        const { fname } = req.params
        const reportData = await Report.findOne({ firstName: fname })
        res.status(200).json(reportData)
    } catch (error) {
        console.log("getReportForGenerate Users:", error);
    }
}


export { adminLogin, allUsers, deleteUser, editUser, updateUser, allBookings, bookigConfirmation, bookigConfirmationDetails, deleteBooking, uploadFile, report, getReportForGenerate, clientreport }