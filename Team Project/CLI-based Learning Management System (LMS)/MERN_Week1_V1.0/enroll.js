// enroll.js

const courses = require("./courses");
const {
  user,
  addCourse
} = require("./user");
const emitter = require("./events");

function enrollCourse(courseId) {
  return new Promise((resolve, reject) => {
    emitter.emit("enrollmentStarted");

    // Step 1: Validate Course
    const course = courses.find(c => c.id == courseId);
    if (!course) {
      return reject("Course not found");
    }

    resolve(course);
  })

  // Step 2: Check Duplicate Enrollment
  .then(course => {
    const alreadyEnrolled = user.enrolledCourses.find(
      c => c.courseId == course.id
    );

    if (alreadyEnrolled) {
      throw "You are already enrolled in this course";
    }

    return course;
  })

  // Step 3: Check Enrollment Status (optional flag from your data)
  .then(course => {
    if (course.isEnrolled === true) {
      throw "Course is already marked as enrolled";
    }
    return course;
  })

  // Step 4: Process Enrollment
  .then(course => {
    addCourse(course); // from user.js

    course.isEnrolled = true;

    return course;
  })
  .then(course => {
    emitter.emit("enrollmentConfirmed", course.title);
    return course;
  })
  .catch(err => {
    emitter.emit("operationFailed", err);
    throw err;
  });
}
module.exports = enrollCourse;