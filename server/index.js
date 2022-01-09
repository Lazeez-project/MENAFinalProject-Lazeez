var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(cors());
app.use(bodyParser.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload());

var endUser = require('./api/end-user-api');
var restaurantOwner = require('./api/rsetaurant-owner-api');
var admin = require('./api/admin-api');
app.use('/api', endUser);
app.use('/api', restaurantOwner);
app.use('/api', admin);



var port = process.env.port || 8877;
app.listen(port);
console.log('server running on port : ' + port);