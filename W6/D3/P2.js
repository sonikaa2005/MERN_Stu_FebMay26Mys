// Reading & writing files synchronously

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"sync-note.txt");//function of the path module to join the corrent directory

//syntax for function usage in module
//moduleName.functionName()

//fs.writeFileSync(filePath,"This file was written usingwriteFileSync().\nSynchronous operation block");
//Append to a file
fs.appendFileSync(filePath, "New text added using fs.appendFile.",function(error){
    if(error){
        console.log("Append error:",error.message);
        return;
      }
      console.log("File content appended");
    }
);
console.log("File written synchronosly.");

const content = fs.readFileSync(filePath,"utf-8");

console.log("File read synchronously.");
console.log("File content:\n",content);