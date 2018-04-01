const mongoose = require('mongoose');
const Url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
// mongoose.connect(Url);
mongoose.connect(Url + MONGODB_NAME);

module.exports = { mongoose };

