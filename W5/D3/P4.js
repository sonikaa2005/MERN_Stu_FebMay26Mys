// Combining multiple promise-based steps with async/await

function getOrderId(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(501);
        },500);
    });
}

function getOrderDetails(getOrderId){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve({
                id:getOrderId,
                product:"Laptop",
                quantity:2
            });
        },800);
    });
}

async function showOrderSummary(){
    const orderID = await getOrderId();
    console.log("Order id:",orderID);

    const orderDetails = await getOrderDetails(orderID);
    console.log("Product: ",orderDetails.product);
    console.log("Quantity: ",orderDetails.quantity);

}
showOrderSummary();