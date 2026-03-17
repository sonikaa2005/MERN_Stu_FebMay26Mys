//chaining promises with centralized error handling

function validateLogin(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("Login validated");
        },400);
    })
}
function fetchAccountData(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            const accountFound = false;
            if(accountFound){
                resolve("Account data loaded.")
            }else{
                reject("Account data could not be find")
            }
        },700);
    });
}
validateLogin()
.then(function(message){
    console.log(message);
    return fetchAccountData();
})
.then(function(accountMessage){
    console.log(accountMessage);
})
.catch(function(error){
    console.log("Chain error:",error);
})
