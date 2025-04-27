const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const imagesRouter = require('./routes/cloudinary');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/images', imagesRouter);
app.use('/check',(req , res )=>res.send('ok'));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
