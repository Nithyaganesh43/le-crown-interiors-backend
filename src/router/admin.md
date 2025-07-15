# Admin API Documentation

All admin endpoints are protected and require a valid admin JWT cookie (`authToken`) with a user object containing `role: "admin"`.

**Base URL:** `https://le-crown-interiors-backend.onrender.com`

---

## Admin Login

Authenticate as an admin to access protected endpoints. On successful login, a secure `authToken` cookie is set in the browser.

- **Endpoint:** `/auth/login`
- **Method:** GET
- **Description:** Authenticate as admin. Returns a JWT cookie if credentials are valid.
- **Request Query Parameters:**
  - `username` (required, string): Admin username
  - `password` (required, string): Admin password

### Example Request
```http
GET /auth/login?username=adminUser&password=SuperSecretPassword123
```

### Success Response
- **Status:** 200 OK
- **Set-Cookie:** `authToken=<JWT>; HttpOnly; Secure; SameSite=None`
- **Body:**
```json
{
  "status": true,
  "message": "Login successful"
}
```

### Error Responses
- **Invalid Credentials:**
  - **Status:** 401 Unauthorized
  - **Body:**
    ```json
    {
      "status": false,
      "message": "Invalid username or password"
    }
    ```
- **Missing Fields:**
  - **Status:** 500 Internal Server Error
  - **Body:**
    ```json
    {
      "status": false,
      "message": "Authentication failed"
    }
    ```
- **Server Error:**
  - **Status:** 500 Internal Server Error
  - **Body:**
    ```json
    {
      "status": false,
      "message": "Authentication failed"
    }
    ```

### Cookie Handling
- The `authToken` cookie is required for all subsequent admin requests.
- The cookie is `HttpOnly`, `Secure`, and `SameSite=None` for security.
- Include the cookie in your requests to access protected endpoints.

---

## 1. Get All Users

- **Endpoint:** `/admin/users`
- **Method:** GET
- **Description:** Retrieve all users. Supports filtering by registration date and phone number.
- **Query Parameters:**
  - `from` (optional, ISO date): Start date for registration filter
  - `to` (optional, ISO date): End date for registration filter
  - `phoneNumber` (optional, string): Filter by phone number
- **Response:** Array of user objects

**User Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3b456",
  "fingerprint": "string",
  "phoneNumber": "9876543210",
  "role": "user" | "admin",
  "createdAt": "2024-06-01T12:34:56.789Z",
  "updatedAt": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/users?from=2024-01-01&to=2024-06-01
Cookie: authToken=...;
```
**Example Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3b456",
    "fingerprint": "abc123",
    "phoneNumber": "9876543210",
    "role": "user",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z"
  },
  ...
]
```

---

## 2. Get All Estimation Orders

- **Endpoint:** `/admin/estimation-orders`
- **Method:** GET
- **Description:** Retrieve all estimation orders. Supports filtering by date and user email.
- **Query Parameters:**
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
  - `email` (optional, string): Filter by contact email
- **Response:** Array of estimation order objects

**Estimation Order Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3b789",
  "rooms": [
    {
      "type": "Bedroom",
      "length": "12",
      "width": "10",
      "height": "8"
    }
  ],
  "wood": "Teak",
  "hardware": "Premium",
  "workmanship": "High",
  "surfaceFinish": "Glossy",
  "deadline": "2024-07-01",
  "additional": ["Wardrobe", "False ceiling"],
  "contact": {
    "fullName": "John Doe",
    "phoneNumber": "9876543210",
    "email": "john@example.com",
    "address": "123 Main St"
  },
  "EstimationAmount": "150000",
  "createdAt": "2024-06-01T12:34:56.789Z",
  "updatedAt": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/estimation-orders?email=john@example.com
Cookie: authToken=...;
```
**Example Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3b789",
    "rooms": [
      {
        "type": "Bedroom",
        "length": "12",
        "width": "10",
        "height": "8"
      }
    ],
    "wood": "Teak",
    "hardware": "Premium",
    "workmanship": "High",
    "surfaceFinish": "Glossy",
    "deadline": "2024-07-01",
    "additional": ["Wardrobe", "False ceiling"],
    "contact": {
      "fullName": "John Doe",
      "phoneNumber": "9876543210",
      "email": "john@example.com",
      "address": "123 Main St"
    },
    "EstimationAmount": "150000",
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z"
  }
]
```

---

## 3. Get All Users' Chat History

- **Endpoint:** `/admin/chats`
- **Method:** GET
- **Description:** Retrieve all users' chat histories. Supports filtering by user and message time.
- **Query Parameters:**
  - `user` (optional, string): User identifier (phone number or unique user string)
  - `from` (optional, ISO date): Start date for chat messages
  - `to` (optional, ISO date): End date for chat messages
- **Response:** Array of chat objects

**Chat Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3b999",
  "user": "9876543210",
  "chat": [
    {
      "sender": "user" | "bot",
      "message": "Hello!",
      "time": "2024-06-01T12:34:56.789Z"
    }
  ],
  "createdAt": "2024-06-01T12:34:56.789Z",
  "updatedAt": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/chats?user=9876543210
Cookie: authToken=...;
```
**Example Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3b999",
    "user": "9876543210",
    "chat": [
      {
        "sender": "user",
        "message": "Hello!",
        "time": "2024-06-01T12:34:56.789Z"
      },
      {
        "sender": "bot",
        "message": "Hi! How can I help you?",
        "time": "2024-06-01T12:34:57.000Z"
      }
    ],
    "createdAt": "2024-06-01T12:34:56.789Z",
    "updatedAt": "2024-06-01T12:34:56.789Z"
  }
]
```

---

## 4. Get All Subscriptions

- **Endpoint:** `/admin/subscriptions`
- **Method:** GET
- **Description:** Retrieve all newsletter/email subscriptions. Supports filtering by date and email.
- **Query Parameters:**
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
  - `email` (optional, string): Filter by email
- **Response:** Array of subscription objects

**Subscription Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3babc",
  "email": "user@example.com",
  "at": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/subscriptions?from=2024-01-01
Cookie: authToken=...;
```
**Example Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3babc",
    "email": "user@example.com",
    "at": "2024-06-01T12:34:56.789Z"
  }
]
```

---

## 5. Get All Contact Information

- **Endpoint:** `/admin/contacts`
- **Method:** GET
- **Description:** Retrieve all contact form submissions. Supports filtering by date and phone number.
- **Query Parameters:**
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
  - `phoneNumber` (optional, string): Filter by phone number
- **Response:** Array of contact objects

**Contact Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3bdef",
  "name": "Jane Doe",
  "phoneNumber": "9876543210",
  "help": "Need a quote",
  "discription": "Looking for modular kitchen options",
  "at": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/contacts?phoneNumber=9876543210
Cookie: authToken=...;
```
**Example Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3bdef",
    "name": "Jane Doe",
    "phoneNumber": "9876543210",
    "help": "Need a quote",
    "discription": "Looking for modular kitchen options",
    "at": "2024-06-01T12:34:56.789Z"
  }
]
```

---

## 6. Analytics: User Registrations Over Time

- **Endpoint:** `/admin/analytics/users-vs-time`
- **Method:** GET
- **Description:** Get user registration counts grouped by day or month (for graphing).
- **Query Parameters:**
  - `interval` (optional, string): `day` (default) or `month`
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
- **Response:** Array of objects: `{ _id: 'YYYY-MM-DD' or 'YYYY-MM', count: Number }`

**Example Request:**
```http
GET /admin/analytics/users-vs-time?interval=month
Cookie: authToken=...;
```
**Example Response:**
```json
[
  { "_id": "2024-06", "count": 12 },
  { "_id": "2024-07", "count": 8 }
]
```

---

## 7. Analytics: Estimation Orders Over Time

- **Endpoint:** `/admin/analytics/estimation-orders-vs-time`
- **Method:** GET
- **Description:** Get estimation order counts grouped by day or month (for graphing).
- **Query Parameters:**
  - `interval` (optional, string): `day` (default) or `month`
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
- **Response:** Array of objects: `{ _id: 'YYYY-MM-DD' or 'YYYY-MM', count: Number }`

**Example Request:**
```http
GET /admin/analytics/estimation-orders-vs-time?interval=day
Cookie: authToken=...;
```
**Example Response:**
```json
[
  { "_id": "2024-06-01", "count": 3 },
  { "_id": "2024-06-02", "count": 5 }
]
```

---

## 8. Analytics: Subscriptions Over Time

- **Endpoint:** `/admin/analytics/subscriptions-vs-time`
- **Method:** GET
- **Description:** Get subscription counts grouped by day or month (for graphing).
- **Query Parameters:**
  - `interval` (optional, string): `day` (default) or `month`
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
- **Response:** Array of objects: `{ _id: 'YYYY-MM-DD' or 'YYYY-MM', count: Number }`

**Example Request:**
```http
GET /admin/analytics/subscriptions-vs-time?interval=month
Cookie: authToken=...;
```
**Example Response:**
```json
[
  { "_id": "2024-06", "count": 7 },
  { "_id": "2024-07", "count": 2 }
]
```

---

## 9. Analytics: Contacts Over Time

- **Endpoint:** `/admin/analytics/contacts-vs-time`
- **Method:** GET
- **Description:** Get contact submission counts grouped by day or month (for graphing).
- **Query Parameters:**
  - `interval` (optional, string): `day` (default) or `month`
  - `from` (optional, ISO date): Start date
  - `to` (optional, ISO date): End date
- **Response:** Array of objects: `{ _id: 'YYYY-MM-DD' or 'YYYY-MM', count: Number }`

**Example Request:**
```http
GET /admin/analytics/contacts-vs-time?interval=day
Cookie: authToken=...;
```
**Example Response:**
```json
[
  { "_id": "2024-06-01", "count": 1 },
  { "_id": "2024-06-02", "count": 4 }
]
```

---

## Notes
- All date filters expect ISO date strings (e.g., `2024-06-01`).
- All responses are JSON.
- All endpoints are GET and read-only (no mutation).
- For graphing, use the analytics endpoints which return counts grouped by day or month.
- All fields not shown in examples are standard MongoDB document fields. 