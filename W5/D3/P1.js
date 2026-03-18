//Introduction to async/await

function getMessage(){ //Name function
    return new Promise(function(resolve){
        setTimeout(() => { //arrow function
            resolve("Async/await makes promise based code easier to read");
        },1000);
    });
}

async function showMessage(){
    console.log("Loading message...");
    const message = await getMessage();
    console.log(message);
}

showMessage();//invoking/calling function