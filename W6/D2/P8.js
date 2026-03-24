// Handling the error event in EventEmitter
const EventEmitter = require("events");//event: built-in module

const fileEmitter = new EventEmitter();

// Register an error listener: Happy Scenario
fileEmitter.on("error",function(errorMessage){
    console.log("Emitter handler error",errorMessage);
});

// Normal event listener : Happy scenario
fileEmitter.on("fileProcessed",function(fileName){
    console.log("File processed succesfully.",fileName);
});

fileEmitter.emit("fileProcessed","report.csv");
fileEmitter.emit("error","File processing failed.");