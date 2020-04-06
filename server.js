const express = require("express");
const mongoose = require('mongoose');
const path = require('path')
const app = express();
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(express.json());
require('./server/config/database.js')
require('./server/config/routes.js')(app);

// app.get ('/',(request,response) => response.sendFile(path.join(__dirname)))

app.listen(8000, () => console.log("listening on port 8000"));