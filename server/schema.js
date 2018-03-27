const mongoose = require('mongoose');
const dbName = 'TodoApp'
const conn = 'mongodb://localhost:27017/';

// mongoose.Promise = global.Promise;
mongoose.connect(conn + dbName);

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

var Blog = mongoose.model('post', blogSchema);