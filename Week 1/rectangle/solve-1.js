var rect = require("./rectangle-1");

function solveRect(x, y){
    console.log("Solving for rectangle l = " + x + " b = " + y)
    
    if(x < 0 || y < 0){
        console.log("Dimensions cannot be lesser than zero : l = " + x + "b = " + y);
    }else{
        console.log("Perimeter of the rectangle is " + rect.perimeter(x,y));
        console.log("Area of the rectangle is " + rect.area(x,y)); 
    }  
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);