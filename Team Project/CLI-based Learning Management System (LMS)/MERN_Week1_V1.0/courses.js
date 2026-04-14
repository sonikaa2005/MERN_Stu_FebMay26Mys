// courses.js
const courses = [
  {
    id: 1,
    title: "MERN-STACK",
    instructor: "Rakesh",
    totalLessons: 4,
    lessons: [
      "ReactJS",
      "NodeJS",
      "ExpressJS",
      "MongoDB"
    
    ],
    difficulty: "Beginner",
    category: "Programming",
    isEnrolled: true
  },
  {
    id: 2,
    title: "Cognitive Ability",
    instructor: "Prabhu",
    totalLessons: 5,
    lessons: [
      "Numerical Ability",
      "Logical Reasoning",
      "Verbal Ability",
      "Analytical & Problem-Solving Skills",
      "Data Interpretation",
    ],
    difficulty: "Intermediate",
    category: "Backend Development",
    isEnrolled: false
  },
  {
    id: 3,
    title: "Java  Basics",
    instructor: "Ramesh",
    totalLessons: 8,
    lessons: [
      "Introduction to JS",
      "Variables & Data Types",
      "Operators",
      "Functions",
      "Arrays",
      "Objects",
      "Loops",
      "DOM Basics",
    ],
    difficulty: "Intermediate",
    category: "Backend Development",
    isEnrolled: false
  }
];
console.log(courses);
module.exports = courses;