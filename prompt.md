 1. Add User
POST https://le-crown-interiors-backend.onrender.com/add-user
Body:
{
  "userName": "userName",
  "password": "pass123"
}

2. Add Expense
POST https://le-crown-interiors-backend.onrender.com/add-expense
Body:
{
  "userName": "userName",
  "type": "Transport",
  "desc": "Auto fare",
  "amount": 120,
  "date": "2025-05-01"
}

3. Get Expenses
GET https://le-crown-interiors-backend.onrender.com/expenses
Body:
{
  "userName": "userName"
}

4. Add Budget
POST https://le-crown-interiors-backend.onrender.com/add-budget
Body:
{
  "userName": "userName",
  "type": "Monthly",
  "name": "June Budget",
  "desc": "Monthly planning",
  "amount": 15000,
  "savings": 3000
}
5. Get Budgets
GET https://le-crown-interiors-backend.onrender.com/budgets
Body:
{
  "userName": "userName"
}

6. Add Goal
POST https://le-crown-interiors-backend.onrender.com/add-goal
Body:
{
  "userName": "userName",
  "name": "Buy Phone",
  "pAmount": 40000,
  "cAmount": 5000,
  "deadLine": "2025-12-31",
  "type": "Electronics",
  "desc": "New iPhone"
}

7. Add Amount to Goal
POST https://le-crown-interiors-backend.onrender.com/add-amount-goal
Body:
{
  "id": "<insert-goal-id>",
  "amount": 2500
}
Replace <insert-goal-id> with actual _id from the /get-goal API response.

8. Get Goals
GET https://le-crown-interiors-backend.onrender.com/get-goal
Body:
{
  "userName": "userName"
}
Use Content-Type: application/json header for all.