const user = require("./user");
const events = require("./events");

async function completeLesson(courseId, lessonIndex) {
  try {
    const course = user.enrolledCourses.find(c => c.id === courseId);

    if (!course) throw "Not enrolled";

    if (course.completedLessons.includes(lessonIndex)) {
      throw "Lesson already completed";
    }

    course.completedLessons.push(lessonIndex);

    events.emit("lessonCompleted", course.title);

    return "Lesson completed";
  } catch (err) {
    events.emit("operationFailed", err);
    throw err;
  }
}

module.exports = completeLesson;