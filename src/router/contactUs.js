const app = require('express').Router();
const { Contact } = require('../model/Model');
const { validateContact } = require('../util/validation');

app.post('/contact', async (req, res) => {
  try {
    const { name, phoneNumber, help, discription } = req.body;
    const validate = validateContact({ name, phoneNumber, help, discription });
    if (validate.isInValid) return res.status(400).json(validate);
    await new Contact({ name, phoneNumber, help, discription }).save();
    res.send('Ok');
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Some thing went wrong');
  }
});
module.exports=app;