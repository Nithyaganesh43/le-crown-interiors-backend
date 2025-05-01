const express = require('express');
const connectToDb = require('./src/config/mongoos');
const imageRoute = require('./src/router/image');
const doc = require('./src/util/documentaion');
const serverInit = require('./src/router/server');
const app = express();

app.use(serverInit);
app.use('/image', imageRoute);
app.use((req, res) => res.send(doc));

connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
