// Reading & writing files synchronously

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"sync-note.txt");//function of the path module to join the corrent directory

//syntax for function usage in module
//moduleName.functionName()

fs.writeFileSync(filePath,"This file was written usingwriteFileSync().\nSynchronous operation block");

console.log("File written synchronosly.")

const content = fs.readFileSync(filePath,"utf-8");

console.log("File read synchronously.");
console.log(content);