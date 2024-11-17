import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
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
    
    normal: {
        type: String,
        require: true
    },
    
    testedValue: {
        type: String,
        require: true
    },
    reportOverview: {
        type: String,
        require: true
    },
    costPrice: {
        type: String,
        require: true
    },
    
})


const Report = new mongoose.model('Report', reportSchema)

export default Report