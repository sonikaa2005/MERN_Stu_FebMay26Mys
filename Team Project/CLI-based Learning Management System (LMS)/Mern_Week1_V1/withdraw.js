const user = require("./user");
const events = require("./events");

function withdrawCourse(courseId) {
  const index = user.enrolledCourses.findIndex(c => c.id === courseId);

  if (index === -1) {
    events.emit("operationFailed", "Not enrolled");
    return;
  }

  const removed = user.enrolledCourses.splice(index, 1);
  events.emit("courseWithdrawn", removed[0].title);

  return "Withdrawn successfully";
}

module.exports = withdrawCourse;