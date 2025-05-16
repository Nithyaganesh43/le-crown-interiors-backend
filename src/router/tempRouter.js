require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const isValid = (v, l = 100) =>
  typeof v == 'string' && v.length > 0 && v.length <= l;

const s = process.env.MONGO_URL;
mongoose.connect(s);

const expSchema = new mongoose.Schema({
  userName: String,
  type: String,
  desc: String,
  amount: Number,
  date: Date,
});
const userSchema = new mongoose.Schema({ userName: String, password: String });
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

const Expense = mongoose.model('Eexpense', expSchema);
const Budget = mongoose.model('Bbudget', budgetSchema);
const Goal = mongoose.model('Ggsoal', goalSchema);
const User = mongoose.model('Uuuser', userSchema);

app.post('/add-user', async (req, res) => {
  let { userName, password } = req.body;
  try {
    await new User({ userName, password }).save();
    res.send('ok');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/add-expense', async (req, res) => {
  let { userName, type, desc, amount, date } = req.body;
  amount = +amount;
  if (
    !isValid(type, 30) ||
    !isValid(desc, 100) ||
    isNaN(amount) ||
    !Date.parse(date)
  )
    return res.status(400).send('invalid');
  await new Expense({ userName, type, desc, amount, date }).save();
  res.send('ok');
});

app.post('/expenses', async (req, res) => {
  let { userName } = req.body;
  const d = await Expense.find({ userName });
  res.json(d);
});

app.post('/add-budget', async (req, res) => {
  let { userName, type, name, desc, amount, savings } = req.body;
  amount = +amount;
  savings = +savings;
  if (
    !isValid(type, 30) ||
    !isValid(name, 50) ||
    !isValid(desc, 100) ||
    isNaN(amount) ||
    isNaN(savings)
  )
    return res.status(400).send('invalid');
  await new Budget({ userName, type, name, desc, amount, savings }).save();
  res.send('ok');
});

app.post('/budgets', async (req, res) => {
  let { userName } = req.body;
  const d = await Budget.find({ userName });
  res.json(d);
});

app.post('/add-goal', async (req, res) => {
  let { userName, name, pAmount, cAmount, deadLine, type, desc } = req.body;
  pAmount = +pAmount;
  cAmount = +cAmount;
  if (
    !isValid(type, 30) ||
    !isValid(name, 50) ||
    !isValid(desc, 100) ||
    isNaN(pAmount) ||
    isNaN(cAmount) ||
    !Date.parse(deadLine)
  )
    return res.status(400).send('invalid');
  await new Goal({
    userName,
    name,
    pAmount,
    cAmount,
    deadLine,
    type,
    desc,
  }).save();
  res.send('ok');
});

app.post('/add-amount-goal', async (req, res) => {
  let { id, amount } = req.body;
  amount = +amount;
  const g = await Goal.findOneAndUpdate(
    { _id: id },
    { $inc: { cAmount: amount } },
    { new: true }
  );
  if (!g) return res.status(404).send('not found');
  res.json(g);
});

app.post('/get-goal', async (req, res) => {
  let { userName } = req.body;
  const d = await Goal.find({ userName });
  res.json(d);
});

app.listen(process.env.PORT);
