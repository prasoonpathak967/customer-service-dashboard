import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { customers, serviceRequests } from "./data/mockData";

function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      <div className="main-area">
        <Header page={page} />
        {page === "dashboard" ? <Dashboard /> : <Customers />}
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>ServiceDesk</h1>
        <p className="muted">Sign in to continue</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-btn full" type="submit">Login</button>
      </form>
    </div>
  );
}

function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">ServiceDesk</div>

      <nav>
        <button
          className={page === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("dashboard")}
        >
          <span>⌂</span> Dashboard
        </button>

        <button
          className={page === "customers" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("customers")}
        >
          <span>♙</span> Customers
        </button>
      </nav>

      <button className="logout" onClick={onLogout}>Logout</button>
    </aside>
  );
}

function Header({ page }) {
  return (
    <header className="header">
      <div>
        <h2>{page === "dashboard" ? "Dashboard" : "Customers"}</h2>
        <p>Welcome back</p>
      </div>
      <div className="user-box">
        <div className="avatar">A</div>
        <span>Admin</span>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <main className="content">
      <div className="cards">
        <SummaryCard title="Total Customers" value="120" />
        <SummaryCard title="Active Services" value="85" />
        <SummaryCard title="Pending Requests" value="12" />
        <SummaryCard title="Revenue" value="₹45,000" />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Service Requests</h3>
            <p>Latest customer service requests</p>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.customer}</td>
                  <td>{request.service}</td>
                  <td><StatusBadge status={request.status} /></td>
                  <td>{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="summary-card">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
}

function Customers() {
  const [customerList, setCustomerList] = useState(customers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filteredCustomers = customerList.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  const addCustomer = (newCustomer) => {
    setCustomerList([...customerList, { ...newCustomer, id: Date.now() }]);
    setShowAdd(false);
  };

  return (
    <main className="content">
      <section className="panel">
        <div className="customer-toolbar">
          <div>
            <h3>Customer List</h3>
            <p>Manage your customers</p>
          </div>

          <button className="primary-btn" onClick={() => setShowAdd(true)}>
            + Add Customer
          </button>
        </div>

        <div className="filters">
          <input
            className="search"
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td><StatusBadge status={customer.status} /></td>
                  <td>
                    <button className="view-btn" onClick={() => setSelectedCustomer(customer)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <p className="empty">No customers found.</p>
          )}
        </div>
      </section>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {showAdd && (
        <AddCustomerModal
          onClose={() => setShowAdd(false)}
          onAdd={addCustomer}
        />
      )}
    </main>
  );
}

function CustomerModal({ customer, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Customer Details</h3>
          <button className="close" onClick={onClose}>×</button>
        </div>

        <div className="details">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Status:</strong> <StatusBadge status={customer.status} /></p>
        </div>

        <button className="primary-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function AddCustomerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active"
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill all fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    onAdd(form);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Customer</h3>
          <button type="button" className="close" onClick={onClose}>×</button>
        </div>

        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Customer name"
        />

        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="customer@email.com"
        />

        <label>Phone</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone number"
        />

        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button className="primary-btn" type="submit">Add Customer</button>
      </form>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);