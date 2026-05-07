const progress = require("../data/progress");

const markLesson = (req, res) => {
  const item = {
    userId: req.user.id,
    courseId: parseInt(req.params.courseId),
    lesson: req.body.lesson,
  };

  progress.push(item);

  res.json({
    message: "Lesson completed",
  });
};

const getProgress = (req, res) => {
  const userProgress = progress.filter(
    (p) =>
      p.userId === req.user.id &&
      p.courseId === parseInt(req.params.courseId)
  );

  res.json(userProgress);
};

module.exports = {
  markLesson,
  getProgress,
};
