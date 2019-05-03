import express from 'express';
import { config } from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userView from './Views/userView';
import axios from 'axios';
const app = express();
var router = express.Router({ strict: true });
app.use(bodyParser.json())
mongoose.connect(config.dbConnectStatement, {useNewUrlParser: true}, ( err, client ) => {
  if (err) {
    console.log(err);
  } else {
    console.log("CONNECTION ESTABLISHED TO MONGO DB ");
  }
});
userView(app);

app.listen(config.port || process.env.PORT, () => {
  console.log("RUNNING ON PORT",config.port);
})


// To start the server we use nodemon start.js
// node index.js won't work correctly
