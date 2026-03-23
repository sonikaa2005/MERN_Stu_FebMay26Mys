// Understanding path module and JSON module

const path = require("path");//(path is a built-in module of CJS)

//JSON is loaded as a normal JS object in CommonJS
const appConfig = require("./support/app-config.json");

console.log("__dirname",__dirname); // it tells what dirctory name we r using
console.log("__filename",__filename);

console.log("Application name: ",appConfig.appName);
console.log("Environment: ",appConfig.environment);
console.log("Features: ",appConfig.features.join(", "));//join():removes array format