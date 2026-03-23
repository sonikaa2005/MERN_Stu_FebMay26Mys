//Basic of Node.js modules

const modulTitle = "Nodejs module basics";
function describeModule(){
    console.log("This file is its own module");
    console.log("Title: ",modulTitle);
    console.log("Local values stay inside this file unless exported");
}
describeModule(); //invoking the function