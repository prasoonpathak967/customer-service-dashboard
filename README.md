# ServiceDesk Customer Dashboard — Day 3

A polished React + Vite frontend prototype for managing service requests and customers. This version builds on the Day-2 workflow and focuses on a modern, professional UI, responsive behavior, clear feedback, accessibility, validation, and stable mock-data workflows.

## What is included

### Authentication
- Demo login screen with required-field validation.
- Email format validation.
- Logout returns to the login screen.
- No real authentication or backend is used.

### Dashboard
- Today / This Week / This Month period filter.
- Summary cards with a consistent visual system.
- Service-request search.
- Status filtering.
- Customer A-Z / newest sorting.
- Clear-filter and no-results states.
- Loading feedback when the period changes.

### Customers
- Customer search by name, email, or phone.
- Active / Inactive filtering.
- Add Customer modal.
- Required-field, email, and 10-digit phone validation.
- Duplicate email prevention.
- Submit protection and button loading feedback.
- Success notification after creation.
- Customer details modal.
- Newly added customers immediately appear in the list and can be searched/filtered.

### UI/UX
- Clean blue professional color palette.
- Consistent typography, spacing, buttons, cards, tables, badges, and forms.
- Hover and focus states.
- Responsive sidebar for desktop/tablet/mobile.
- Responsive filters and horizontally scrollable tables.
- Modal overlay, Escape-key closing, and click-outside closing.
- Graceful empty/missing-field display.
- Reduced-motion support for accessibility.
- No additional UI library or backend dependency was introduced.

## Technologies

- React 18
- Vite
- JavaScript / JSX
- CSS
- Mock data only

## Run locally

Requirements:
- Node.js 18+ recommended
- VS Code

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Demo login

This is a frontend-only demo. Any valid email address and any non-empty password will sign in.

Example:

```text
Email: admin@example.com
Password: demo123
```

## Folder structure

```text
customer-service-dashboard-day3/
├── index.html
├── package.json
├── README.md
└── src/
    ├── data/
    │   └── mockData.js
    ├── main.jsx
    └── styles.css
```

### Mock data management

All starting customer, service-request, and dashboard summary data lives in:

```text
src/data/mockData.js
```

The UI reads this data and keeps newly added customers in React state for the current browser session. No API, database, or backend integration is required.

## Testing checklist

### Login
- [x] Empty email/password shows validation.
- [x] Invalid email format shows validation.
- [x] Valid email + non-empty password opens the application.
- [x] Logout returns to login.

### Navigation
- [x] Dashboard opens from the sidebar.
- [x] Customers opens from the sidebar.
- [x] Sidebar collapses on desktop.
- [x] Sidebar becomes an overlay on smaller screens.

### Dashboard
- [x] Period selector updates summary cards.
- [x] Loading feedback appears during period change.
- [x] Request search works.
- [x] Status filter works.
- [x] Sorting works.
- [x] No-results state is handled.
- [x] Clear filters action works.

### Customers
- [x] Search by name, email, and phone.
- [x] Status filter works.
- [x] Add customer modal opens/closes.
- [x] Required fields are validated.
- [x] Invalid email is rejected.
- [x] Invalid phone length is rejected.
- [x] Duplicate email is rejected.
- [x] Submit button prevents repeated submission while saving.
- [x] Successful creation shows feedback.
- [x] New customer appears immediately.
- [x] New customer can be searched and filtered.
- [x] Customer details modal displays information.
- [x] Missing optional values display safely.

### Responsive/accessibility
- [x] Desktop layout checked through responsive CSS breakpoints.
- [x] Tablet layout uses a compact card/table presentation.
- [x] Mobile navigation uses an overlay drawer.
- [x] Inputs and buttons have visible focus states.
- [x] Forms use meaningful labels.
- [x] Modal supports Escape to close.
- [x] Reduced-motion preference is respected.
- [x] Long text is truncated where required to protect the layout.

## Known limitations

- Authentication is mock-only and does not verify a real account.
- Data is held in React state, so newly added customers reset after a full page refresh.
- Dashboard statistics are predefined mock values rather than calculated from a backend.
- Service requests are read-only in this version.
- No backend/API/database integration is included by design.

## Final review

The project is intentionally kept dependency-light and easy to run in VS Code. The focus is stable core functionality, a polished interface, reusable UI patterns, validation, responsive behavior, and clear handover documentation.
