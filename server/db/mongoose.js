const mongoose = require('mongoose');
const dbName = 'TodoApp';
const Url = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/'

mongoose.Promise = global.Promise;
mongoose.connect(Url + dbName);

module.exports = { mongoose };