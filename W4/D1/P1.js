try{
    console.log("Trying to access undefined variable");
    console.log(notDefined);
}
catch(err){
    console.log("Error caught",err.name,"-",err.message);
}
console.log("Program execution continues");

//JSON Parsing error
let jsonText = JASON.parse(joinText);
try{
    let data = JSON.parse(jsonText);
    console.log(data);
}
catch(err){
    console.log("JSON parse error",err.message);
}

//try and catch block
try{
    let num = 10;
    num();
}
catch(err){
    console.log("Caught error:",err.name);
}