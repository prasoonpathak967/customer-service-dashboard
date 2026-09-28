# Customer Service Dashboard

A simple Day-1 frontend task built with React and Vite.

## Features

- Login screen with basic validation
- Dashboard with sidebar and header
- Four summary cards
- Recent service requests table
- Customer list
- Search customers
- Filter customers by status
- Add customer
- View customer details in a modal
- Mock data only
- No backend or API required

## How to run

### 1. Open the project

Open this folder in VS Code.

### 2. Install dependencies

Open the VS Code terminal and run:

```bash
npm install
```

### 3. Start the project

```bash
npm run dev
```

Then open the local URL shown by Vite, normally:

http://localhost:5173

## Login

There is no backend login.

Use any valid email and a password with at least 6 characters.

Example:

Email: admin@example.com
Password: 123456

## Project structure

src/
- components are kept inside the main file for this small Day-1 version
- data/mockData.js contains the mock customers and service requests
- main.jsx contains the application screens and logic
- styles.css contains the UI styling

This version intentionally keeps the code simple because the Day-1 requirement focuses on the basic structure and major screens.
