const express = require('express');
const r = express.Router();
const { Expense, Budget, Goal } = require('../model/tempModel');
const mongoose = require('mongoose');

const isValid = (v, l = 100) =>
  typeof v == 'string' && v.length > 0 && v.length <= l;

r.post('/add-expense', async (req, res) => {
  let { type, desc, amount, date } = req.body;
  amount = +amount;
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
  await new Budget({ type, name, desc, amount, savings }).save();
  res.send('ok');
});

r.get('/budgets', async (req, res) => {
  const data = await Budget.find();
  res.json(data);
});

r.post('/add-goal', async (req, res) => {
  let { name, pAmount, cAmount, deadLine, type, desc } = req.body;
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
  await new Goal({ name, pAmount, cAmount, deadLine, type, desc }).save();
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
  const data = await Goal.find();
  res.json(data);
});

module.exports = r;
