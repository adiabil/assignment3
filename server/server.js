const logger = require('./logger');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errorHandler } = require("./middlewares/errorHandler");
const apiRouter = require('./routers/sessionRouter');
const {connectDB} = require('./db/mongoStorage');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8080;
module.exports = app;


app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use('/counselingSession', apiRouter);

connectDB();
app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
    logger.info(`Server is running on http://localhost:${port}`);
  }
});