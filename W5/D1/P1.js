//Introduction to Node.js

const runtimeName = "Node.js";
console.log("Introduction to Node.js");
console.log(`${runtimeName} runs javascript outside the browser`);

// creating an array

const commonUses = [
    "used for server-side app",
    "automation scripts can be created"
];
// to fetch one array at a time by using index value

//array destructuring : it deconstruct the array
console.log(commonUses[0]);
console.log(commonUses[1]);
commonUses.forEach((commonUse,index) =>{  // if it is more to run
    console.log(`${index+1}.${commonUses}`);
});
