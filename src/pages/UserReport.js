import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useAuth } from '../store/auth'

const UserReport = () => {
    const [report, setReport] = useState(null)
    const { user } = useAuth()
    const fname = user.firstName
    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/clientreport/${fname}`, {
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

    useEffect(() => {
        if (fname) {
            getAllUsers(); // Fetch report only if fname is available
        }
    }, [fname])

    const handlePrint = () => {
        window.print(); // This triggers the browser's print dialog
    };
    return (
        <>
            <div className="report-container">
                <div className="report_page">
                    {report ? (
                        <>
                            <div className="our_lab">
                                <h2>LABLIFE SOLUTION</h2>
                                <h3>Near Kanahiya Road,Jhamlal Nagar,Kolkata-801240</h3>
                                <h3>Contact Us:- lablifesolution@gmail.com || 8451002100 || 8541023699 ✅</h3>
                            </div>
                            <hr />
                            <div className="patent_details">
                                <p><span>`{report.firstName} {report.lastName}`</span><span>23 years</span><span>{report.gender}</span></p>
                                <p>{report.date}</p>
                            </div>
                            <div className="testResults">
                                <table>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Test Name</th>
                                        <th>Normal</th>
                                        <th>Tested Result</th>
                                    </tr>
                                    <tr>
                                        <th>1</th>
                                        <td>{report.testFor}</td>
                                        <td>{report.normal}</td>
                                        <td>{report.testedValue}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="cost-price">
                                <hr />
                                <p><span>Test Charges</span><span>₹{report.costPrice}</span></p>
                            </div>
                            <button id="downLoadbtn" onClick={handlePrint}>
                                Print or Download
                            </button>
                        </>
                    ) : (<h1>Report not generated yet!!</h1>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserReport
