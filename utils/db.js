import mongoose from 'mongoose'

const connectDB = async () => {
    const URI = process.env.MONGO_URI
    try {
        await mongoose.connect(URI)
        console.log("DataBase Has Been Connected SuccessFully")
    } catch (error) {
        console.error("Error in Connecting DB")
    }
}


export default connectDB