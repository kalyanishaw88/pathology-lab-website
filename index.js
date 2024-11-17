import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import router from './routers/auth-router.js'
import connectDB from './utils/db.js'
import adminRouter from './routers/admin-router.js'
import uploadRouter from './routers/upload-router.js'
const app = express()
app.use(express.json())

const corsPolicy = {
    origin: "*",
    method: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credential: true
}

app.use(cors(corsPolicy))

const PORT = process.env.PORT
app.use('/api/auth', router)
app.use('/admin', adminRouter)
app.use('/admin/service', uploadRouter)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})


