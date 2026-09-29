export const customers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", status: "Active" },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com", phone: "9876543211", status: "Inactive" },
  { id: 3, name: "Amit Kumar", email: "amit@gmail.com", phone: "9876543212", status: "Active" },
  { id: 4, name: "Neha Verma", email: "neha@gmail.com", phone: "9876543213", status: "Active" },
  { id: 5, name: "Rohit Gupta", email: "rohit@gmail.com", phone: "9876543214", status: "Inactive" }
];

export const serviceRequests = [
  { id: 1, customer: "Rahul Sharma", service: "Website Development", status: "Pending", date: "28 Sep 2026" },
  { id: 2, customer: "Priya Singh", service: "Consultation", status: "Completed", date: "27 Sep 2026" },
  { id: 3, customer: "Amit Kumar", service: "Technical Support", status: "Pending", date: "26 Sep 2026" },
  { id: 4, customer: "Neha Verma", service: "Service Renewal", status: "Completed", date: "25 Sep 2026" }
];

export const dashboardStats = {
  Today: [
    { title: "Total Customers", value: 120 },
    { title: "Active Services", value: 85 },
    { title: "Pending Requests", value: 12 },
    { title: "Revenue", value: "₹45,000" }
  ],
  "This Week": [
    { title: "Total Customers", value: 134 },
    { title: "Active Services", value: 91 },
    { title: "Pending Requests", value: 18 },
    { title: "Revenue", value: "₹58,500" }
  ],
  "This Month": [
    { title: "Total Customers", value: 158 },
    { title: "Active Services", value: 106 },
    { title: "Pending Requests", value: 24 },
    { title: "Revenue", value: "₹72,000" }
  ]
};
