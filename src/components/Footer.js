import React from 'react'
import './footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <div className="col-1">
                    <h2>Our Tests:-</h2>
                    <ul>
                        <li>Blood Test</li>
                        <li>Urine Test</li>
                        <li>Hemoglobin Test</li>
                        <li>Stool Test</li>
                        <li>Sonography</li>
                        <li>Ultra Sonography</li>
                        <li>Sugar Test</li>
                    </ul>
                </div>
                <div className="col-1">
                    <h2>About Us:-</h2>
                    <p>Welcome to LabLife Solutions, your trusted partner in diagnostic excellence. At our state-of-the-art pathology lab, we are committed to providing accurate and timely results to support your healthcare journey. Our team of highly skilled pathologists and technicians utilizes advanced technology and methodologies to conduct a wide range of tests, from routine blood work to specialized diagnostic procedures. With a focus on precision, reliability, and patient care, we strive to deliver results you can count on. At LabLife Solutions, your health is our priority, and we are dedicated to helping you make informed decisions for a healthier future.</p>
                </div>
                <div className="col-1">
                    <h2>Connect to us:-</h2>
                    <div className="social-icons">
                        <span><FaSquareTwitter /></span>
                        <span><FaInstagramSquare /></span>
                        <span><FaFacebookSquare /></span>
                    </div>
                    <p>Contact No. 888*****787</p>
                    <p>Email Us. lablifesolution@gmail.com</p>
                </div>
            </div>
        </>
    )
}

export default Footer