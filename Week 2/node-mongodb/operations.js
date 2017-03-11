var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
    var coll = db.collection(collection);
    coll.insert(document, function(err, result) {
        //the line below implies : is err == null ?
        assert.equal(err, null);
        console.log("Inserted" + result.result.n + "documents into the document collection");
        callback(result);
    });
};

exports.findDocuments = function(db, collection, callback) {
    var coll = db.collection(collection);
    coll.find({}).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

exports.removeDocument = function(db, document, collection, callback) {
    var coll = db.collection(collection);
    coll.deleteOne(document, function(err, result) {
        assert.equal(err, null);
        console.log("Deleted document " + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, collection, callback) {
    var coll = db.collection(collection);

    coll.updateOne(document, {
        $set: update
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Updated the document with " + update);
        callback(result);
    });
};
