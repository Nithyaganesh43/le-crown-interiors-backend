const express = require('express');
const cors = require('cors');
const connectToDb = require('./src/config/mongoos');
const imageRoute = require('./src/router/image');

const app = express();
app.use(express.json());
const allowedOrigins = ['https://admin.le-crowninteriors.com'];
app.use(cors({ origin: allowedOrigins }));

app.use('/image', imageRoute);

connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
