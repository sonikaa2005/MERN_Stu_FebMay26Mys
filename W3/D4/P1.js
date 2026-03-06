//Array basics
console.log("Array basics");
//creating arrays
let emptyArray = [];
let numArray = [1,2,3,4];
let mixedArray = [42,"hello",true,null,{name:"Gola"},[5,6]];
console.log(emptyArray);
console.log(numArray);
console.log(mixedArray);

//creation of arrays using Constructor
let fruits = new Array("Apple","Mango");
console.log("fruits:",fruits);
console.log("Is fruits an array?",Array.isArray(fruits));

//Push functionto add the items

fruits.push("Cherry");
console.log("fruits:",fruits);

//pop:remove

fruits.pop();
console.log("fruits:",fruits);

//unshift: adds to beginning

fruits.unshift("Orange");
console.log("fruits:",fruits);

//shift: to remove from beginning

fruits.shift();
console.log("fruits:",fruits);

