//Introduction to the NodeJS File System (fs) built-in module

const fs = require("fs");
const fsPromises = require("fs/promises");

console.log("Type of fs.readFile: ",typeof fs.readFile);
console.log("Type of fs.writeFile: ",typeof fs.readFile);

console.log("Type of fsPromises.readFile: ",typeof fs.readFile);
console.log("Type of fsPromises.writeFile: ",typeof fs.readFile);