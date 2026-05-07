const enrollments = require("../data/enrollments");

const enrollCourse = (req, res) => {
  const enrollment = {
    userId: req.user.id,
    courseId: parseInt(req.params.courseId),
  };

  enrollments.push(enrollment);

  res.status(201).json({
    message: "Enrolled successfully",
  });
};

const getEnrollments = (req, res) => {
  const userEnrollments = enrollments.filter(
    (e) => e.userId === req.user.id
  );

  res.json(userEnrollments);
};

const withdrawCourse = (req, res) => {
  res.json({
    message: "Withdraw successful",
  });
};

module.exports = {
  enrollCourse,
  getEnrollments,
  withdrawCourse,
};
