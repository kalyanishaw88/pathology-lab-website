import './servicepopup.css'

const 
Servicepopup = ({ serviceDetails, onClose }) => {
    if (!serviceDetails) return null

    return (
        <>
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <div className="serviImageForPopup">
                        <img src={`test_services/${serviceDetails.image}`} alt={serviceDetails.image} />
                    </div>
                    <div className="serviceContentForPopup">
                        <p><span>{serviceDetails.testName}</span><span>₹.{serviceDetails.price}</span></p>
                        <p>Parameters:- {serviceDetails.parameters}</p>
                        <p>Pre Requisit:- {serviceDetails.pre_requisit}</p>
                        <p>Days:- {serviceDetails.test_days}</p>
                        <p>{serviceDetails.description}</p>
                    </div>
                    <button onClick={onClose}>CLose</button>
                </div>
            </div>
        </>
    )
}

export default Servicepopup