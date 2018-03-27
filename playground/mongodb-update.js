const { MongoClient, ObjectID } = require('mongodb');

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

    // updateMany
    /* database.collection('Todos').updateMany(
        { completed: true },
        { $set: { completed: false } },
        { returnOriginal: false }
    ).then((result) => {
        // console.log(`${result.lastErrorObject.n} records deleted!`);
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    }); */

    // updateOne
    /* database.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
        console.log(`${result.result.n} records deleted!`);
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    }); */

    // findOneAndUpdate
    database.collection('Users').findOneAndUpdate(
        { _id: new ObjectID("5ab7f4d0c32dfb6b80761706") },
        {
            $set: { name: 'Mayank Agarwal' },
            $inc: { age: 1 }
        },
        { returnOriginal: false }
    ).then((result) => {
        // console.log(`${result.lastErrorObject.n} records deleted!`);
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    });

    db.close();
});
