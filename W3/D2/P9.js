//Immediately InvokedFunction Expression (IIFE)

(function() {
    console.log("Basic IIFE executed Immediately");
})();

(function(appName,version){
    console.log("App:",appName,"Version: ",version);
})("NodeJS","V22.22.0");

//With return value
const result = (function(){
    const a = 10, b = 20;
    return a+b;
})();
console.log("Sum is: ",result); 