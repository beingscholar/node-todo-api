const mongoose = require('mongoose');
const dbName = 'todoapp';
const Url = 'mongodb://beingscholar:Mayank@0929@ds237855.mlab.com:37855/';
//|| 'mongodb://localhost:27017/'

mongoose.Promise = global.Promise;
mongoose.connect(Url + dbName);

module.exports = { mongoose };

