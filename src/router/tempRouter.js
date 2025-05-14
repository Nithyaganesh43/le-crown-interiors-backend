const express = require('express');
const r = express.Router();
const { Expense, Budget } = require('../model/tempModel');

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

module.exports = r;
