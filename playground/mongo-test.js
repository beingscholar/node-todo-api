const MongoClient = require('mongodb').MongoClient,
const test = require('assert');

MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {

    // Create a collection to hold our documents
    // var rs = db.db('test')
    var collection = db.collection('test_array');

    // Insert a test document
    collection.insertOne({ 'b': [1, 2, 3] }, { w: 1 }, function (err, ids) {

        // Retrieve all the documents in the collection
        collection.find().toArray(function (err, documents) {
            test.equal(1, documents.length);
            test.deepEqual([1, 2, 3], documents[0].b);

            db.close();
        });
    });
});