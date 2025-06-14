import React, { useState, useEffect } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";
import { getMemberships } from "../services/membershipService";

const CustomerPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    status: "Gold",
    membershipData: "",
  });
  const [customers, setCustomers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [customerData, membershipData] = await Promise.all([
      getCustomers(),
      getMemberships(),
    ]);
    setCustomers(customerData);
    setMemberships(membershipData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCustomer(editingId, formData);
    } else {
      await createCustomer(formData);
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      status: "Gold",
      membershipData: "",
    });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (customer) => {
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      contactNumber: customer.contactNumber,
      status: customer.status,
      membershipData:  customer.membershipData?._id || "",
    });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchData();
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Customer Management
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}
        >
          {editingId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Contact Number", name: "contactNumber", type: "text" },
          ].map((input) => (
            <div key={input.name}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                }}
              >
                {input.label}
              </label>
              <input
                name={input.name}
                type={input.type}
                value={formData[input.name]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          ))}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "6px",
              }}
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <option value="Gold">Gold</option>
              <option value="Diamond">Diamond</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "6px",
              }}
            >
              Membership
            </label>
            <select
              name="membershipData"
              value={formData.membershipData}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <option value="">Select Membership</option>
              {memberships.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "10px 24px",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Customer" : "Add Customer"}
          </button>
        </div>
      </form>

      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f9fafb",
                fontSize: "14px",
                textTransform: "uppercase",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px" }}>First Name</th>
              <th style={{ padding: "12px" }}>Last Name</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Contact</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Membership</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr
                key={cust._id}
                style={{ borderTop: "1px solid #e5e7eb", fontSize: "14px" }}
              >
                <td style={{ padding: "12px" }}>{cust.firstName}</td>
                <td style={{ padding: "12px" }}>{cust.lastName}</td>
                <td style={{ padding: "12px" }}>{cust.email}</td>
                <td style={{ padding: "12px" }}>{cust.contactNumber}</td>
                <td style={{ padding: "12px" }}>{cust.status}</td>
                <td style={{ padding: "12px" }}>
                  {cust.membershipData?.name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleEdit(cust)}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cust._id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#6b7280",
                  }}
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const CustomerPage = () => {
//   const [customers, setCustomers] = useState([]);
//   const [existId, setExistId] = useState(null);
//   const [memberships, setMemberships] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNumber: "",
//     status: "Gold",
//     membershipData: "",
//   });
//   useEffect(() => {
//     fetchCustomers();
//     fetchMemberships();
//   }, []);
//   const fetchCustomers = async () => {
//     const customer = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/customers`
//       // "http://localhost:5000/api/customers"
//     );
//     console.log("customers", customer.data);

//     setCustomers(customer.data);
//   };
//   const fetchMemberships = async () => {
//     const membership = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/memberships`
//       // "http://localhost:5000/api/memberships"
//     );
//     console.log("memberships", membership.data);
//     setMemberships(membership.data);
//   };
//   const handleDelete = async (id) => {
//     await axios.delete(
//       `${import.meta.env.VITE_API_URL}/api/customers/delete/${id}`
//       // `http://localhost:5000/api/customers/delete/${id}`
//     );
//     fetchCustomers();
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (existId) {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/customers/update/${existId}`,
//         // `http://localhost:5000/api/customers/update/${existId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } else {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/customers/add`,
//         // "http://localhost:5000/api/customers/add",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       contactNumber: "",
//       status: "Gold",
//       membershipData: "",
//     });
//     setExistId(null);
//     fetchCustomers();
//   };
//   const handleEdit = (customer) => {
//     setFormData({
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       email: customer.email,
//       contactNumber: customer.contactNumber,
//       status: customer.status,
//       membershipData: customer.membershipData?._id || "",
//     });
//     setExistId(customer._id);
//   };

//   return (
//     <div>
//       <h1>Customer Management</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//           required
//         />
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="text"
//           name="contactNumber"
//           value={formData.contactNumber}
//           onChange={handleChange}
//           placeholder="Contact Number"
//         />
//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="Gold">Gold</option>
//           <option value="Diamond">Diamond</option>
//         </select>
//         <select
//           name="membershipData"
//           value={formData.membershipData}
//           onChange={handleChange}
//         >
//           <option value="">Select Membership</option>
//           {memberships.map((membership) => (
//             <option key={membership._id} value={membership._id}>
//               {membership.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit">{existId ? "Update" : "Add"} Customer</button>
//       </form>

//       <h2>Customer List</h2>
//       <ul>
//         {customers.map((customer) => (
//           <li key={customer._id}>
//             {customer.firstName} {customer.lastName} - {customer.email} -{" "}
//             {customer.contactNumber} - {customer.status} -{" "}
//             {customer.membershipData?.name}{" "}
//             <button onClick={() => handleEdit(customer)}>Edit</button>
//             <button onClick={() => handleDelete(customer._id)}>Delete</button>
//           </li>
//         ))}
//         {customers.length === 0 && <li>No customers found.</li>}
//       </ul>
//     </div>
//   );
// };

// export default CustomerPage;
