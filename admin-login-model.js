import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const adminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

adminLoginSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
        },
            process.env.JWT_SECRET_KEY, {
            expiresIn: "10d",
        }
        )
    } catch (error) {
        console.error(error)
    }
}

const Admin = new mongoose.model("Admin", adminLoginSchema)

export default Admin