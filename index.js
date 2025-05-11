const express = require('express');
const app = express();
app.use(express.json());
const connectToDb = require('./src/config/mongoos');
const imageRoute = require('./src/router/image');
const otpRoute = require('./src/router/otpRoute');
const doc = require('./src/util/documentaion');
const serverInit = require('./src/router/server');

app.use(serverInit);
app.use('/otp', otpRoute);
app.use('/image', imageRoute);
app.use((req, res) => res.send(doc));

connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
