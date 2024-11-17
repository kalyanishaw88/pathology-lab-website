import jwt from "jsonwebtoken"
import User from "../models/auth-user-model.js"

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User, token not provided" })
    }
    const actualtoken = token.replace("Bearer", "").trim()
    try {
        const verifyToken = jwt.verify(actualtoken, process.env.JWT_SECRET_KEY)
        const userData = await User.findOne({ email: verifyToken.email }).select({ password: 0 })
        req.user = userData
        next()
    } catch (error) {
        console.log("authenticateUser middleware error:", error);

    }
}

export default authenticateUser