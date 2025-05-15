// models/tempModel.js
const mongoose = require('mongoose');

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
const goalSchema = new mongoose.Schema({
  name: String,
  pAmount: Number,
  cAmount: Number,
  deadLine: Date,
  type: String,
  desc: String,
});

const Expense = mongoose.model('Expense', expSchema);
const Budget = mongoose.model('Budget', budgetSchema);
const Goal = mongoose.model('Budget', goalSchema);

module.exports = {Goal, Expense, Budget };
