//chaining Promises with returned values

function getBaseAmount(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(1000);
        },500);
    });
}

getBaseAmount()
.then(function(amount){
    console.log("Base amount:",amount);
    return amount+200;
})
.then(function(upadatedAmount){
    console.log("Amount after service charge:",upadatedAmount);
    return upadatedAmount - 100;
})
.then(function(finalAmount){
    console.log("Final Amount after discount: ",finalAmount);
});