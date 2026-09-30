import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { customers, serviceRequests, dashboardStats } from "./data/mockData";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setSidebarOpen(false);
  };

  const logout = () => {
    setLoggedIn(false);
    setPage("dashboard");
    setSidebarOpen(true);
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="app">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar
        page={page}
        setPage={navigate}
        onLogout={logout}
        open={sidebarOpen}
      />
      <div className="main-area">
        <Header page={page} onMenu={() => setSidebarOpen((open) => !open)} />
        {page === "dashboard" ? <Dashboard /> : <Customers />}
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-decoration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <form className="login-box" onSubmit={handleSubmit} noValidate>
        <div className="login-brand">
          <div className="brand-mark">SD</div>
          <div>
            <strong>ServiceDesk</strong>
            <span>Customer operations</span>
          </div>
        </div>

        <div className="login-heading">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Sign in to your workspace</h1>
          <p className="muted">Manage customers, requests, and service activity from one place.</p>
        </div>

        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
        />

        {error && <p className="error" role="alert">{error}</p>}

        <button className="primary-btn full" type="submit">
          Sign in <span aria-hidden="true">→</span>
        </button>

        <p className="demo-note">Demo mode · Mock authentication only</p>
      </form>
    </div>
  );
}

function Sidebar({ page, setPage, onLogout, open }) {
  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>
      <div className="brand">
        <div className="brand-mark">SD</div>
        <div className="brand-copy">
          <strong>ServiceDesk</strong>
          <span>Customer operations</span>
        </div>
      </div>

      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">
        <button
          className={`nav-item ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
          aria-current={page === "dashboard" ? "page" : undefined}
        >
          <span className="nav-icon" aria-hidden="true">⌂</span>
          <em>Dashboard</em>
        </button>
        <button
          className={`nav-item ${page === "customers" ? "active" : ""}`}
          onClick={() => setPage("customers")}
          aria-current={page === "customers" ? "page" : undefined}
        >
          <span className="nav-icon" aria-hidden="true">♙</span>
          <em>Customers</em>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <span className="help-dot" />
          <div>
            <strong>All systems ready</strong>
            <small>Demo environment</small>
          </div>
        </div>
        <button className="logout" onClick={onLogout}>
          <span aria-hidden="true">↪</span>
          <em>Log out</em>
        </button>
      </div>
    </aside>
  );
}

function Header({ page, onMenu }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenu} aria-label="Toggle navigation">
          <span />
          <span />
          <span />
        </button>
        <div>
          <p className="breadcrumb">WORKSPACE / {page === "dashboard" ? "OVERVIEW" : "CUSTOMERS"}</p>
          <h2>{page === "dashboard" ? "Dashboard" : "Customers"}</h2>
        </div>
      </div>
      <div className="user-box">
        <div className="avatar">A</div>
        <div className="user-copy">
          <strong>Admin</strong>
          <span>Administrator</span>
        </div>
        <span className="online-dot" aria-label="Online" />
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

  const stats = dashboardStats[period] || [];

  const requests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return serviceRequests
      .filter((item) => {
        const text = `${item?.customer || ""} ${item?.service || ""}`.toLowerCase();
        return text.includes(query) && (status === "All" || item?.status === status);
      })
      .sort((a, b) =>
        sort === "customer"
          ? (a?.customer || "").localeCompare(b?.customer || "")
          : (b?.id || 0) - (a?.id || 0)
      );
  }, [search, status, sort]);

  const changePeriod = (value) => {
    setLoading(true);
    setPeriod(value);
    window.setTimeout(() => setLoading(false), 300);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setSort("newest");
  };

  return (
    <main className="content">
      <div className="page-toolbar">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h3>Good morning, Admin</h3>
          <p className="muted-small">Here&apos;s what&apos;s happening with your service desk today.</p>
        </div>
        <label className="period-select">
          <span>Period</span>
          <select value={period} onChange={(event) => changePeriod(event.target.value)}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="loading" aria-live="polite">
          <div className="spinner" />
          Updating overview...
        </div>
      ) : (
        <div className="cards">
          {stats.map((stat, index) => (
            <SummaryCard key={stat.title} {...stat} index={index} />
          ))}
        </div>
      )}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <div className="section-title-row">
              <h3>Recent service requests</h3>
              <span className="count-pill">{requests.length}</span>
            </div>
            <p>Monitor incoming work and current request status.</p>
          </div>
        </div>

        <div className="filters">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              className="search"
              aria-label="Search service requests"
              placeholder="Search customer or service..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort requests">
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
                  <td>
                    <div className="table-person">
                      <div className="mini-avatar">{getInitials(request.customer)}</div>
                      <strong>{request.customer || "Unknown customer"}</strong>
                    </div>
                  </td>
                  <td>{request.service || "Not specified"}</td>
                  <td><StatusBadge status={request.status || "Pending"} /></td>
                  <td className="date-cell">{request.date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <EmptyState
              title="No service requests found"
              message="Try changing the search or status filter."
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ title, value, index }) {
  const icons = ["◉", "✓", "!", "₹"];
  return (
    <div className={`summary-card card-${index}`}>
      <div className="summary-top">
        <span>{title}</span>
        <div className="card-icon" aria-hidden="true">{icons[index]}</div>
      </div>
      <h3>{value}</h3>
      <div className="card-foot">
        <span className="trend">↗</span>
        <span>{index === 3 ? "vs. previous period" : "from mock data"}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status || "Unknown").toLowerCase();
  return <span className={`status ${normalized}`}>{status || "Unknown"}</span>;
}

function Customers() {
  const [customerList, setCustomerList] = useState(customers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [success, setSuccess] = useState("");

  const filteredCustomers = customerList.filter((customer) => {
    const searchText = search.trim().toLowerCase();
    const name = String(customer?.name || "");
    const email = String(customer?.email || "");
    const phone = String(customer?.phone || "");

    return (
      (name.toLowerCase().includes(searchText) ||
        email.toLowerCase().includes(searchText) ||
        phone.includes(searchText)) &&
      (status === "All" || customer?.status === status)
    );
  });

  const addCustomer = (newCustomer) => {
    setCustomerList((list) => [
      ...list,
      { ...newCustomer, id: Date.now() }
    ]);
    setShowAdd(false);
    setSuccess("Customer added successfully.");
    window.setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <main className="content">
      <section className="panel">
        <div className="customer-toolbar">
          <div>
            <p className="eyebrow">DIRECTORY</p>
            <div className="section-title-row">
              <h3>Customer list</h3>
              <span className="count-pill">{filteredCustomers.length} shown</span>
            </div>
            <p>Search, filter and manage customer information.</p>
          </div>
          <button className="primary-btn add-btn" onClick={() => setShowAdd(true)}>
            <span>+</span> Add customer
          </button>
        </div>

        {success && (
          <div className="success" role="status">
            <span className="success-icon">✓</span>
            <span>{success}</span>
            <button onClick={() => setSuccess("")} aria-label="Dismiss notification">×</button>
          </div>
        )}

        <div className="filters">
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              className="search"
              type="search"
              aria-label="Search customers"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")} aria-label="Clear customer search">
                ×
              </button>
            )}
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter customers by status">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="table-person">
                      <div className="mini-avatar">{getInitials(customer.name)}</div>
                      <strong className="truncate" title={customer.name || "Unnamed customer"}>
                        {customer.name || "Unnamed customer"}
                      </strong>
                    </div>
                  </td>
                  <td className="truncate" title={customer.email || "Not provided"}>
                    {customer.email || "Not provided"}
                  </td>
                  <td>{customer.phone || "Not provided"}</td>
                  <td><StatusBadge status={customer.status || "Inactive"} /></td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View details <span aria-hidden="true">→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <EmptyState
              title="No customers found"
              message="Try another search or status filter."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setStatus("All");
              }}
            />
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
          existingCustomers={customerList}
          onClose={() => setShowAdd(false)}
          onAdd={addCustomer}
        />
      )}
    </main>
  );
}

function CustomerModal({ customer, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">CUSTOMER PROFILE</p>
            <h3 id="customer-details-title">Customer details</h3>
          </div>
          <button className="close" onClick={onClose} aria-label="Close customer details">×</button>
        </div>

        <div className="profile-header">
          <div className="profile-avatar">{getInitials(customer.name)}</div>
          <div>
            <h4>{customer.name || "Unnamed customer"}</h4>
            <StatusBadge status={customer.status || "Inactive"} />
          </div>
        </div>

        <div className="details">
          <DetailRow label="Email" value={customer.email || "Not provided"} />
          <DetailRow label="Phone" value={customer.phone || "Not provided"} />
          <DetailRow label="Customer ID" value={`#${customer.id || "—"}`} />
        </div>

        <button className="secondary-btn full" onClick={onClose}>Close details</button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong title={value}>{value}</strong>
    </div>
  );
}

function AddCustomerModal({ existingCustomers, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active"
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, submitting]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!name || !email || !phone) {
      setError("Please complete all required fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number should contain exactly 10 digits.");
      return;
    }

    const duplicate = existingCustomers.some(
      (customer) => String(customer?.email || "").toLowerCase() === email
    );

    if (duplicate) {
      setError("A customer with this email already exists.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      onAdd({ name, email, phone, status: form.status });
    }, 250);
  };

  return (
    <div className="modal-backdrop" onMouseDown={() => !submitting && onClose()}>
      <form
        className="modal"
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-customer-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW RECORD</p>
            <h3 id="add-customer-title">Add customer</h3>
          </div>
          <button
            type="button"
            className="close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close add customer form"
          >
            ×
          </button>
        </div>

        <p className="modal-intro">Add a customer to the local demo directory.</p>

        <label htmlFor="customer-name">Name <span>*</span></label>
        <input
          id="customer-name"
          value={form.name}
          maxLength={80}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Customer name"
          autoFocus
          required
        />

        <label htmlFor="customer-email">Email <span>*</span></label>
        <input
          id="customer-email"
          type="email"
          value={form.email}
          maxLength={120}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="customer@email.com"
          required
        />

        <label htmlFor="customer-phone">Phone <span>*</span></label>
        <input
          id="customer-phone"
          inputMode="numeric"
          value={form.phone}
          maxLength={10}
          onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, ""))}
          placeholder="10 digit phone number"
          required
        />

        <label htmlFor="customer-status">Status</label>
        <select
          id="customer-status"
          value={form.status}
          onChange={(event) => updateField("status", event.target.value)}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button
            className="secondary-btn"
            type="button"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? <><span className="button-spinner" /> Adding...</> : "Add customer"}
          </button>
        </div>
      </form>
    </div>
  );
}

function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty">
      <div className="empty-icon" aria-hidden="true">⌕</div>
      <strong>{title}</strong>
      <span>{message}</span>
      {onAction && (
        <button className="text-btn" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}

function getInitials(name = "") {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
