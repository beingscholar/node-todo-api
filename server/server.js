const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

// parse application/json
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    // var total = Object.keys(req.body).length;
    // if (total <= 1) {
    var todo = new Todo(req.body);
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    // } else {
    //     req.body.forEach((post) => {
    //         var todo = new Todo(post);
    //         todo.save().then((doc) => {
    //             res.send(doc);
    //         }, (e) => {
    //             res.status(400).send(e);
    //         });
    //     });
    // }
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

/* 
var otherTodo = new Todo({
    text: '  Edit this Post  '
});

otherTodo.save().then((result) => {
    console.error(JSON.stringify(result, undefined, 2));
}, (e) => {
    console.log('Unable to save todo', JSON.stringify(e.errors.text, undefined, 2));
});

// User 
// email -- require -- trim type string - min: 1
 */

module.exports = { app }