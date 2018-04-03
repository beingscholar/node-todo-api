require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


const { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;


// parse application/json
app.use(bodyParser.json());

/** POST /todos **/
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

/** GET /todos **/
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

/** GET /todos/:id **/
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

/** DELETE /todos/:id **/
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

/** PATCH /todos/:id **/
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) return res.status(404).send();

        res.send({ todo });
    }).catch((e) => res.status(400).send(e.message));
});


/** POST /users **/
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('X-Auth', token).send(user);
    }).catch((e) => res.status(400).send(e));
});

app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
    /* var token = req.header('X-Auth');

    User.findByToken(token).then((user) => {
        if (!user) return Promise.reject();

        res.send(user);
    }).catch((e) => res.status(401).send()); */
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