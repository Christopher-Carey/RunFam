const mongoose = require('mongoose');
path = require('path')
fs = require('fs')

mongoose.connect('mongodb://localhost/restfulDb', {useNewUrlParser: true, useUnifiedTopology:true});
//------------------------------------^Change DB^

var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
   }
})