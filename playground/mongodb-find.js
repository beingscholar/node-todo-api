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

    /* database.collection('Todos').find({
        _id: new ObjectID('5ab802cabc6871272b58f50a')
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    }) */
    database.collection('Users').find({ name: 'Priya Agarwal' }).toArray().then((docs) => {
        console.log('Users', JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err, 'Unable to fetch records!');
    })

    db.close();
});
