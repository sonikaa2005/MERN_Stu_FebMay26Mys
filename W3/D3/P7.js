//Object Iteration

const book = {
    title:"JS for numbers",
    author:"Myraso",
};

for(let key in book){
    console.log(key,":",book[key]);
}
console.log("keys",Object.keys(book));
console.log("Values",Object.values(book));
console.log("Entries",Object.entries(book));