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

    // deleteMany
    /* database.collection('Users').deleteMany({ name: 'Priya Agarwal' }).then((result) => {
        console.log(`${result.result.n} records deleted!`);
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    }); */

    // deleteOne
    /* database.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
        console.log(`${result.result.n} records deleted!`);
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    }); */

    // findOneAndDelete
    database.collection('Users').findOneAndDelete({
        _id: new ObjectID('5ab7f57ee8670d6c1f505103')
    }).then((result) => {
        console.log(`${result.lastErrorObject.n} records deleted!`);
        // console.log(result);
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    });

    db.close();
});
