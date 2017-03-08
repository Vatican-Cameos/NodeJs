var argv = require('yargs')
.usage("Two args")
.demand(['l','b'])
.argv;

var rect = require("./rectangle-2")

function solveRect(l, b) {
    console.log("Solving for l and b");
    rect(l, b, function(err, rectangle) {
            if (err) {
                console.log(err);
            }else{
              console.log("Perimeter " + rectangle.perimeter() + "Area " + rectangle.area());
            }
        });
    };

solveRect(argv.l,argv.b);
