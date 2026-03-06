// reduce method
let nums = [5,10,15];

let total=nums.reduce((intermediateSum,current) => intermediateSum+current,0);
console.log(total);
console.log(total/nums.length);
//let average=nums.reduce((intermediateSum,current) => intermediateSum+current,0)/nums.length
//console.log(average);


//reduce to object count by category

let items = ["pen","pencils","eraser"];
let count = items.reduce((intermediatevalue,item)=>{
    intermediatevalue[item]=(intermediatevalue[item]||0)+1;
    return item;
},{});
console.log("Item count: ",count);
