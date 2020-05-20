const mongoose = require('mongoose');
path = require('path')
fs = require('fs')

mongoose.connect('mongodb://localhost/RunFam', {useNewUrlParser: true, useUnifiedTopology:true});
// mongoose.connect('mongodb+srv://Window10:Window10@cluster0-hg3a6.mongodb.net/Newfolderfff?retryWrites=true&w=majority');


var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
   }
})