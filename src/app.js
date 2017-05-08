import express from 'express'; // importing  express framework
import dotenv from 'dotenv'; // importing dotenv library
import bodyParser from 'body-parser'; // importing bodyParser module
import config from '../config/config';// imporrting the config file
import api from './routes';

/**
 * creating an instance of dotenv and express
 */
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
process.env.NODE_ENV = 'production';

const port = config[process.env.NODE_ENV].PORT;
app.listen(port, (err) => {
  if (!err) {
    console.log(`listening to server @ port ${port}`);
  } else {
    console.log(err);
  }
});
