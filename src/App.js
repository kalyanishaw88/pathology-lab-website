import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Logout from './pages/Logout'
import Error from './pages/Error'
import UserBooking from './pages/UserBooking'
import Admin from './pages/Admin'
import ScrollToTop from './components/ScrollToTOp'
import AdminPanel from './admin pages/AdminPanel'
import AdminUsers from './admin pages/AdminUsers'
import AdminBookings from './admin pages/AdminBookings'
import AdminServices from './admin pages/AdminServices'
import AdminUpdate from './admin pages/AdminUpdate'
import AdminConfirm from './admin pages/AdminConfirm'
import AdminReport from './admin pages/AdminReport'
import AdminReportGeneration from './admin pages/AdminReportGeneration'
import UserReport from './pages/UserReport'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/booktest' element={<Booking />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/userbooking' element={<UserBooking />} />
          <Route path='/userreport' element={<UserReport />} />
          <Route path='/adminpanel' element={<AdminPanel />}>
            <Route path='users' element={<AdminUsers />} />
            <Route path='bookings' element={<AdminBookings />} />
            <Route path='services' element={<AdminServices />} />
            <Route path='reports' element={<AdminReport />} />
            <Route path='users/:id/edit' element={<AdminUpdate />} />
            <Route path='bookings/:id/confirm' element={<AdminConfirm />} />
            <Route path='reports/:id' element={<AdminReportGeneration />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App