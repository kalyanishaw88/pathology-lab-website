import express from 'express'
import { adminLogin, allBookings, allUsers, bookigConfirmation, bookigConfirmationDetails, clientreport, deleteBooking, deleteUser, editUser, getReportForGenerate, report, updateUser } from '../controllers/admin-controllers.js'
const adminRouter = express.Router()


adminRouter.route('/login').post(adminLogin)
adminRouter.route('/allUsers').get(allUsers)
adminRouter.route('/user/delete/:id').delete(deleteUser)
adminRouter.route('/user/:id').get(editUser)
adminRouter.route('/user/update/:id').patch(updateUser)
adminRouter.route('/allBookings').get(allBookings)
adminRouter.route('/bookigConfirmation/:id').get(bookigConfirmation)
adminRouter.route('/bookigConfirmation').post(bookigConfirmationDetails)
adminRouter.route('/booking/delete/:id').delete(deleteBooking)

adminRouter.route('/report').post(report)
adminRouter.route('/report/generate/:id').get(getReportForGenerate)
adminRouter.route('/clientreport/:fname').get(clientreport)


export default adminRouter