# Day-3 Testing Checklist

## Core workflows
- [ ] Login with valid email and non-empty password.
- [ ] Login with empty fields.
- [ ] Login with invalid email.
- [ ] Navigate Dashboard -> Customers.
- [ ] Navigate Customers -> Dashboard.
- [ ] Change dashboard period.
- [ ] Search service requests.
- [ ] Filter service requests by status.
- [ ] Sort service requests.
- [ ] Search customers.
- [ ] Filter customers by status.
- [ ] Add a customer with valid details.
- [ ] Confirm the new customer appears immediately.
- [ ] Search/filter the newly added customer.
- [ ] Open customer details.
- [ ] Close customer details.
- [ ] Log out and confirm return to Login.

## Edge cases
- [ ] Add customer with empty required fields.
- [ ] Add customer with invalid email.
- [ ] Add customer with invalid phone.
- [ ] Add customer with duplicate email.
- [ ] Submit Add Customer repeatedly while saving.
- [ ] Close Add Customer without submitting.
- [ ] Search for a non-existent customer.
- [ ] Search for a non-existent service request.
- [ ] Apply filters that return no results.
- [ ] Test long customer name/email/phone values.
- [ ] Verify missing optional values do not break the UI.

## Responsive/accessibility
- [ ] Desktop viewport.
- [ ] Tablet viewport.
- [ ] Mobile viewport.
- [ ] Sidebar toggle.
- [ ] Modal Escape key.
- [ ] Keyboard focus states.
- [ ] Readable table overflow.
- [ ] Reduced-motion behavior.

## Result
Core workflows are implemented in the Day-3 build. Run `npm run build` before final submission and record any environment-specific issues here.
