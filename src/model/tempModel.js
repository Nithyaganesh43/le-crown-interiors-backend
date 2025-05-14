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

const Expense = mongoose.model('Expense', expSchema);
const Budget = mongoose.model('Budget', budgetSchema);

module.exports = { Expense, Budget };
