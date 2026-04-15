const user = require('./user');
const emitter = require('./events');

async function completeLesson(courseId, lessonIndex) {
  try {
    const course = user.enrolledCourses[courseId];

    if (!course) throw "Not enrolled in this course";

    if (course.completedLessons.includes(lessonIndex)) {
      throw "Lesson already completed";
    }

    course.completedLessons.push(lessonIndex);

    const progress = (course.completedLessons.length / course.lessons.length) * 100;

    emitter.emit("lessonCompleted", course.title);

    return progress.toFixed(2);
  } catch (err) {
    throw err;
  }
}

module.exports = completeLesson;