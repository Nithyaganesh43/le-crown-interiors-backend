Base URL:
https://le-crown-interiors-backend.onrender.com

1. Add User
Method: POST

URL: /add-user

Headers: Content-Type: application/json

Body:


{ "userName": "john", "password": "abc123" }
Success (200):
Type: text/plain
Example: "ok"

Error (400):
Type: text/plain
Example: "E11000 duplicate key error collection:..."

2. Add Expense
Method: POST

URL: /add-expense

Headers: Content-Type: application/json

Body:


{
  "userName": "john",
  "type": "Food",
  "desc": "Dinner",
  "amount": 250,
  "date": "2025-05-01"
}
Success (200): "ok"

Error (400): "invalid"

3. Get Expenses
Method: POST

URL: /expenses

Headers: Content-Type: application/json

Body:


{ "userName": "john" }
Success (200):
Type: application/json
Example:


[
  {
    "_id": "663ab9...",
    "userName": "john",
    "type": "Food",
    "desc": "Dinner",
    "amount": 250,
    "date": "2025-05-01T00:00:00.000Z",
    "__v": 0
  }
]
4. Add Budget
Method: POST

URL: /add-budget

Headers: Content-Type: application/json

Body:


{
  "userName": "john",
  "type": "Monthly",
  "name": "Home Budget",
  "desc": "April expenses",
  "amount": 10000,
  "savings": 2000
}
Success (200): "ok"

Error (400): "invalid"

5. Get Budgets
Method: POST

URL: /budgets

Headers: Content-Type: application/json

Body:


{ "userName": "john" }
Success (200):
Type: application/json
Example:


[
  {
    "_id": "663abc...",
    "userName": "john",
    "type": "Monthly",
    "name": "Home Budget",
    "desc": "April expenses",
    "amount": 10000,
    "savings": 2000,
    "__v": 0
  }
]
6. Add Goal
Method: POST

URL: /add-goal

Headers: Content-Type: application/json

Body:


{
  "userName": "john",
  "name": "New Phone",
  "pAmount": 50000,
  "cAmount": 15000,
  "deadLine": "2025-12-01",
  "type": "Personal",
  "desc": "Buy iPhone"
}
Success (200): "ok"

Error (400): "invalid"

7. Add Amount to Goal
Method: POST

URL: /add-amount-goal

Headers: Content-Type: application/json

Body:


{
  "id": "663ade...",
  "amount": 5000
}
Success (200):
Type: application/json
Example:


{
  "_id": "663ade...",
  "userName": "john",
  "name": "New Phone",
  "pAmount": 50000,
  "cAmount": 20000,
  "deadLine": "2025-12-01T00:00:00.000Z",
  "type": "Personal",
  "desc": "Buy iPhone",
  "__v": 0
}
Error (404): "not found"

8. Get Goals
Method: POST

URL: /get-goal

Headers: Content-Type: application/json

Body:


{ "userName": "john" }
Success (200):
Type: application/json
Example:


[
  {
    "_id": "663ade...",
    "userName": "john",
    "name": "New Phone",
    "pAmount": 50000,
    "cAmount": 20000,
    "deadLine": "2025-12-01T00:00:00.000Z",
    "type": "Personal",
    "desc": "Buy iPhone",
    "__v": 0
  }
]