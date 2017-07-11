const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//DB setup
mongoose.connect('mongodb://localhost/larry_may_2017')
mongoose.Promise = global.Promise;
//App setup
const app = express();
// app.use(morgan('combined'));
router(app);
app.use(cors());
app.use(bodyParser.json({type: '*/*'}))

//Server setup
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server listening on: ', port);
});
