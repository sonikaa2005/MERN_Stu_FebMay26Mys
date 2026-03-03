//important
// Callback function
//is a function which is passed as an argument
// to another function

function greetUser(name, Callback){
    console.log("Hello, ",name);
    callback();
}
greetUser("Sonika",function(){
    console.log("Callback function executed");
});