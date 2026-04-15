const user = require('./user');
const courses = require('./courses');
const emitter = require('./events');

function enroll(courseId) {
  return new Promise((resolve, reject) => {
    const course = courses.find(c => c.id === courseId);

    if (!course) return reject("Course not found");

    if (user.enrolledCourses[courseId]) {
      return reject("Already enrolled");
    }

    resolve(course);
  })
  .then(course => {
    user.enrolledCourses[course.id] = {
      ...course,
      completedLessons: []
    };
    emitter.emit("enrollmentConfirmed", course.title);
    return course;
  });
}

module.exports = enroll;