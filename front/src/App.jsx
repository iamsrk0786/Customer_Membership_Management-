import React from "react";
import CustomerPage from "./pages/Customer";
import MembershipPage from "./pages/Member";


function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "1rem 1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Customer & Membership Management
        </h1>
      </header>

      <main
        style={{
          padding: "1.5rem",
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            Customers
          </h2>
          <CustomerPage />
        </section>

        <section>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            Memberships
          </h2>
          <MembershipPage />
        </section>
      </main>
    </div>
  );
}

export default App;
