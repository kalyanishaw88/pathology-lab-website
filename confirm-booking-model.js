import mongoose from "mongoose";

const confirmBookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        required: true,
    },

    testDate: {
        type: String,
        require: true
    },

    price: {
        type: String,
        require: true
    },
})


const Confirm_Booking = new mongoose.model('Confirm_Booking', confirmBookingSchema)

export default Confirm_Booking