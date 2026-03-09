// Breakpoint : indicates break in the code lines/point(it is use to narrow down error in huge code lines)

//**inspect variable values
// View the call stack (it is internal and it is crated whenever function is invoked)
// step through code line by line
// evaluate expressions in the console
// Watch how variables change during the execution
// #### to find logicalerrors */

function calculateTotal(prices){
    let total = 0;
    for(let i = 0;i<prices.length;i++){
        let price = prices[i];
        debugger;
        total+=price;
    }
    return total;
}

let cart = [100,250,150,1000,220]; //cart is a parameter 

console.log("Total: ",calculateTotal(cart));
6