const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const courses = require("./courses");
const { user } = require("./user");
const admins = require("./admins");
const enrollCourse = require("./enroll");
const completeLesson = require("./progress");
const withdrawCourse = require("./withdraw");
const events = require("./events");

const app = express();

// ─── Uploads directory setup ──────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer storage — keep original name, prefix with timestamp to avoid collisions
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}_${safe}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/png", "image/jpeg", "image/gif", "image/webp",
      "text/plain"
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("File type not allowed. Accepted: PDF, Word, PPT, images, text."));
  }
});

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/api/uploads", express.static(UPLOADS_DIR));

// ─── Simple in-memory admin session store ─────────────────────────
const adminSessions = {};

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (!token || !adminSessions[token]) {
    return res.status(401).json({ success: false, message: "Unauthorized. Please login as admin." });
  }
  req.admin = adminSessions[token];
  next();
}

// ════════════════════════════════════════════════════════════════════
// USER ROUTES (existing)
// ════════════════════════════════════════════════════════════════════

app.post("/api/login", (req, res) => {
  const { name } = req.body;
  user.name = name;
  res.json({
    success: true,
    message: `Welcome ${name}`
  });
});

app.get("/api/courses", (req, res) => {
  // Return courses with lesson names only (not notes/videos for students)
  const publicCourses = courses.map(c => ({
    ...c,
    lessons: c.lessons.map(l => l.name)
  }));
  res.json(publicCourses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  // Return with lesson names only for students
  res.json({
    ...course,
    lessons: course.lessons.map(l => l.name)
  });
});

// Get full lesson content (notes + video) for enrolled students
app.get("/api/courses/:id/lessons/:lessonIndex", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  // Check if user is enrolled in this course
  const enrolledCourse = user.enrolledCourses.find(c => c.id == req.params.id);
  if (!enrolledCourse) {
    return res.status(403).json({ message: "You are not enrolled in this course" });
  }

  const li = parseInt(req.params.lessonIndex);
  if (li < 0 || li >= course.lessons.length) {
    return res.status(400).json({ message: "Invalid lesson index" });
  }

  const lesson = course.lessons[li];
  res.json({
    index: li,
    name: lesson.name,
    notes: lesson.notes || "",
    videoLink: lesson.videoLink || "",
    files: (lesson.files || []).map(f => ({
      id: f.id,
      originalName: f.originalName,
      mimetype: f.mimetype,
      size: f.size,
      url: `/api/uploads/${f.filename}`
    }))
  });
});

app.post("/api/enroll/:id", async (req, res) => {
  try {
    const course = courses.find(c => c.id == req.params.id);
    const result = await enrollCourse(course);
    res.json({ success: true, message: result });
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
});

app.get("/api/enrolled", (req, res) => {
  // Return enrolled courses with lesson names only
  const enrolledPublic = user.enrolledCourses.map(c => ({
    ...c,
    lessons: Array.isArray(c.lessons)
      ? c.lessons.map(l => (typeof l === "object" ? l.name : l))
      : c.lessons
  }));
  res.json(enrolledPublic);
});

app.post("/api/progress/:courseId/:lessonIndex", async (req, res) => {
  try {
    const result = await completeLesson(
      Number(req.params.courseId),
      Number(req.params.lessonIndex)
    );
    res.json({ success: true, message: result });
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
});

app.get("/api/progress", (req, res) => {
  const progress = user.enrolledCourses.map(course => {
    const total = course.lessons.length;
    return {
      course: course.title,
      progress: ((course.completedLessons.length / total) * 100).toFixed(2)
    };
  });
  res.json(progress);
});

app.delete("/api/withdraw/:id", (req, res) => {
  try {
    const result = withdrawCourse(Number(req.params.id));
    res.json({ success: true, message: result });
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
});

// ════════════════════════════════════════════════════════════════════
// ADMIN AUTH ROUTES
// ════════════════════════════════════════════════════════════════════

// Admin Login — accepts username OR email + password
app.post("/api/admin/login", (req, res) => {
  const { username, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }
  if (!username && !email) {
    return res.status(400).json({ success: false, message: "Username or email is required" });
  }

  const admin = admins.find(a =>
    (username && a.username === username) ||
    (email && a.email === email)
  );

  if (!admin || admin.password !== password) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken();
  adminSessions[token] = {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    loginTime: new Date().toISOString()
  };

  events.emit("adminLogin", admin.username);

  res.json({
    success: true,
    message: `Welcome, ${admin.username}!`,
    token,
    admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    }
  });
});

// Admin Logout
app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = req.headers["x-admin-token"];
  const adminName = adminSessions[token]?.username;
  delete adminSessions[token];
  events.emit("adminLogout", adminName);
  res.json({ success: true, message: "Logged out successfully" });
});

// Verify admin token
app.get("/api/admin/verify", requireAdmin, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// ════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD ROUTES
// ════════════════════════════════════════════════════════════════════

// Get dashboard stats
app.get("/api/admin/stats", requireAdmin, (req, res) => {
  const totalCourses = courses.length;
  const openCourses = courses.filter(c => c.status).length;
  const closedCourses = courses.filter(c => !c.status).length;
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const enrolledCount = user.enrolledCourses.length;
  const completedLessons = user.enrolledCourses.reduce(
    (sum, c) => sum + c.completedLessons.length, 0
  );

  res.json({
    totalCourses,
    openCourses,
    closedCourses,
    totalLessons,
    enrolledCount,
    completedLessons,
    currentUser: user.name || "No active user"
  });
});

// Get ALL courses (admin — includes notes and video links)
app.get("/api/admin/courses", requireAdmin, (req, res) => {
  res.json(courses);
});

// Get single course with full details (admin)
app.get("/api/admin/courses/:id", requireAdmin, (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
});

// Add a new course (admin)
app.post("/api/admin/courses", requireAdmin, (req, res) => {
  const { title, instructor, category, level, status, lessons } = req.body;
  if (!title || !instructor || !category || !level) {
    return res.status(400).json({ success: false, message: "Title, instructor, category, and level are required" });
  }
  const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  const newCourse = {
    id: newId,
    title,
    instructor,
    category,
    level,
    status: status !== undefined ? status : true,
    totalNumber: lessons ? lessons.length : 0,
    lessons: lessons || []
  };
  courses.push(newCourse);
  res.json({ success: true, message: "Course added successfully", course: newCourse });
});

// Update a course (admin)
app.put("/api/admin/courses/:id", requireAdmin, (req, res) => {
  const index = courses.findIndex(c => c.id == req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: "Course not found" });

  const { title, instructor, category, level, status, lessons } = req.body;
  if (title) courses[index].title = title;
  if (instructor) courses[index].instructor = instructor;
  if (category) courses[index].category = category;
  if (level) courses[index].level = level;
  if (status !== undefined) courses[index].status = status;
  if (lessons) {
    courses[index].lessons = lessons;
    courses[index].totalNumber = lessons.length;
  }

  res.json({ success: true, message: "Course updated successfully", course: courses[index] });
});

// Toggle course status (admin)
app.patch("/api/admin/courses/:id/toggle-status", requireAdmin, (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  course.status = !course.status;
  res.json({ success: true, message: `Course is now ${course.status ? "Open" : "Closed"}`, status: course.status });
});

// Update lesson notes/video for a course (admin)
app.put("/api/admin/courses/:id/lessons/:lessonIndex", requireAdmin, (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });

  const li = parseInt(req.params.lessonIndex);
  if (li < 0 || li >= course.lessons.length) {
    return res.status(400).json({ success: false, message: "Invalid lesson index" });
  }

  const { notes, videoLink } = req.body;
  if (notes !== undefined) course.lessons[li].notes = notes;
  if (videoLink !== undefined) course.lessons[li].videoLink = videoLink;

  res.json({ success: true, message: "Lesson updated", lesson: course.lessons[li] });
});

// Upload a file attachment to a lesson (admin)
app.post("/api/admin/courses/:id/lessons/:lessonIndex/files", requireAdmin, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const course = courses.find(c => c.id == req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const li = parseInt(req.params.lessonIndex);
    if (li < 0 || li >= course.lessons.length) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "Invalid lesson index" });
    }

    if (!course.lessons[li].files) course.lessons[li].files = [];
    const fileEntry = {
      id: crypto.randomBytes(8).toString("hex"),
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };
    course.lessons[li].files.push(fileEntry);

    res.json({ success: true, message: "File uploaded", file: fileEntry });
  });
});

// Delete a file attachment from a lesson (admin)
app.delete("/api/admin/courses/:id/lessons/:lessonIndex/files/:fileId", requireAdmin, (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });

  const li = parseInt(req.params.lessonIndex);
  if (li < 0 || li >= course.lessons.length) {
    return res.status(400).json({ success: false, message: "Invalid lesson index" });
  }

  const files = course.lessons[li].files || [];
  const idx = files.findIndex(f => f.id === req.params.fileId);
  if (idx === -1) return res.status(404).json({ success: false, message: "File not found" });

  const fileEntry = files[idx];
  const filePath = path.join(UPLOADS_DIR, fileEntry.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  course.lessons[li].files.splice(idx, 1);

  res.json({ success: true, message: "File deleted" });
});

// Get all enrolled users info (admin)
app.get("/api/admin/users", requireAdmin, (req, res) => {
  res.json({
    currentUser: {
      name: user.name,
      enrolledCourses: user.enrolledCourses.map(c => ({
        id: c.id,
        title: c.title,
        completedLessons: c.completedLessons.length,
        totalLessons: c.lessons.length,
        progress: ((c.completedLessons.length / c.lessons.length) * 100).toFixed(1)
      }))
    }
  });
});

// Get list of all admins (superadmin only)
app.get("/api/admin/admins", requireAdmin, (req, res) => {
  if (req.admin.role !== "superadmin") {
    return res.status(403).json({ success: false, message: "Superadmin access required" });
  }
  const safeAdmins = admins.map(({ password, ...rest }) => rest);
  res.json(safeAdmins);
});

app.listen(5000, () => {
  console.log("Backend API Running : http://localhost:5000");
});
