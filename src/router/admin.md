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
GET /auth/login 
body { 
    "username": "admin username",
    "password": "admin password"
} 
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
  - `from` (optional, ISO date): Start date for registration filter (e.g., `2024-01-01`)
  - `to` (optional, ISO date): End date for registration filter (e.g., `2024-06-01`)
  - `phoneNumber` (optional, string): Filter by phone number (e.g., `9876543210`)
- **Response:** Array of user objects

**User Object Structure:**
```json
{
  "_id": "665f1c2e8b1e2a0012a3b456",
  "fingerprint": "abc123def456",
  "phoneNumber": "9876543210",
  "role": "user",
  "createdAt": "2024-06-01T12:34:56.789Z",
  "updatedAt": "2024-06-01T12:34:56.789Z"
}
```

**Example Request:**
```http
GET /admin/users 
Cookie: authToken= '';
```

**Example Success Response:**
```json
[
  {
    "_id": "665f1c2e8b1e2a0012a3b456", 
    "phoneNumber": "9876543210",
    "role": "user",
    "createdAt": "2024-06-01T12:34:56.789Z", 
  },
  {
    "_id": "665f1c2e8b1e2a0012a3b457", 
    "phoneNumber": "9123456789",
    "role": "admin",
    "createdAt": "2024-05-15T09:20:30.123Z", 
  }
]
```

**Example Error Responses:**
- **Not Authenticated:**
  - **Status:** 401 Unauthorized
  - **Body:**
    ```json
    { "error": "Failed to fetch users" }
    ```
- **Server Error:**
  - **Status:** 500 Internal Server Error
  - **Body:**
    ```json
    { "error": "Failed to fetch users" }
    ```

**Handling Tips:**
- Always include a valid `authToken` cookie in your request.
- Use ISO date strings for `from` and `to` parameters.
- Filter by phone number for more targeted results.

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
[
    {
        "_id": "68694c55f3f8aeb5c5a36293",
        "rooms": [
            {
                "type": "Kitchen",
                "length": "12",
                "width": "12",
                "height": "12",
                "_id": "68694c55f3f8aeb5c5a36294"
            }
        ],
        "wood": "Plywood",
        "hardware": "Basic Hardware",
        "workmanship": "Standard workmanship",
        "surfaceFinish": "Paint Finish",
        "deadline": "flexible",
        "additional": [
            "accessories",
            "lighting"
        ],
        "contact": {
            "fullName": "Fhfj",
            "phoneNumber": "122115585",
            "email": "jjj@gmail.com",
            "address": "Jjjiij",
            "_id": "68694c55f3f8aeb5c5a36295"
        },
        "EstimationAmount": "68960",
        "createdAt": "2025-07-05T16:01:25.572Z",
        "updatedAt": "2025-07-05T16:01:25.572Z",
        "__v": 0
    },
    {
        "_id": "68694587f3f8aeb5c5a36289",
        "rooms": [
            {
                "type": "Living Room",
                "length": "12",
                "width": "12",
                "height": "12",
                "_id": "68694587f3f8aeb5c5a3628a"
            }
        ],
        "wood": "MDF",
        "hardware": "Basic Hardware",
        "workmanship": "Standard workmanship",
        "surfaceFinish": "Paint Finish",
        "deadline": "2025-10-03",
        "additional": [],
        "contact": {
            "fullName": "Mohammed Safil",
            "phoneNumber": "09789378657",
            "email": "mohammedsafil.s2023cse@sece.ac.in",
            "address": "ukkadam",
            "_id": "68694587f3f8aeb5c5a3628b"
        },
        "EstimationAmount": "42320",
        "createdAt": "2025-07-05T15:32:23.727Z",
        "updatedAt": "2025-07-05T15:32:23.727Z",
        "__v": 0
    },
    {
        "_id": "68694550f3f8aeb5c5a36285",
        "rooms": [
            {
                "type": "Living Room",
                "length": "12",
                "width": "12",
                "height": "12",
                "_id": "68694550f3f8aeb5c5a36286"
            }
        ],
        "wood": "Plywood",
        "hardware": "Basic Hardware",
        "workmanship": "Standard workmanship",
        "surfaceFinish": "Paint Finish",
        "deadline": "2025-10-03",
        "additional": [
            "flooring"
        ],
        "contact": {
            "fullName": "Mohammed Safil",
            "phoneNumber": "09789378657",
            "email": "mohammedsafil.s2023cse@sece.ac.in",
            "address": "ukkadam",
            "_id": "68694550f3f8aeb5c5a36287"
        },
        "EstimationAmount": "46640",
        "createdAt": "2025-07-05T15:31:28.924Z",
        "updatedAt": "2025-07-05T15:31:28.924Z",
        "__v": 0
    },
    {
        "_id": "6867fce2f3f8aeb5c5a3627d",
        "rooms": [
            {
                "type": "Bedroom",
                "length": "12",
                "width": "10",
                "height": "8",
                "_id": "6867fce2f3f8aeb5c5a3627e"
            },
            {
                "type": "Living Room",
                "length": "15",
                "width": "12",
                "height": "9",
                "_id": "6867fce2f3f8aeb5c5a3627f"
            }
        ],
        "wood": "Teak",
        "hardware": "Brass fittings",
        "workmanship": "High quality manual craftsmanship",
        "surfaceFinish": "Glossy polish",
        "deadline": "2025-08-31",
        "additional": [
            "Include modular wardrobe",
            "False ceiling with lights"
        ],
        "contact": {
            "fullName": "John Doe",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "address": "123, Main Street, Coimbatore, Tamil Nadu",
            "_id": "6867fce2f3f8aeb5c5a36280"
        },
        "EstimationAmount": "125000",
        "createdAt": "2025-07-04T16:10:10.004Z",
        "updatedAt": "2025-07-04T16:10:10.004Z",
        "__v": 0
    },
    {
        "_id": "6867fcd8f3f8aeb5c5a36278",
        "rooms": [
            {
                "type": "Bedroom",
                "length": "12",
                "width": "10",
                "height": "8",
                "_id": "6867fcd8f3f8aeb5c5a36279"
            },
            {
                "type": "Living Room",
                "length": "15",
                "width": "12",
                "height": "9",
                "_id": "6867fcd8f3f8aeb5c5a3627a"
            }
        ],
        "wood": "Teak",
        "hardware": "Brass fittings",
        "workmanship": "High quality manual craftsmanship",
        "surfaceFinish": "Glossy polish",
        "deadline": "2025-08-31",
        "additional": [
            "Include modular wardrobe",
            "False ceiling with lights"
        ],
        "contact": {
            "fullName": "John Doe",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "address": "123, Main Street, Coimbatore, Tamil Nadu",
            "_id": "6867fcd8f3f8aeb5c5a3627b"
        },
        "EstimationAmount": "125000",
        "createdAt": "2025-07-04T16:10:00.488Z",
        "updatedAt": "2025-07-04T16:10:00.488Z",
        "__v": 0
    }
]
```

**Example Request:**
```http
GET /admin/estimation-orders?email=mohammedsafil.s2023cse@sece.ac.in
Cookie: authToken=...;
```
**Example Response:**
```json
[
    {
        "_id": "68694587f3f8aeb5c5a36289",
        "rooms": [
            {
                "type": "Living Room",
                "length": "12",
                "width": "12",
                "height": "12",
                "_id": "68694587f3f8aeb5c5a3628a"
            }
        ],
        "wood": "MDF",
        "hardware": "Basic Hardware",
        "workmanship": "Standard workmanship",
        "surfaceFinish": "Paint Finish",
        "deadline": "2025-10-03",
        "additional": [],
        "contact": {
            "fullName": "Mohammed Safil",
            "phoneNumber": "09789378657",
            "email": "mohammedsafil.s2023cse@sece.ac.in",
            "address": "ukkadam",
            "_id": "68694587f3f8aeb5c5a3628b"
        },
        "EstimationAmount": "42320",
        "createdAt": "2025-07-05T15:32:23.727Z",
        "updatedAt": "2025-07-05T15:32:23.727Z",
        "__v": 0
    },
    {
        "_id": "68694550f3f8aeb5c5a36285",
        "rooms": [
            {
                "type": "Living Room",
                "length": "12",
                "width": "12",
                "height": "12",
                "_id": "68694550f3f8aeb5c5a36286"
            }
        ],
        "wood": "Plywood",
        "hardware": "Basic Hardware",
        "workmanship": "Standard workmanship",
        "surfaceFinish": "Paint Finish",
        "deadline": "2025-10-03",
        "additional": [
            "flooring"
        ],
        "contact": {
            "fullName": "Mohammed Safil",
            "phoneNumber": "09789378657",
            "email": "mohammedsafil.s2023cse@sece.ac.in",
            "address": "ukkadam",
            "_id": "68694550f3f8aeb5c5a36287"
        },
        "EstimationAmount": "46640",
        "createdAt": "2025-07-05T15:31:28.924Z",
        "updatedAt": "2025-07-05T15:31:28.924Z",
        "__v": 0
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
[
    {
        "_id": "6867a70ce3463c6bbd254200",
        "user": "user",
        "chat": [
            {
                "sender": "user",
                "message": "hi",
                "time": "2025-07-04T10:03:59.158Z",
                "_id": "6867a70fe3463c6bbd254201"
            },
            {
                "sender": "bot",
                "message": "Hello! How can we assist you with luxury home design, modular kitchens, or custom furniture today?",
                "time": "2025-07-04T10:03:59.158Z",
                "_id": "6867a70fe3463c6bbd254202"
            },
            ...
        ],
        "createdAt": "2025-07-04T10:03:59.355Z",
        "updatedAt": "2025-07-04T10:03:59.355Z",
        "__v": 0
    },...
]
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
      },..
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
[
    {
        "_id": "685811e9aee909a624138eab",
        "email": "nithyaganesh4343@gmail.com",
        "at": "2025-06-22T14:23:37.373Z",
        "__v": 0
    },
    {
        "_id": "68580705aee909a624138e96",
        "email": "mohammedsafil.s2023cse@sece.ac.in",
        "at": "2025-06-22T13:37:09.206Z",
        "__v": 0
    }
]
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
    "at": "2024-01-01T12:34:56.789Z"
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
[
    {
        "_id": "685814793e46b00eaf33950e",
        "name": "Nithya Ganesh",
        "phoneNumber": "6297339610",
        "help": "Nothing",
        "discription": " NothingNothing",
        "at": "2025-06-22T14:34:33.185Z",
        "__v": 0
    },
    {
        "_id": "68580d5eaee909a624138ea8",
        "name": "Mohammed Safil",
        "phoneNumber": "9999999999",
        "help": "Gjghhh",
        "discription": "Fhghhhhjjjjjjjjb",
        "at": "2025-06-22T14:04:14.031Z",
        "__v": 0
    },
    {
        "_id": "68580ab0aee909a624138ea5",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:52:48.838Z",
        "__v": 0
    },
    {
        "_id": "68580a50aee909a624138ea3",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:51:12.447Z",
        "__v": 0
    },
    {
        "_id": "68580a0eaee909a624138ea1",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:50:06.339Z",
        "__v": 0
    },
    {
        "_id": "685809f3aee909a624138e9f",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:49:39.435Z",
        "__v": 0
    },
    {
        "_id": "685809d9aee909a624138e9d",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "12345678900000",
        "at": "2025-06-22T13:49:13.761Z",
        "__v": 0
    },
    {
        "_id": "6858099caee909a624138e9b",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "12345678900000",
        "at": "2025-06-22T13:48:12.902Z",
        "__v": 0
    },
    {
        "_id": "68580972aee909a624138e99",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaaa",
        "discription": "aaaaaaaaaaaaa",
        "at": "2025-06-22T13:47:30.094Z",
        "__v": 0
    }
]
```

**Example Request:**
```http
GET /admin/contacts?phoneNumber=9789378657
Cookie: authToken=...;
```
**Example Response:**
```json
[
    {
        "_id": "68580ab0aee909a624138ea5",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:52:48.838Z",
        "__v": 0
    },
    {
        "_id": "68580a50aee909a624138ea3",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:51:12.447Z",
        "__v": 0
    },
    {
        "_id": "68580a0eaee909a624138ea1",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:50:06.339Z",
        "__v": 0
    },
    {
        "_id": "685809f3aee909a624138e9f",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "qwe123432111",
        "at": "2025-06-22T13:49:39.435Z",
        "__v": 0
    },
    {
        "_id": "685809d9aee909a624138e9d",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "12345678900000",
        "at": "2025-06-22T13:49:13.761Z",
        "__v": 0
    },
    {
        "_id": "6858099caee909a624138e9b",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaa",
        "discription": "12345678900000",
        "at": "2025-06-22T13:48:12.902Z",
        "__v": 0
    },
    {
        "_id": "68580972aee909a624138e99",
        "name": "Mohammed Safil",
        "phoneNumber": "9789378657",
        "help": "aaaa",
        "discription": "aaaaaaaaaaaaa",
        "at": "2025-06-22T13:47:30.094Z",
        "__v": 0
    }
]
```

---
 
## Notes
- All date filters expect ISO date strings (e.g., `2024-06-01`).
- All responses are JSON.
- All endpoints are GET and read-only (no mutation).
- For graphing, use the analytics endpoints which return counts grouped by day or month.
- All fields not shown in examples are standard MongoDB document fields. 