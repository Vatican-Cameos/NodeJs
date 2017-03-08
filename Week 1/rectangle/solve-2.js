var rect = require("./rectangle-2");

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

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
