import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    testName: {
        type: String,
        require: true,
    },

    pre_requisit: {
        type: String,
        require: true,
    },

    parameters: {
        type: String,
        required: true,
    },

    test_days: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    image: {
        type: String,
        require: true
    }
})


const Service = new mongoose.model('Service', serviceSchema)

export default Service