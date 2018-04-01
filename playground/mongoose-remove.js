const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

var id = "5ac0efd8eece9e4d9999202e";

Todo.findOneAndRemove({ _id: id }).then((todo) => {
    if (!todo) return console.log('Todo ID not found!');
    console.log('Todo By Id', todo);
}).catch((e) => console.log(e.message));

// Todo.findByIdAndRemove(id).then((todo) => {
//     if (!todo) return console.log('Todo ID not found!');
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e.message));