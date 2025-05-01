const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDb = require('./src/config/mongoos');
const imageRoute = require('./src/router/image');
const doc = require('./src/util/documentaion');

const app = express();
app.use(express.json());
const allowedOrigins = ['https://admin.le-crowninteriors.com'];
app.use(cors({ origin: allowedOrigins }));

app.use('/image', imageRoute);
app.use((req, res) =>
  res.send(doc)
);
connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
