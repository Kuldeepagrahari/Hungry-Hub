// import React, { useState } from "react";
// import axios from "axios";
// import "./CustomerCareForm.css"; // Add styles to match the UI

// const CustomerCare = () => {
//   const [formData, setFormData] = useState({
//     orderId: "",
//     complaintType: "",
//     description: "",
//     image: null,
//   });

 

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("orderId", formData.orderId);
//     data.append("complaintType", formData.complaintType);
//     data.append("description", formData.description);
//     data.append("image", formData.image);

//     try {
//       const response = await axios.post("http://localhost:5000/api/complains", data);
//       if (response.status === 200) {
//         setMessage("Complaint submitted successfully!");
//         setFormData({
//           orderId: "",
//           complaintType: "",
//           description: "",
//           image: null,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting complaint:", error);
//       setMessage("Failed to submit complaint. Please try again.");
//     }
//   };

//   return (
//     <div className="customer-care-form">
//       <h2>Customer Care Service</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Order ID:</label>
//         <input
//           type="text"
//           name="orderId"
//           value={formData.orderId}
//           onChange={handleChange}
//           required
//         />

//         <label>Complaint Type:</label>
//         <select
//           name="complaintType"
//           value={formData.complaintType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Complaint Type</option>
//           <option value="Wrong Item Delivered">Wrong Item Delivered</option>
//           <option value="Late Delivery">Late Delivery</option>
//           <option value="Damaged Packaging">Damaged Packaging</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <label>Upload Image:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           required
//         />

//         <button type="submit">Submit Complaint</button>
//       </form>
//     </div>
//   );
// };

// export default CustomerCare;
import React from 'react'

const CustomerCare = () => {
  return (
    <div style={{textAlign:"center", height:"400px", borderRadius:"20px", display:"flex", alignItems:"center", color:"white", fontSize:"30px", justifyContent:"center", fontWeight:"bold"}}>
      We're Sorry!<br />
      This functionality is not LIVE for now.
    </div>
  )
}

export default CustomerCare
