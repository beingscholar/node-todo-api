const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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
    /* } else {
        req.body.forEach((post) => {
            var todo = new Todo(post);
            todo.save().then((doc) => {
                res.send(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        });
    } */

    /* async.eachSeries(people, function (person, asyncdone) {
        person.save(asyncdone);
    }, function (err) {
        if (err) return console.log(err);
        done(); // or `done(err)` if you want the pass the error up
    }); */
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        // res.send('Invalid ID!');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
            // return res.send('no records found!');
        }
        res.send({ todo });
    }).catch((e) => res.send(e.message));
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
    }).catch((e) => res.status(400).send(e.message));
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
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