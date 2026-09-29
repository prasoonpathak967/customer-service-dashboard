import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { customers, serviceRequests, dashboardStats } from "./data/mockData";

function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={() => setLoggedIn(false)}
        open={sidebarOpen}
      />
      <div className="main-area">
        <Header page={page} onMenu={() => setSidebarOpen(!sidebarOpen)} />
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
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

function Sidebar({ page, setPage, onLogout, open }) {
  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>
      <div className="brand">ServiceDesk</div>
      <nav>
        <button
          className={page === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("dashboard")}
        >
          <span>⌂</span> <em>Dashboard</em>
        </button>
        <button
          className={page === "customers" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("customers")}
        >
          <span>♙</span> <em>Customers</em>
        </button>
      </nav>
      <button className="logout" onClick={onLogout}>↪ <em>Logout</em></button>
    </aside>
  );
}

function Header({ page, onMenu }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenu}>☰</button>
        <div>
          <h2>{page === "dashboard" ? "Dashboard" : "Customers"}</h2>
          <p>Welcome back</p>
        </div>
      </div>
      <div className="user-box">
        <div className="avatar">A</div>
        <span>Admin</span>
      </div>
    </header>
  );
}

function Dashboard() {
  const [period, setPeriod] = useState("Today");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);

  const stats = dashboardStats[period];

  const requests = useMemo(() => {
    let result = serviceRequests.filter((item) => {
      const text = `${item.customer} ${item.service}`.toLowerCase();
      return text.includes(search.toLowerCase()) &&
        (status === "All" || item.status === status);
    });

    result.sort((a, b) =>
      sort === "customer"
        ? a.customer.localeCompare(b.customer)
        : b.id - a.id
    );
    return result;
  }, [search, status, sort]);

  const changePeriod = (value) => {
    setLoading(true);
    setPeriod(value);
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <main className="content">
      <div className="page-toolbar">
        <div>
          <h3>Overview</h3>
          <p className="muted-small">Track service activity and customer requests.</p>
        </div>
        <select value={period} onChange={(e) => changePeriod(e.target.value)}>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <div className="cards">
          {stats.map((stat) => (
            <SummaryCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
      )}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Service Requests</h3>
            <p>Search, filter and sort recent requests</p>
          </div>
        </div>

        <div className="filters">
          <input
            className="search"
            placeholder="Search customer or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="customer">Customer A-Z</option>
          </select>
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
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.customer}</td>
                  <td>{request.service}</td>
                  <td><StatusBadge status={request.status} /></td>
                  <td>{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="empty">
              <strong>No service requests found</strong>
              <span>Try changing the search or status filter.</span>
            </div>
          )}
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
  const [success, setSuccess] = useState("");

  const filteredCustomers = customerList.filter((customer) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText);
    const matchesStatus = status === "All" || customer.status === status;
    return matchesSearch && matchesStatus;
  });

  const addCustomer = (newCustomer) => {
    setCustomerList((list) => [...list, { ...newCustomer, id: Date.now() }]);
    setShowAdd(false);
    setSuccess("Customer added successfully.");
    setTimeout(() => setSuccess(""), 2500);
  };

  return (
    <main className="content">
      <section className="panel">
        <div className="customer-toolbar">
          <div>
            <h3>Customer List</h3>
            <p>Search and manage your customers</p>
          </div>
          <button className="primary-btn" onClick={() => setShowAdd(true)}>
            + Add Customer
          </button>
        </div>

        {success && <div className="success">{success}</div>}

        <div className="filters">
          <input
            className="search"
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
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
            <div className="empty">
              <strong>No customers found</strong>
              <span>Try another search or status.</span>
            </div>
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
        <AddCustomerModal onClose={() => setShowAdd(false)} onAdd={addCustomer} />
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
    name: "", email: "", phone: "", status: "Active"
  });
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill all fields.");
      return;
    }
    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number should contain 10 digits.");
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
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Customer name"
        />

        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="customer@email.com"
        />

        <label>Phone</label>
        <input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="10 digit phone number"
        />

        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
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
