✅ POST /add-expense
URL:
[https://le-crown-interiors-backend.onrender.com/add-expense]

Headers:

Content-Type: application/json
Body (raw JSON):

{
"type": "Office",
"desc": "Chairs and desks purchase",
"amount": 15000,
"date": "2025-05-14"
}
Expected Response:
ok

✅ GET /expenses
URL:
[https://le-crown-interiors-backend.onrender.com/expenses]
Method:
GET
Expected Response (example):
[
{
"_id": "663c24ffca473ac72b1f63c5",
"type": "Office",
"desc": "Chairs and desks purchase",
"amount": 15000,
"date": "2025-05-14T00:00:00.000Z",
"__v": 0
}
]

✅ POST /add-budget
URL:
[https://le-crown-interiors-backend.onrender.com/add-budget]
Headers:
Content-Type: application/json
Body (raw JSON):
{
"type": "Monthly",
"name": "May Budget",
"desc": "Operating budget for May",
"amount": 50000,
"savings": 5000
}
Expected Response:


ok
✅ GET /budgets
URL:
[https://le-crown-interiors-backend.onrender.com/budgets]
Method:
GET
Expected Response (example):
[
{
"_id": "663c252aca473ac72b1f63c6",
"type": "Monthly",
"name": "May Budget",
"desc": "Operating budget for May",
"amount": 50000,
"savings": 5000,
"__v": 0
}
]



Src code:

const isValid = (v, l = 100) =>
  typeof v == 'string' && v.length > 0 && v.length <= l;

r.post('/add-expense', async (req, res) => {
  let { type, desc, amount, date } = req.body;
  if (
    !isValid(type, 30) ||
    !isValid(desc, 100) ||
    isNaN(amount) ||
    !Date.parse(date)
  )
    return res.status(400).send('invalid');
  await new Expense({ type, desc, amount, date }).save();
  res.send('ok');
});

r.get('/expenses', async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

r.post('/add-budget', async (req, res) => {
  let { type, name, desc, amount, savings } = req.body;
  if (
    !isValid(type, 30) ||
    !isValid(name, 50) ||
    !isValid(desc, 100) ||
    isNaN(amount) ||
    isNaN(savings)
  )
    return res.status(400).send('invalid');
  await new Budget({ type, name, desc, amount, savings }).save();
  res.send('ok');
});

r.get('/budgets', async (req, res) => {
  const data = await Budget.find();
  res.json(data);
});

model:
const expSchema = new mongoose.Schema({
  type: String,
  desc: String,
  amount: Number,
  date: Date,
});

const budgetSchema = new mongoose.Schema({
  type: String,
  desc: String,
  name: String,
  amount: Number,
  savings: Number,
});
