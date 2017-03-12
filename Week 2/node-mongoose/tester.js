var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');


var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection failed : "));
db.once("open", function() {
      console.log("Connection to db succesful");

      Promotions.create({
        name : "HEe",
        image : "images/image",
        price : "19.99",
        label : "label is there",
        description : "Featuring..."
      }, function(err, promotion){
        assert.equal(err,null)
        console.log(promotion);
      });

})
