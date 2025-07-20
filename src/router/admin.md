# Admin Dashboard Build Prompt for Le Crown Interiors

Build a comprehensive admin dashboard for Le Crown Interiors with the following specifications:

## Core Requirements

### 1. Primary Focus: Estimations Management
- **Estimation Orders should be the main dashboard feature** with prominent placement
- Display estimation cards with key details: customer name, contact, estimation amount, deadline, room types
- Show estimation statistics: total orders, total value, average order value
- Enable detailed view for each estimation with all specifications (wood type, hardware, workmanship, surface finish, additional requirements)
- Export functionality for estimation data (CSV format)
- Handle empty states gracefully when no estimations exist

### 2. Authentication System
- Login page with username/password fields (DONT SHOW ANY default: username: , password: )
- Store JWT token securely using sessionStorage
- Handle all auth error cases: missing fields, invalid credentials, token expiry, missing headers
- Auto-redirect to login on 401/403 errors
- Clean logout functionality with token cleanup

### 3. Dashboard Sections (in priority order):
1. **Estimations** (Primary - 40% of focus)
2. **Users Management** (25% of focus) 
3. **Contact Queries** (20% of focus)
4. **Subscriptions** (15% of focus)

## Design Requirements

### Visual Design
- **Clean, modern, professional theme** - use a business-appropriate color scheme (blues, grays, whites)
- **NO rounded borders anywhere** - use sharp, clean rectangular edges
- Simple typography: Use system fonts like Inter, Roboto, or similar clean sans-serif
- Minimal shadows and effects - focus on clean lines and good contrast
- Use data tables with zebra striping for better readability
- Cards layout for summary statistics
- Consistent spacing and alignment throughout

### Layout & Navigation
- Side navigation bar with clear icons and labels
- Top header with user info and logout button
- Breadcrumb navigation for deep sections
- Search functionality in each section
- Pagination for large datasets (handle 0 to any number of records)
- Loading states and empty states with clear messaging

## Technical Requirements

### Responsive Design
- **Mobile-first approach** - must work perfectly on phones (320px and up)
- Tablet optimization (768px and up)
- Desktop optimization (1024px and up)
- Collapsible sidebar on mobile
- Touch-friendly buttons and interactions
- Horizontal scroll for tables on mobile if needed

### Auto-scaling & Performance
- Handle datasets from 0 records to thousands efficiently
- Implement client-side pagination and sorting
- Lazy loading for heavy components
- Debounced search inputs
- Efficient state management
- Configurable page sizes (10, 25, 50, 100 items)

### Data Management
- Real-time filtering without page reloads
- Sort functionality for all table columns
- Search across multiple fields simultaneously
- Export data functionality (CSV download)
- Handle empty arrays gracefully with proper messaging

## API Integration Details

**Base URL:** `https://le-crown-interiors-backend.onrender.com/admin`
**Authentication:** Bearer Token in Authorization header

### Authentication Flow
```javascript
// Login
POST /login
Body: { "username": "username", "password": "ADMIN'Spassword" }
Response: { "status": true, "message": "Login successful", "token": "<JWT_TOKEN>" }

// Use token in all subsequent requests
Headers: { "Authorization": "Bearer <token>" }
```

### API Endpoints:
1. **POST /login** - Authentication
2. **GET /getAllEstimationOrders** - All estimation orders
3. **GET /getAllUsers** - All verified users  
4. **GET /getAllContacts** - All contact form submissions
5. **GET /getAllSubscriptions** - All email subscriptions

### Error Handling Requirements
Handle these specific error responses:

**Authentication Errors:**
- `{ "status": false, "message": "Username and password are required" }` (400)
- `{ "status": false, "message": "Invalid username or password" }` (401)
- `{ "status": false, "message": "Authorization header missing or invalid" }` (401)
- `{ "status": false, "message": "Token missing" }` (401)
- `{ "status": false, "message": "Invalid or expired token" }` (401)
- `{ "status": false, "message": "Admin access required" }` (403)

**Data Fetch Errors:**
- `{ "error": "Failed to fetch estimation orders" }` (500)
- `{ "error": "Failed to fetch users" }` (500)
- `{ "error": "Failed to fetch contacts" }` (500)
- `{ "error": "Failed to fetch subscriptions" }` (500)

## Feature Specifications

### Dashboard Overview Page
- Key metrics cards: Total Estimations, Total Estimation Value, Total Users, Total Contacts
- Recent estimations preview (latest 5-10)
- Quick statistics with proper handling for zero values
- Charts showing data trends (handle empty data gracefully)

### Estimation Orders Page (Most Important)
- **Prominent display of estimation cards/table**
- Each estimation shows:
  - Customer details: `contact.fullName`, `contact.phoneNumber`, `contact.email`, `contact.address`
  - **Estimation amount (prominently displayed)**: `EstimationAmount`
  - Room details: `rooms[]` with type, dimensions
  - Specifications: `wood`, `hardware`, `workmanship`, `surfaceFinish`
  - Additional services: `additional[]`
  - Deadline: `deadline`
  - Creation date: `createdAt`
- Search across customer name, email, phone
- Sort by amount, date, customer name
- Export to CSV functionality

### Users Management
- Display all verified users from `getAllUsers`
- Show: phone number, role, registration date
- Search by phone number
- User count statistics
- Handle cases where user list is empty

### Contact Queries
- Display all contact submissions from `getAllContacts`
- Show: `name`, `phoneNumber`, `help`, `description`, submission date (`at`)
- Search by name or phone number
- Priority indicators for urgent queries
- Export functionality

### Subscriptions Management
- Display all email subscriptions from `getAllSubscriptions`
- Show: `email`, subscription date (`at`)
- Search by email
- Export subscriber list
- Subscription growth metrics

## Data Structure Examples

### Estimation Order Object:
```javascript
{
  "_id": "orderid",
  "rooms": [
    { "type": "bedroom", "length": "12", "width": "14", "height": "10" }
  ],
  "wood": "Teak",
  "hardware": "Hettich", 
  "workmanship": "Premium",
  "surfaceFinish": "Laminate",
  "deadline": "30 days",
  "additional": ["Loft", "Modular Kitchen"],
  "contact": {
    "fullName": "Arun",
    "phoneNumber": "9876543210", 
    "email": "arun@example.com",
    "address": "Coimbatore"
  },
  "EstimationAmount": "1,50,000",
  "createdAt": "2025-07-18T08:15:00.000Z"
}
```

### User Object:
```javascript
{
  "_id": "123...",
  "fingerprint": "abc123",
  "phoneNumber": "+91XXXXXXXXXX", 
  "role": "user",
  "createdAt": "2024-07-10T12:00:00.000Z",
  "updatedAt": "2024-07-10T12:00:00.000Z"
}
```

## Error Handling & UX
- **Comprehensive token management**: Handle all auth error scenarios
- Graceful error messages for API failures
- Retry mechanisms for failed requests
- Loading skeletons while data fetches
- **Empty state handling**: Proper messages when arrays are empty (0 records)
- Confirmation dialogs for destructive actions
- Toast notifications for successful actions
- Offline state indicators
- Auto-logout on token expiry with redirect to login

## Build Instructions
- Use React with TypeScript for better code quality
- Implement proper TypeScript interfaces for all API responses
- Use a state management solution (Redux Toolkit or Zustand)
- Include proper error boundaries
- Use modern CSS (Flexbox/Grid) or Tailwind CSS
- Ensure all components handle empty arrays (length 0)
- Add proper loading states for all async operations
- Implement proper token storage and cleanup
- Add comprehensive error handling for all API scenarios

## Critical Implementation Notes
1. **Handle variable data volumes**: APIs return 0 to any number of records
2. **Token security**: Store in sessionStorage, clear on logout/error
3. **Error resilience**: Handle all specified error cases gracefully  
4. **Empty states**: Show meaningful messages when no data exists
5. **Mobile optimization**: Ensure touch-friendly interactions
6. **Performance**: Efficient rendering for large datasets

## Expected Output
A fully functional, bug-free admin dashboard that prioritizes estimation management while providing comprehensive business oversight tools. The interface should feel professional, handle all error scenarios gracefully, work with any volume of data (0 to thousands), and be intuitive across all device types.

Admin API Documentation
Base URL: https://le-crown-interiors-backend.onrender.com/admin
Auth Type: Bearer Token (Authorization: Bearer <token>)

🔐 1. Admin Login
POST /login
Used to generate admin JWT token.

Request Body:


{
  "username": "admin",
  "password": "admin@123"
}
Validations:

username and password must be non-empty strings.

Returns 400 if missing.

Returns 401 if credentials are invalid.

Success Response:


{
  "status": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
Failure Responses:

Missing fields:


{ "status": false, "message": "Username and password are required" }
Wrong credentials:


{ "status": false, "message": "Invalid username or password" }
🔐 Token Usage & Validation
Use the returned token in all protected APIs via the Authorization header:


Authorization: Bearer <token>
Failure Responses (Common for all endpoints below):

Missing header:


{ "status": false, "message": "Authorization header missing or invalid" }
Token missing:


{ "status": false, "message": "Token missing" }
Token invalid/expired:


{ "status": false, "message": "Invalid or expired token" }
Wrong credentials inside token:


{ "status": false, "message": "Admin access required" }
👥 2. Get All Verified Users
GET /getAllUsers
Returns all registered verified users (sorted by latest).

Success Response:


[
  {
    "_id": "123...",
    "fingerprint": "abc123",
    "phoneNumber": "+91XXXXXXXXXX",
    "role": "user",
    "createdAt": "2024-07-10T12:00:00.000Z",
    "updatedAt": "2024-07-10T12:00:00.000Z",
    "__v": 0
  },
  ...
]
Failure (DB error):


{ "error": "Failed to fetch users" }
📦 3. Get All Estimation Orders
GET /getAllEstimationOrders
Returns all submitted estimation orders.

Success Response Example:


[
  {
    "_id": "orderid",
    "rooms": [
      { "type": "bedroom", "length": "12", "width": "14", "height": "10" }
    ],
    "wood": "Teak",
    "hardware": "Hettich",
    "workmanship": "Premium",
    "surfaceFinish": "Laminate",
    "deadline": "30 days",
    "additional": ["Loft", "Modular Kitchen"],
    "contact": {
      "fullName": "Arun",
      "phoneNumber": "9876543210",
      "email": "arun@example.com",
      "address": "Coimbatore"
    },
    "EstimationAmount": "1,50,000",
    "createdAt": "2025-07-18T08:15:00.000Z"
  }
]
Failure:


{ "error": "Failed to fetch estimation orders" }
📧 4. Get All Subscriptions
GET /getAllSubscriptions
Returns all subscribed emails with timestamp.

Success Response:


[
  {
    "_id": "subid",
    "email": "user@example.com",
    "at": "2025-07-18T10:00:00.000Z"
  }
]
Failure:


{ "error": "Failed to fetch subscriptions" }
📞 5. Get All Contact Queries
GET /getAllContacts
Returns all help/queries submitted via contact form.

Success Response:


[
  {
    "_id": "contactid",
    "name": "Vishnu",
    "phoneNumber": "9876543210",
    "help": "Need quotation",
    "discription": "Looking for interior work in 2BHK flat",
    "at": "2025-07-18T10:30:00.000Z"
  }
]
Failure:


{ "error": "Failed to fetch contacts" }
✅ Example Token Flow
Step 1: Call /login with correct admin credentials.
Step 2: Store the token from response.
Step 3: Add token to headers for further admin routes:


Authorization: Bearer <token>
Edge Cases to Handle in Frontend:

Token expiry → handle 401 and force logout

Server down → handle 500

Missing Authorization header → handle 401

Malformed token → handle 401

Incorrect role inside token → 403