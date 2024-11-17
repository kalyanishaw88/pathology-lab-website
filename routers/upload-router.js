import express from 'express'
const uploadRouter = express.Router()
import multer from 'multer'
import { uploadFile } from '../controllers/admin-controllers.js'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../client/public/test_services')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage })

uploadRouter.post('/upload', upload.single('image'), uploadFile)


export default uploadRouter