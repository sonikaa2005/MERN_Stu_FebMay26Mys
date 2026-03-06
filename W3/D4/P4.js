// Filter method

let marks = [75,49,56,70,82,51,68];
let passed = marks.filter(mark => mark >=70);

console.log(marks);
console.log(passed);

let students= [
    {name:"Arjun", marks: 75},
    {name:"Krish", marks: 49},
    {name:"san", marks: 56},
    {name:"lan", marks: 70},
    {name:"meera", marks: 82},
    {name:"raadha", marks: 51},
    {name:"lio", marks: 68}
];

//let passedStudent =  students.filter(mark => mark.marks >=70);
//console.log("Passed students",passedStudent);
//console.log("",passedStudent);

//or
// let qualifiedStudents = students.filter(s => s.score > 70);
//console.log("qualifiedStudents: ",qualifiedStudents);
//to give only qualified names

//let names = passedStudent.map(s => s.name);
//console.log("",names);

let passedStudent =  students.filter(mark => mark.marks >=70).map(s => s.name)
console.log(passedStudent);
