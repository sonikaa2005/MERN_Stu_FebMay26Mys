// conditional statements
let age=20;
if(age<13){
    console.log("Child");
}
else if(age<18){
    console.log("teenager");
}
else{
    console.log("Adult");
}

//Switch Statements
console.log("Switch statements");
const day = "Tuesday";
switch (day) {
    case "Monday":
        console.log("Start of the week");
        break;
    case "Wednesday":
        console.log("Mid of the week");
        break;
    case "Friday":
        console.log("End of work week");
        break;
    default:
        console.log("some day in the week");
        break;
}

// Type conversion
let n=Number("ABC");
console.log("n:",n,"Type of n:",typeof n,"isNaN",isNaN(n));