//Using a custom commonJS module

const {calculateTax,applyDiscount,formatCurrency } = require("./P2")

const itemName = "Laptop";
const basePrice= 60000;


const discountedPrice = applyDiscount(basePrice,10);
const taxAmount = calculateTax(discountedPrice);
const finalPrice = discountedPrice + taxAmount;

console.log("Item: ",itemName);
console.log("Base price: ",formatCurrency(basePrice));
console.log("Discounted price:",formatCurrency(discountedPrice));
console.log("GST Tax @18%: ",formatCurrency(taxAmount));
console.log("Final Price: ",formatCurrency(finalPrice));
