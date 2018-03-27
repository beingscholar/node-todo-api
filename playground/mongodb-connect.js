// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

/* 
var user = [{
    name: 'Priya Agarwal',
    age: 29,
    location: 'Ghaziabad'
},{
    name: 'Mayank Agarwal',
    age: 32,
    location: 'Ghaziabad'
}];
var {name} = user[0];
console.log(name);
 */

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';
// Connect using MongoClient
MongoClient.connect(url + '/' + dbName, (err, db) => {
    const database = db.db(dbName);
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var todos = [{
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }];
    todos.forEach((todo) => {
        database.collection('Todos').insertOne(todo, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }

            console.log(JSON.stringify(result.ops, undefined, 2));
        });
    });

    /* 
    var user = {
        _id: new ObjectID('kw26mar18103'),
        name: 'Priya Agarwal',
        age: 29,
        location: 'Ghaziabad'
    };
    
    database.collection('Users').insertOne(user, (err, result) => {
        if (err) return console.log('Unable to insert user', err);
        // console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });
    */
    db.close();
});
