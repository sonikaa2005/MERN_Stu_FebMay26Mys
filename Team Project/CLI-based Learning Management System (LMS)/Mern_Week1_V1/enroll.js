const user = require("./user");
const events = require("./events");

function enrollCourse(course) {
  return new Promise((resolve, reject) => {
    events.emit("enrollmentStarted");

    if (!course) return reject("Invalid course");

    resolve(course);
  })
    .then((course) => {
      const exists = user.enrolledCourses.find(c => c.id === course.id);
      if (exists) throw "Already enrolled";
      return course;
    })
    .then((course) => {
      user.enrolledCourses.push({
        ...course,
        completedLessons: []
      });
      events.emit("enrollmentConfirmed", course.title);
      return "Enrollment successful";
    })
    .catch((err) => {
      events.emit("operationFailed", err);
      throw err;
    });
}

module.exports = enrollCourse;