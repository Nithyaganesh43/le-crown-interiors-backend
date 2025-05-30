// const express = require('express');
// const app = express();
// const serverInit = require('./src/router/server');
// app.use(serverInit);


// const connectToDb = require('./src/config/mongoos');
// const otpRoute = require('./src/router/otpRoute');
// const imageRoute = require('./src/router/image');
// const doc = require('./src/util/documentaion');


// app.use('/otp', otpRoute);
// app.use('/image', imageRoute);
// app.use((req, res) => res.send(doc));

// connectToDb()
//   .then(() => {
//     const port = process.env.PORT || 3000;
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch((err) => console.error(err));
const express = require('express');
const os = require('os');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  exec("df -h / | awk 'NR==2 {print $4}'", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error getting disk space: ${error}`);
      return res.status(500).send('Error retrieving disk space');
    }
    res.send(`Available free space in /: ${stdout.trim()}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
