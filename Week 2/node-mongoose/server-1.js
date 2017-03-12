var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes.js')
var url = 'mongodb://localhost:27017/conFusion';

mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error : "));

db.once("open", function() {
    console.log("Connection succesful");

    Dishes.create({
        name: "Akki Rotti",
        description: "Tasty",
        image :"images/image",
        price :"4.99",
        category : "mains",
        comments : {
            author: "kai",
            comment: "Tasty",
            rating: 5
        }
    }, function(err, dish) {
        assert.equal(err, null);
        console.log("Insertion succesful");
        console.log(dish);
        var id = dish.id;

        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        label: "Spicy"
                    }
                }, {
                    new: true
                })
                .exec(function(err, dish) {
                    assert.equal(err, null);
                    console.log("Updated dish.")
                    console.log(dish);

                    dish.comments.push({
                        rating: 3,
                        comment: "Very good",
                        author: "Why"
                    });

                    dish.save(function(err, dish) {
                        console.log("Commends added");
                        console.log(dish);
                        db.collection("dishes").drop(function() {
                            db.close();
                        });
                    })

                });
        }, 3000);

    });

});
