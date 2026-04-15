const courses = [
  {
    id: 1,
    title: "MERN stack",
    instructor: "Rakesh",
    category: "Programming",
    level: "Beginner",
    status: true,
    totalNumber: 3,
    lessons: ["React.js", "Express.js", "Node.js"]
  },

  {
    id: 2,
    title: "Node.js",
    instructor: "Sonu",
    category: "Backend",
    level: "Intermediate",
    status: false,
    totalNumber: 4,
    lessons: ["Modules", "Buffer", "Events", "File System"]
  },

  {
    id: 3,
    title: "HTML & CSS",
    instructor: "Anu",
    category: "Web Development",
    level: "Beginner",
    status: true,
    totalNumber: 4,
    lessons: ["HTML Tags", "CSS Basics", "Grid", "Flexbox"]
  },

  {
    id: 4,
    title: "Python",
    instructor: "Saara",
    category: "Programming",
    level: "Beginner",
    status: false,
    totalNumber: 3,
    lessons: ["Syntax", "Loops", "Functions"]
  }
];

module.exports = courses;