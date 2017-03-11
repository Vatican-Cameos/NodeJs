var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//connection URL
var url = "mongodb://localhost:27017/conFusion";
//Use connect to connect to the server..
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Connected correctly to server.");
    var collection = db.collection('dishes');
    collection.insertOne({
            dish: "Akki rotti",
            description: "tasty"
        },
        function(err, result) {
            assert.equal(err, null);
            console.log("After insertion...");
            console.log(result.ops);

            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found");
                console.log(docs);
                db.dropCollection("dishes", function(err, result) {
                    assert.equal(err, null);
                    console.log("Collection dropped");
                    db.close();
                });
            });
        });
});
