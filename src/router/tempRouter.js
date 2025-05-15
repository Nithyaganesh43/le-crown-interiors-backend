const express = require('express');
const r = express.Router();
const { Expense, Budget, Goal, User } = require('../model/tempModel');

const isValid = (v, l = 100) =>
  typeof v == 'string' && v.length > 0 && v.length <= l;

r.post('/add-user', async (req, res) => {
  let { userName, password } = req.body;
  try {
    await new User({ userName, password }).save();
    res.send('ok');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

r.post('/add-expense', async (req, res) => {
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

r.get('/expenses', async (req, res) => {
  let { userName } = req.body;
  const data = await Expense.find({ userName });
  res.json(data);
});

r.post('/add-budget', async (req, res) => {
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

r.get('/budgets', async (req, res) => {
  let { userName } = req.body;
  const data = await Budget.find({ userName });
  res.json(data);
});

r.post('/add-goal', async (req, res) => {
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

r.post('/add-amount-goal', async (req, res) => {
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

r.get('/get-goal', async (req, res) => {
  let { userName } = req.body;
  const data = await Goal.find({ userName });
  res.json(data);
});

module.exports = r;
