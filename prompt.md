1. Add User
Method: POST
URL:https://le-crown-interiors-backend.onrender.com/add-expense/add-user
Body (JSON):
{
  "userName": "user-enter-user",
  "password": "user-enter-pass"
}
2. Add Expense
Method: POST
URL:https://le-crown-interiors-backend.onrender.com/add-expense/add-expense
Body (JSON):
{
  "userName": "user-enter-user",
  "type": "Food",
  "desc": "Dinner at restaurant",
  "amount": 500,
  "date": "2024-05-01"
}
3. Get Expenses
Method: GET
URL:https://le-crown-interiors-backend.onrender.com/add-expense/expenses
Body (JSON):
{
  "userName": "user-enter-user"
}
4. Add Budget
Method: POST
URL:https://le-crown-interiors-backend.onrender.com/add-expense/add-budget
Body (JSON):
{
  "userName": "user-enter-user",
  "type": "Monthly",
  "name": "May Budget",
  "desc": "Budget for May",
  "amount": 10000,
  "savings": 2000
}
5. Get Budgets
Method: GET
URL:https://le-crown-interiors-backend.onrender.com/add-expense/budgets
Body (JSON):
{
  "userName": "user-enter-user"
}
6. Add Goal
Method: POST
URL:https://le-crown-interiors-backend.onrender.com/add-expense/add-goal
Body (JSON):
{
  "userName": "user-enter-user",
  "name": "New Laptop",
  "pAmount": 50000,
  "cAmount": 10000,
  "deadLine": "2024-12-31",
  "type": "Tech",
  "desc": "Saving for a new laptop"
}
7. Add Amount to Goal
Method: POST
URL:https://le-crown-interiors-backend.onrender.com/add-expense/add-amount-goal
Body (JSON):
{
  "id": "<insert-goal-_id-here>",
  "amount": 5000
}
Replace <insert-goal-_id-here> with the actual _id returned from the /get-goal response.


8. Get Goals
Method: GET
URL:https://le-crown-interiors-backend.onrender.com/add-expense/get-goal
Body (JSON):
{
  "userName": "user-enter-user"
}


databse 
const expSchema = new mongoose.Schema({
  userName: String,
  type: String,
  desc: String,
  amount: Number,
  date: Date,
});

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String,
});

const budgetSchema = new mongoose.Schema({
  userName: String,
  type: String,
  desc: String,
  name: String,
  amount: Number,
  savings: Number,
});

const goalSchema = new mongoose.Schema({
  userName: String,
  name: String,
  pAmount: Number,
  cAmount: Number,
  deadLine: Date,
  type: String,
  desc: String,
});