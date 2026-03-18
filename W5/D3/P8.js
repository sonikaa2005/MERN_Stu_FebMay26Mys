//try catch finally with async/await

function processPayment(isSucceeded){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            if(isSucceeded){
                resolve("Payment processed successfully.");
            }
        else{
            resolve("Payment couldn't processed successfully");
            }
        })
    })
}
async function runPaymentFlow(isSucceeded) {
    try{
        const result = await processPayment(isSucceeded);
        console.log("Success",result);
    }
    catch(error){
        console.log("Failure:",error);
    }
    finally{
        console.log("Payment flow completed.");
    }
    
}

runPaymentFlow(true).then(function(){
    return runPaymentFlow(true);
});