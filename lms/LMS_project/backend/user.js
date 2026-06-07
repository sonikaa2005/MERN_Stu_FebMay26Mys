let user = {
  name: "",
  enrolledCourses: []
};

// Track active user sessions (keyed by session token)
const sessions = {};

module.exports = { user, sessions };
