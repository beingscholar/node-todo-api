const mongoose = require('mongoose');
const dbName = 'TodoApp';
// const Url = 'mongodb://tododb:tododb123@ds237855.mlab.com:37855/';
const Url = 'mongodb://localhost:27017/'

mongoose.Promise = global.Promise;
mongoose.connect(Url + dbName);

module.exports = { mongoose };

