# Customer Service Dashboard - Day 2

A simple React + Vite frontend prototype using mock data only.

## Day-2 features

- Login validation for email and required password
- Dashboard summary cards with Today / This Week / This Month data
- Dashboard service request search, status filter and sorting
- Empty state for no service request results
- Customer search by name, email or phone
- Customer status filter
- Add Customer modal with validation
- Customer details modal
- Successful customer creation message
- Loading state when dashboard period changes
- Reusable components for cards, status badges, sidebar, header and modals
- Responsive sidebar and horizontally scrollable tables
- Logout action
- No backend or API

## Run locally

1. Open this folder in VS Code.
2. Open the terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the URL shown by Vite, normally `http://localhost:5173`.

## Login

There is no real authentication.

Use any valid email, for example:

`admin@example.com`

and any non-empty password.

## Folder structure

```text
src/
  data/
    mockData.js
  main.jsx
  styles.css
```

Mock data is kept separately from the UI code.
