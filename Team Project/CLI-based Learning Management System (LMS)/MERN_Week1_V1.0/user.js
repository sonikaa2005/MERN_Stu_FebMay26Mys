// user.js

const user = {

  enrolledCourses: [
    // Example structure:
    {
      name:"Sonika",
      courseId: 1,
      title: "MERN-STACK",
      instructor: "Rakesh",
      enrollmentDate: "2026-04-13",
      completedLessons: [0,1],
      pendingLessons: [2,3],
      progress: 0
    },
    {
      name:"Saara",
      courseId: 2,
      title: "MERN-STACK",
      instructor: "Rakesh",
      enrollmentDate: "2026-04-13",
      completedLessons: [0,1],
      pendingLessons: [2,3],
      progress: 0
    }
    
  ]
};
function setUserName(name) {
  user.name = name;
}

// Get user details
function getUser() {
  return user;
}

 //Add enrolled course
function addCourse(course) {
  const newCourse = {
    courseId: course.id,
    title: course.title,
    instructor: course.instructor,
    enrollmentDate: new Date().toLocaleString(),
    completedLessons: [],
    pendingLessons: [...course.lessons],
    progress: 0
  };

  user.enrolledCourses.push(newCourse);
}

// Remove course 
function removeCourse(courseId) {
  user.enrolledCourses = user.enrolledCourses.filter(
    c => c.courseId != courseId
  );
}

// Update progress
function updateProgress(courseId) {
  const course = user.enrolledCourses.find(
    c => c.courseId == courseId
  );

  if (!course) return;

  const total = course.completedLessons.length + course.pendingLessons.length;

  course.progress = Math.floor(
    (course.completedLessons.length / total) * 100
  );
}

module.exports = {
  user,
  setUserName,
  getUser,
  addCourse,
  removeCourse,
  updateProgress
};