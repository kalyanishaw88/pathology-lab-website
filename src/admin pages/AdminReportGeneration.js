import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminReportGeneration = () => {
    const [report, setReport] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        testFor: "",
        normal: "",
        testedValue: "",
        reportOverview: "",
        costPrice: ""
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const getReportForGenerate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/report/generate/${id}`, {
                method: "GET"
            })
            const res_data = await response.json()
            if (response.ok) {
                setReport(res_data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReport((prevElem) => ({
            ...prevElem,
            [name]: value
        }));
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/admin/report', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(report)
            })
            const res_data = await response.json()
            if (response.ok) {
                toast.success(res_data.message)
                navigate('/adminpanel/reports')
            } else {
                toast.error(res_data.message)
            }

        } catch (error) {
            console.log("Booking Form error", error);
        }
    }

    useEffect(() => {
        getReportForGenerate()
    }, [])
    return (
        <>
            <div className="report-confirm-container">
                <div className="report-form">
                    <h2>Add new test service:-</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="fullName">
                            <input type="text" name='firstName' placeholder='First Name' readOnly value={report.firstName} onChange={handleInputChange} />
                            <input type="text" name='lastName' placeholder='Last Name' readOnly value={report.lastName} onChange={handleInputChange} />
                        </div>
                        <input type="text" name='gender' placeholder='Gender' readOnly value={report.gender} onChange={handleInputChange} />
                        <input type="date" name='date' value={report.date} onChange={handleInputChange} />
                        <input type="text" name='testFor' readOnly placeholder='testFor' value={report.testFor} onChange={handleInputChange} />
                        <input type="text" name='normal' placeholder='normal' value={report.normal} onChange={handleInputChange} />
                        <input type="text" name='testedValue' placeholder='testedValue' value={report.testedValue} onChange={handleInputChange} />
                        <input type="text" name='reportOverview' placeholder='reportOverview' value={report.reportOverview} onChange={handleInputChange} />
                        <input type="text" name='costPrice' placeholder='costPrice' value={report.costPrice} onChange={handleInputChange} />
                        <button type='submit'>Generate Report</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminReportGeneration