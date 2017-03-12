var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');


var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection failed : "));
db.once("open", function() {
      console.log("Connection to db succesful");

      Leadership.create({
        name : "HEHee",
        image : "images/image",
        designation : "19.99",
        abbr : "label is there",
        description : "Featuring..."
      }, function(err, promotion){
        assert.equal(err,null)
        console.log(promotion);
      });

})
