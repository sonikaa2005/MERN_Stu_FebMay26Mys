//Basics of Objects
const person = {
    name:"Rahul",
    age:30,
    isStudent: false
};
console.log("Person",person);
console.log("Name",person.name);//dot notation
console.log("Age",person["age"]);//bracket notation

//Add a new property
person.city = "Mysore";
console.log("Person",person);

//modify
person.age = 31;
//dlete
delete person.isStudent;
console.log("Person",person);

//object constructor
const car = new Object();
car.make = "Audi";
car.model = "A4";
car.year = 2026
console.log("Car",car);
