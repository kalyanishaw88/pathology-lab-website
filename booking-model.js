import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
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

    address: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        require: true
    },

    date: {
        type: String,
        require: true
    },

    testFor: {
        type: String,
        require: true
    },
})


const Booking = new mongoose.model('Booking', bookingSchema)

export default Booking