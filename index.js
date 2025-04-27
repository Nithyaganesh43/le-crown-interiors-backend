const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cloudinaryRoutes = require('./routes/cloudinary');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use('/images', cloudinaryRoutes);
const port = process.env.PORT || 3000;
app.listen(port);
