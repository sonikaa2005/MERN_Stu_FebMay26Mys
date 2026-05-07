const courses = require("../data/courses");

const getCourses = (req, res) => {
  res.json(courses);
};

const getCourseById = (req, res) => {
  const course = courses.find(
    (c) => c.id === parseInt(req.params.id)
  );

  if (!course) {
    return res.status(404).json({
      error: "Course not found",
    });
  }

  res.json(course);
};

const createCourse = (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    ...req.body,
  };

  courses.push(newCourse);

  res.status(201).json(newCourse);
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
};
