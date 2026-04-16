const readline = require("readline");
const chalk = require("chalk");

const courses = require("./courses");
const enrollCourse = require("./enroll");
const completeLesson = require("./progress");
const withdrawCourse = require("./withdraw");
const user = require("./user");
const eventEmitter = require("./events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// EVENTS
eventEmitter.on("enrollmentConfirmed", (course) => {
  console.log(chalk.blue.bold(`Enrolled in ${course}`));
});

eventEmitter.on("lessonCompleted", (course) => {
  console.log(chalk.blue(`Lesson completed in ${course}`));
});

eventEmitter.on("courseWithdrawn", (course) => {
  console.log(chalk.blue(`Withdrawn from ${course}`));
});

// START
function start() {
  rl.question("Enter your name: ", (name) => {
    user.name = name;
    console.log(chalk.yellow(`Welcome ${name}`));
    menu();
  });
}

// MENU
function menu() {
  console.log(chalk.gray(`
========= LMS MENU =========
1. View All Courses
2. View Course Details
3. Enroll in Course
4. View Enrolled Courses
5. Mark Lesson Completed
6. View Progress
7. Withdraw from Course
8. Exit
============================
`));

  rl.question("Choose option: ", (choice) => {
    switch (choice) {

      // 1. VIEW ALL COURSES
      case "1":
        console.log(chalk.white("\nAvailable Courses:"));
        courses.forEach(c => {
          console.log(`${c.id}. ${c.title}`);
        });
        return menu();

      // 2. VIEW COURSE DETAILS
      case "2":
        rl.question("Enter course ID: ", (id) => {
          const course = courses.find(c => c.id == id);
          if (!course) {
            console.log(chalk.red("Invalid course ID"));
          } else {
            console.log(chalk.blue(`
Title: ${course.title}
Instructor: ${course.instructor}
Lessons: ${course.lessons.join(", ")}
Difficulty: ${course.difficulty}
Category: ${course.category}
            `));
          }
          menu();
        });
        return;

      // 3. ENROLL
      case "3":
        rl.question("Enter course ID to enroll: ", async (id) => {
          try {
            const course = courses.find(c => c.id == id);
            if (!course) throw "Invalid course";

            await enrollCourse(course);
          } catch (err) {
            console.log(chalk.red(err));
            eventEmitter.emit("operationFailed", err);
          }
          menu();
        });
        return;

      // 4. VIEW ENROLLED
      case "4":
        if (user.enrolledCourses.length === 0) {
          console.log(chalk.yellow("No enrolled courses"));
        } else {
          user.enrolledCourses.forEach(c => {
            console.log(`${c.id}. ${c.title}`);
          });
        }
        return menu();

      // 5. COMPLETE LESSON
      case "5":
        rl.question("Enter course ID: ", (cid) => {
          const course = user.enrolledCourses.find(c => c.id == cid);

          if (!course) {
            console.log(chalk.red("Not enrolled in this course"));
            return menu();
          }

          console.log("Lessons:");
          course.lessons.forEach((l, i) => {
            console.log(`${i}. ${l}`);
          });

          rl.question("Enter lesson index: ", async (lid) => {
            try {
              await completeLesson(parseInt(cid), parseInt(lid));
            } catch (err) {
              console.log(chalk.red(err));
            }
            menu();
          });
        });
        return;

      // 6. VIEW PROGRESS
      case "6":
        if (user.enrolledCourses.length === 0) {
          console.log(chalk.gray("No enrolled courses"));
        } else {
          user.enrolledCourses.forEach(c => {
            const total = c.lessons.length;
            const completed = c.completedLessons.length;
            const percent = ((completed / total) * 100).toFixed(2);

            console.log(chalk.black(`
Course: ${c.title}
Progress: ${percent}%
Completed Lessons: ${completed}/${total}
            `));
          });
        }
        return menu();

      // 7. WITHDRAW
      case "7":
        rl.question("Enter course ID: ", (id) => {
          console.log(withdrawCourse(parseInt(id)));
          menu();
        });
        return;

      // 8. EXIT
      case "8":
        console.log(chalk.green("Goodbye!"));
        rl.close();
        return;

      default:
        console.log(chalk.red("Invalid choice"));
        return menu();
    }
  });
}

start();