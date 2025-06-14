import React, { useState, useEffect } from "react";
import {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
} from "../services/membershipService";

const MembershipPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getMemberships();
    setMemberships(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateMembership(editingId, { name });
    } else {
      await createMembership({ name });
    }
    setName("");
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (data) => {
    setName(data.name);
    setEditingId(data._id);
  };

  const handleDelete = async (id) => {
    await deleteMembership(id);
    fetchData();
  };

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Manage Memberships
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              marginBottom: "0.25rem",
              color: "#374151",
            }}
          >
            Membership Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter membership name"
            required
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              fontSize: "0.875rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "0.5rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            {editingId ? "Update Membership" : "Add Membership"}
          </button>
        </div>
      </form>

      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          borderRadius: "0.5rem",
          padding: "1.5rem",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f3f4f6",
                textAlign: "left",
                fontSize: "0.875rem",
              }}
            >
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.75rem" }}>{m.name}</td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    onClick={() => handleEdit(m)}
                    style={{
                      backgroundColor: "#facc15",
                      color: "#fff",
                      padding: "0.25rem 1rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      marginRight: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#eab308")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#facc15")
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      padding: "0.25rem 1rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#dc2626")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#ef4444")
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {memberships.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    padding: "1rem",
                  }}
                >
                  No memberships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipPage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const MembershipPage = () => {
//   const [member, setMember] = useState([]);
//   const [memName, setMemnme] = useState("");
//   const [exis, setExis] = useState(null);
//   useEffect(() => {
//     fetchy();
//   },[]);
//   const fetchy = async () => {
//     const data = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/memberships`
//       // 'http://localhost:5000/api/memberships'
//     );
//     console.log( "memberships", data.data);
    
//     setMember(data.data);
//   };
//   const handleDelete = async (id) => {
//     await axios.delete(
//       `${import.meta.env.VITE_API_URL}/api/memberships/delete/${id}`
//       // `http://localhost:5000/api/memberships/delete/${id}`
//     );
//     fetchy();
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (exis) {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/memberships/update/${exis}`,
//         // `http://localhost:5000/api/memberships/update/${exis}`,
//         { name: memName },
//         // { memName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } else {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/memberships/add`,
//         // `http://localhost:5000/api/memberships/add`,
//         { name: memName },
//         // { memName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//     setMemnme("");
//     setExis(null);
//     fetchy();
//   };
//   const handelEdit = (cus) => {
//     setMemnme(cus.name);
//     setExis(cus._id);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>name</label>
//         <input
//           type="text"
//           value={memName}
//           onChange={(e) => setMemnme(e.target.value)}
//         />
//         <button type="submit">{exis ? "update" : "add"}</button>
//       </form>
//       <div>
//         <ul>
//           {member.map((m) => (
//             <li key={m._id}>
//               {m.name}
//               <button onClick={() => handelEdit(m)}>edit</button>
//               <button onClick={() => handleDelete(m._id)}>delete</button>
//             </li>
//           ))}

//           {member.length === 0 && <li>No memberships found.</li>}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MembershipPage;
