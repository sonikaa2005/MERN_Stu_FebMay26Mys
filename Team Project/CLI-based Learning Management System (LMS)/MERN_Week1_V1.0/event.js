// events.js

const EventEmitter = require("events");
const chalk = require("chalk");

const lmsEmitter = new EventEmitter();

// Session Start
lmsEmitter.on("sessionStarted", (name) => {
  console.log(chalk.blue(`\n Welcome, ${name}! LMS session started.`));
});

// Course Viewed
lmsEmitter.on("courseViewed", (course) => {
  console.log(chalk.cyan(`\n Viewing Course: ${course.title}`));
});

// Enrollment Started
lmsEmitter.on("enrollmentStarted", () => {
  console.log(chalk.yellow("\n Enrollment process started..."));
});

// Enrollment Confirmed
lmsEmitter.on("enrollmentConfirmed", (courseTitle) => {
  console.log(
    chalk.green(`\n Successfully enrolled in "${courseTitle}"`)
  );
});

// Lesson Completed
lmsEmitter.on("lessonCompleted", (lesson) => {
  console.log(
    chalk.magenta(`\n Lesson Completed: ${lesson}`)
  );
});

// Progress Viewed
lmsEmitter.on("progressViewed", () => {
  console.log(chalk.blue("\n Progress displayed successfully."));
});

// Course Withdrawn
lmsEmitter.on("courseWithdrawn", (courseTitle) => {
  console.log(
    chalk.red(`\n You have withdrawn from "${courseTitle}"`)
  );
});

// Operation Failed
lmsEmitter.on("operationFailed", (message) => {
  console.log(
    chalk.red(`\n Error: ${message}`)
  );
});

// General Info / Status
lmsEmitter.on("info", (message) => {
  console.log(chalk.white(`\n ℹ ${message}`));
});

module.exports = lmsEmitter;