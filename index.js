const express = require('express');
const app = express();
const serverInit = require('./src/router/server');
app.use(serverInit);

const connectToDb = require('./src/config/mongoos');
const otpRoute = require('./src/router/otpRoute');
const imageRoute = require('./src/router/image');
const doc = require('./src/util/documentaion');
const chat = require("./src/router/chatBot");
const Subscribe = require("./src/router/subscribe");
const Contact = require("./src/router/contactUs");
const EstimationOrder = require("./src/router/estimation");
const rateLimiter = require('./src/middleware/rateLimiter');
const adminRouter = require('./src/router/admin'); 

app.use(rateLimiter);
app.use('/otp', otpRoute);  
app.use('/image', imageRoute);
app.use('/chatbot', chat);
app.use('/subscribe', Subscribe);
app.use('/contact', Contact);
app.use('/estimationOrder', EstimationOrder);
app.use('/admin', adminRouter);

// app.get('/env',(req,res)=>{
//   res.send(global.Config.get(req.body.API) ?? "Sorry");
// })
app.use((req, res) => res.send(doc));

connectToDb()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error(err));
