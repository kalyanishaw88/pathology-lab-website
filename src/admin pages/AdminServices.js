
import { useState } from 'react';
import { toast } from 'react-toastify';

const AdminServices = () => {
  const [file, setFile] = useState(null)
  const [service, setService] = useState({
    testName: "",
    pre_requisit: "",
    parameters: "",
    test_days: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevElem) => ({
      ...prevElem,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    Object.keys(service).forEach(key => {
      formData.append(key, service[key]);
    });
    try {
      const response = await fetch('http://localhost:5000/admin/service/upload', {
        method: "POST",
        body: formData,
      })
      const res_data = await response.json()
      if (response.ok) {
        toast.success(res_data.message)
        setService({
          testName: "",
          pre_requisit: "",
          parameters: "",
          test_days: "",
          description: "",
          price: "",
        })
        setFile(null)
      } else {
        toast.error(res_data.message)
      }

    } catch (error) {
      console.log("Booking Form error", error);
    }
  };

  return (
    <>
      <div className="service-confirm-container">
        <div className="service-form">
          <h2>Add new test service:-</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" name='image' value={service.image} onChange={handleFileChange} />
            <input type="text" name='testName' placeholder='testName' value={service.testName} onChange={handleInputChange} />
            <input type="text" name='pre_requisit' placeholder='pre_requisit' value={service.pre_requisit} onChange={handleInputChange} />
            <input type="text" name='parameters' placeholder='parameters' value={service.parameters} onChange={handleInputChange} />
            <input type="text" name='test_days' placeholder='Test Days' value={service.test_days} onChange={handleInputChange} />
            <input type="text" name='description' placeholder='description' value={service.description} onChange={handleInputChange} />
            <input type="text" name='price' placeholder='price' value={service.price} onChange={handleInputChange} />
            <button type='submit'>Upload</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminServices;
