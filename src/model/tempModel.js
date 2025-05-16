const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
  userName: String,
  type: String,
  desc: String,
  amount: Number,
  date: Date,
});

const userSchema = new mongoose.Schema({
  userName: String ,
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

const Expense = mongoose.model('Eexpense', expSchema);
const Budget = mongoose.model('Bbudget', budgetSchema);
const Goal = mongoose.model('Ggsoal', goalSchema);
const User = mongoose.model('Uuuser', userSchema);

module.exports = { User, Goal, Expense, Budget };
