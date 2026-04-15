const EventEmitter = require("events");
const chalk = require("chalk");

const emitter = new EventEmitter();

emitter.on("sessionStarted", (name) => {
  console.log(chalk.cyan(`Welcome ${name}`));
});

emitter.on("courseViewed", () => {
  console.log(chalk.blue("Viewing courses..."));
});

emitter.on("enrollmentStarted", () => {
  console.log(chalk.yellow("Processing enrollment..."));
});

emitter.on("enrollmentConfirmed", (course) => {
  console.log(chalk.green(`Enrolled in ${course}`));
});

emitter.on("lessonCompleted", (course) => {
  console.log(chalk.green(`Lesson completed in ${course}`));
});

emitter.on("progressViewed", () => {
  console.log(chalk.cyan("Showing progress..."));
});

emitter.on("courseWithdrawn", (course) => {
  console.log(chalk.yellow(`Withdrawn from ${course}`));
});

emitter.on("operationFailed", (msg) => {
  console.log(chalk.red(`Error: ${msg}`));
});

module.exports = emitter;