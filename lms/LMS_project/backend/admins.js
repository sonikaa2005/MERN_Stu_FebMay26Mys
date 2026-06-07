// Admin credentials store
// In a real app, passwords would be hashed with bcrypt
const admins = [
  {
    id: 1,
    username: "admin",
    email: "admin@learnflow.com",
    password: "Admin@123",
    role: "superadmin"
  },
  {
    id: 2,
    username: "teacher",
    email: "teacher@learnflow.com",
    password: "Teacher@123",
    role: "admin"
  }
];

module.exports = admins;
