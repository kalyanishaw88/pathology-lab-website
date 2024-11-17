import express from 'express'
import { booking, labServices, loggedUser, login, register, userBooking } from '../controllers/auth-controller.js'
import validate from '../middlewares/validate-middleware.js'
import signupSchema from '../validations/user-validation.js'
import bookingFormSchema from '../validations/booking-form-validation.js'
import authenticateUser from '../middlewares/auth-middleware.js'
const router = express.Router()


router.route('/register').post(validate(signupSchema), register)
router.route('/login').post(login)
router.route('/booking').post(validate(bookingFormSchema), booking)
router.route('/labservices').get(labServices)
router.route('/user').get(authenticateUser, loggedUser)
router.route('/userbooking').get(authenticateUser, userBooking)



export default router