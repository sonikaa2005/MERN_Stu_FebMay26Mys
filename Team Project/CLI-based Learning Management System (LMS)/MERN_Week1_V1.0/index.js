// index.js

const readline = require("readline");
const chalk = require("chalk");

const courses = require("./courses");
const enrollCourse = require("./enroll");
const withdrawCourse = require("./withdraw");

const {
  user,
  setUserName
} = require("./user");

const {
  completeLesson,
  getProgress
} = require("./progress");

const {
  validateInput,
  validateCourseId,
  validateLesson
} = require("./validator");

const emitter = require("./events");

// CLI Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function startApp() {
  rl.question("Enter your name: ", (name) => {
    validateInput(name, (err, validName) => {
      if (err) {
        if (err === "Maximum attempts reached") {
          console.log(chalk.red("Too many attempts. Exiting..."));
          return rl.close();
        }
        return startApp();
      }

      setUserName(validName);
      emitter.emit("sessionStarted", validName);
      showMenu();
    });
  });
}

function showMenu() {
  console.log(`
    LMS MENU
1. View all courses
2. View course details
3. Enroll in a course
4. View enrolled courses
5. Mark lesson as completed
6. View progress
7. Withdraw from course
8. Exit
`);

  rl.question("Choose an option: ", handleMenu);
}


function handleMenu(choice) {
  switch (choice) {
    case "1":
      viewCourses();
      break;

    case "2":
      viewCourseDetails();
      break;

    case "3":
      enroll();
      break;

    case "4":
      viewEnrolled();
      break;

    case "5":
      markLesson();
      break;

    case "6":
      viewProgress();
      break;

    case "7":
      withdraw();
      break;

    case "8":
      exitApp();
      return;

    default:
      console.log(chalk.red(" Invalid choice"));
  }

  setTimeout(showMenu, 500);
}


// 1. View all courses
function viewCourses() {
  console.log("\n Available Courses:");
  courses.forEach(c => {
    console.log(
      `${c.id}. ${c.title} | ${c.category} | ${c.difficulty}`
    );
  });
}

// 2. View course details
function viewCourseDetails() {
  rl.question("Enter Course ID: ", (id) => {
    validateCourseId(id, courses, (err, course) => {
      if (err) return console.log(err);

      emitter.emit("courseViewed", course);

      console.log(`
 Title: ${course.title}
 Instructor: ${course.instructor}
 Difficulty: ${course.difficulty}
 Category: ${course.category}
Lessons: ${course.lessons.join(", ")}
      `);
    });
  });
}

// 3. Enroll
function enroll() {
  rl.question("Enter Course ID: ", (id) => {
    validateCourseId(id, courses, (err) => {
      if (err) return;

      enrollCourse(id).catch(() => {});
    });
  });
}

// 4. View enrolled courses
function viewEnrolled() {
  console.log("\n🎓 Your Courses:");

  if (user.enrolledCourses.length === 0) {
    console.log("No courses enrolled");
    return;
  }

  user.enrolledCourses.forEach(c => {
    console.log(`${c.courseId}. ${c.title}`);
  });
}

// 5. Mark lesson complete
function markLesson() {
  rl.question("Enter Course ID: ", (id) => {
    const course = user.enrolledCourses.find(
      c => c.courseId == id
    );

    if (!course) {
      emitter.emit("operationFailed", "Not enrolled in course");
      return;
    }

    rl.question("Enter Lesson Name: ", (lessonName) => {
      validateLesson(course, lessonName, async (err, lesson) => {
        if (err) return;

        try {
          const result = await completeLesson(id, lesson);

          console.log(
            chalk.green(`Progress: ${result.progress}%`)
          );
        } catch (error) {
          // already handled in progress.js
        }
      });
    });
  });
}

// 6. View progress
function viewProgress() {
  const progressData = getProgress();

  if (typeof progressData === "string") {
    console.log(progressData);
    return;
  }

  console.log("\n Progress:");
  progressData.forEach(p => {
    console.log(
      `${p.course}: ${p.completed}/${p.total} (${p.progress}%)`
    );
  });

  emitter.emit("progressViewed");
}

// 7. Withdraw
function withdraw() {
  rl.question("Enter Course ID: ", (id) => {
    const result = withdrawCourse(id);

    if (result) {
      emitter.emit("courseWithdrawn", result);
    } else {
      emitter.emit("operationFailed", "Not enrolled");
    }
  });
}

// 8. Exit
function exitApp() {
  console.log(chalk.blue("\n Exiting LMS. Goodbye!"));
  rl.close();
}


startApp();