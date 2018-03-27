const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5abaa4d1f6c40a150743b6ca11';
var uid = '5ab9f3865c69166d580cde112';

if (!ObjectID.isValid(uid)) {
    console.log('User ID not valid!');
}

/* Todo.find({
    _id: id
}).then((todos) => {
    if (todos.length <= 0) return console.log('no record found!');
    console.log('Todos', todos);
}).catch((e) => console.log('no record found!'));
 
Todo.findOne({
    completed: false
}).then((todo) => {
    console.log('Todo', todo);
}); */

/* Todo.findById(id).then((todo) => {
    if (!todo) return console.log('Id not found!');
    console.log('Todo By Id', todo);
}).catch((e) => console.log(e.message)); */

User.findById(uid).then((user) => {
    if (!user) return console.log('User ID not found!');
    console.log('User By Id', user);
}).catch((e) => console.log(e.message));