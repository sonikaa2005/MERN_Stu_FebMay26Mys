import { useState, useEffect, useRef, useCallback } from "react";

const API = "http://localhost:5000/api";

// ─── Helpers ──────────────────────────────────────────────────────
function cls(...a) { return a.filter(Boolean).join(" "); }

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function isNewUser(name) {
  const key = `lf_seen_${name.toLowerCase().trim()}`;
  if (sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "1");
  return true;
}

// ─── Reading-Progress Scroll Bar ──────────────────────────────────
function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = document.querySelector(".main-content");
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress-track">
      <div className="scroll-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3600);
  };
  return { toasts, toast: { success: m => add(m, "success"), error: m => add(m, "error"), info: m => add(m, "info"), warn: m => add(m, "warn") } };
}
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={cls("toast", `toast--${t.type}`)}>
          <span className="toast-icon">{t.type === "success" ? "✓" : t.type === "error" ? "✕" : t.type === "warn" ? "!" : "i"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Progress Ring ────────────────────────────────────────────────
function ProgressRing({ percent, size = 64, stroke = 6, color }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, percent));
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring" style={color ? { "--ring-color": color } : {}}>
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="ring-bg" />
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        className="ring-fill" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="ring-text">
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

// ─── Search Modal ─────────────────────────────────────────────────
function SearchModal({ courses, onClose, onEnroll, onDetails }) {
  const [q, setQ] = useState("");
  const inputRef = useRef();
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  const results = courses.filter(c =>
    !q.trim() || c.title.toLowerCase().includes(q.toLowerCase()) ||
    c.instructor.toLowerCase().includes(q.toLowerCase()) ||
    c.category.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <span className="search-modal-icon">⌕</span>
          <input ref={inputRef} className="search-modal-input"
            placeholder="Search courses, instructors, categories…"
            value={q} onChange={e => setQ(e.target.value)} />
          <button className="search-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="search-modal-results">
          {results.length === 0
            ? <div className="search-empty">No courses match "{q}"</div>
            : results.map(c => (
              <div key={c.id} className="search-result-item">
                <div className="sri-info">
                  <span className="sri-title">{c.title}</span>
                  <span className="sri-meta">{c.instructor} · {c.category}</span>
                </div>
                <div className="sri-actions">
                  <button className="btn btn--sm" onClick={() => { onDetails(c.id); onClose(); }}>Details</button>
                  <button className="btn btn--sm btn--primary" onClick={() => { onEnroll(c); onClose(); }}>Enroll</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="search-modal-hint">Press <kbd>Esc</kbd> to close</div>
      </div>
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">⚠</div>
        <p className="confirm-msg">{message}</p>
        <div className="confirm-btns">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn--danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ─── Header Bar ───────────────────────────────────────────────────
function TopBar({ name, theme, setTheme, onSearch, hasSearch }) {
  return (
    <header className="topbar">
      <ScrollProgressBar />
      <div className="topbar-left">
        <div className="breadcrumb">
          <span className="breadcrumb-root">LearnFlow</span>
        </div>
      </div>
      <div className="topbar-right">
        {hasSearch && (
          <button className="topbar-btn search-trigger" onClick={onSearch} title="Search (Ctrl+K)">
            <span>⌕</span>
            <span className="search-hint">Search</span>
            <kbd>Ctrl K</kbd>
          </button>
        )}
        <button className="topbar-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Toggle theme">
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <div className="topbar-avatar" title={name}>
          {name[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "courses",   icon: "◫", label: "Browse Courses" },
  { id: "details",   icon: "◉", label: "Course Details" },
  { id: "enroll",    icon: "+", label: "Enroll" },
  { id: "enrolled",  icon: "✓", label: "My Courses" },
  { id: "lesson",    icon: "▷", label: "Complete Lesson" },
  { id: "progress",  icon: "◎", label: "My Progress" },
  { id: "withdraw",  icon: "←", label: "Withdraw" },
];

function Sidebar({ active, setActive, name, enrolled, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const totalLessons = enrolled.reduce((s, c) => s + c.lessons.length, 0);
  const completedTotal = enrolled.reduce((s, c) => s + c.completedLessons.length, 0);
  const overallPct = totalLessons > 0 ? (completedTotal / totalLessons) * 100 : 0;

  return (
    <aside className={cls("sidebar", collapsed && "sidebar--collapsed")}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🎓</span>
          {!collapsed && <span className="logo-text">LearnFlow</span>}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-user">
          <div className="avatar">{name[0]?.toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name">{name}</div>
            <div className="user-role">Student</div>
          </div>
          {enrolled.length > 0 && (
            <div className="sidebar-mini-ring">
              <ProgressRing percent={overallPct} size={36} stroke={3} />
            </div>
          )}
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-group-label">{!collapsed && "MENU"}</div>
        {NAV_ITEMS.map(item => (
          <button key={item.id}
            className={cls("nav-item", active === item.id && "nav-item--active")}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {!collapsed && item.id === "enrolled" && enrolled.length > 0 && (
              <span className="nav-badge">{enrolled.length}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <span>⏻</span>{!collapsed && " Logout"}
        </button>
      </div>
    </aside>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────
function Section({ title, subtitle, children, action }) {
  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="section-action">{action}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── Badge & Card Helpers ─────────────────────────────────────────
const LEVEL_COLOR = { Beginner: "badge--green", Intermediate: "badge--yellow", Advanced: "badge--red" };
const CAT_ICON = { Programming: "⌨", Backend: "⚙", "Web Development": "◈", default: "◈" };

function CourseCard({ course, onAction, actionLabel }) {
  const [flipped, setFlipped] = useState(false);
  const icon = CAT_ICON[course.category] || CAT_ICON.default;
  return (
    <div className={cls("course-card", flipped && "course-card--flipped")} onClick={() => setFlipped(!flipped)}>
      <div className="course-card-inner">
        <div className="course-face course-face--front">
          <div className="course-category-icon">{icon}</div>
          <div className="course-meta">
            <span className={cls("badge", LEVEL_COLOR[course.level] || "badge--blue")}>{course.level}</span>
            <span className={cls("badge", course.status ? "badge--green" : "badge--gray")}>{course.status ? "Open" : "Closed"}</span>
          </div>
          <h3 className="course-title">{course.title}</h3>
          <p className="course-instructor">by {course.instructor}</p>
          <p className="course-category">{course.category}</p>
          <div className="course-footer">
            <span className="lesson-count">{course.lessons?.length || course.totalNumber} lessons</span>
            <span className="flip-hint">Tap for details →</span>
          </div>
        </div>
        <div className="course-face course-face--back">
          <h3 className="course-title">{course.title}</h3>
          {course.lessons && (
            <ul className="lesson-list">
              {course.lessons.map((l, i) => (
                <li key={i}><span className="lesson-num">{i}</span>{typeof l === "object" ? l.name : l}</li>
              ))}
            </ul>
          )}
          {onAction && (
            <button className="btn btn--primary card-action-btn"
              onClick={e => { e.stopPropagation(); onAction(course); }}>
              {actionLabel || "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────
function ActivityFeed({ items }) {
  if (!items.length) return null;
  return (
    <div className="activity-feed">
      {items.map((item, i) => (
        <div key={i} className="activity-item">
          <div className={cls("activity-dot", `activity-dot--${item.type}`)} />
          <div className="activity-body">
            <span className="activity-text">{item.text}</span>
            <span className="activity-time">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Motivational Quote ───────────────────────────────────────────
const QUOTES = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Learning is not attained by chance; it must be sought with ardor.", author: "Abigail Adams" },
  { text: "Education is the passport to the future.", author: "Malcolm X" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
];

// ─── Dashboard ────────────────────────────────────────────────────
function Dashboard({ name, isNew, courses, enrolled, activity, setActive }) {
  const totalLessons = enrolled.reduce((s, c) => s + c.lessons.length, 0);
  const completedTotal = enrolled.reduce((s, c) => s + c.completedLessons.length, 0);
  const overallPct = totalLessons > 0 ? (completedTotal / totalLessons) * 100 : 0;
  const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

  const greeting = isNew ? "Welcome to LearnFlow" : getTimeGreeting();
  const subtext = isNew
    ? "Great to have you here! Start by browsing our courses and enroll in something today."
    : "Welcome back! Pick up where you left off and keep that momentum going.";

  const stats = [
    { label: "Available",    value: courses.length,    icon: "◫", color: "stat--blue"   },
    { label: "Enrolled",     value: enrolled.length,   icon: "✓", color: "stat--green"  },
    { label: "Lessons Done", value: completedTotal,    icon: "▷", color: "stat--purple" },
    { label: "Completion",   value: `${Math.round(overallPct)}%`, icon: "◎", color: "stat--orange" },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <div className="wb-left">
          <p className="wb-greeting">{greeting},</p>
          <h1 className="welcome-title"><span className="accent">{name}</span> {isNew ? "👋" : "🔥"}</h1>
          <p className="welcome-sub">{subtext}</p>
          {isNew && (
            <button className="btn btn--primary wb-cta" onClick={() => setActive("courses")}>
              Browse Courses →
            </button>
          )}
        </div>
        <div className="wb-right">
          <div className="overall-ring">
            <ProgressRing percent={overallPct} size={100} stroke={9} />
            <p className="ring-caption">Overall Progress</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className={cls("stat-card", s.color)}>
            <span className="stat-icon">{s.icon}</span>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="dash-main">
          {enrolled.length > 0 ? (
            <div className="dashboard-section">
              <div className="dash-sec-header">
                <h3 className="dash-sec-title">Continue Learning</h3>
                <button className="link-btn" onClick={() => setActive("enrolled")}>View all →</button>
              </div>
              <div className="progress-list">
                {enrolled.map(c => {
                  const pct = c.lessons.length > 0
                    ? (c.completedLessons.length / c.lessons.length) * 100 : 0;
                  return (
                    <div key={c.id} className="progress-item" onClick={() => setActive("enrolled")}>
                      <span className="pi-avatar">{CAT_ICON[c.category] || "◈"}</span>
                      <div className="pi-info">
                        <span className="pi-title">{c.title}</span>
                        <span className="pi-instructor">by {c.instructor}</span>
                      </div>
                      <div className="pi-right">
                        <div className="pi-bar-wrap">
                          <div className="pi-bar" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="pi-pct">{Math.round(pct)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="dashboard-section">
              <div className="dash-sec-header">
                <h3 className="dash-sec-title">Get Started</h3>
              </div>
              <div className="empty-state">
                <span className="empty-icon">◫</span>
                <p>You haven't enrolled in any courses yet.</p>
                <button className="btn btn--primary" onClick={() => setActive("courses")}>
                  Explore Courses →
                </button>
              </div>
            </div>
          )}

          {activity.length > 0 && (
            <div className="dashboard-section">
              <div className="dash-sec-header">
                <h3 className="dash-sec-title">Recent Activity</h3>
              </div>
              <div className="widget">
                <ActivityFeed items={activity.slice(0, 6)} />
              </div>
            </div>
          )}
        </div>

        <div className="dash-side">
          <div className="widget">
            <div className="widget-title">Quick Actions</div>
            <div className="quick-actions">
              {[
                { icon: "◫", label: "Browse Courses", id: "courses" },
                { icon: "+", label: "Enroll in Course", id: "enroll" },
                { icon: "▷", label: "Complete a Lesson", id: "lesson" },
                { icon: "◎", label: "View My Progress", id: "progress" },
              ].map(a => (
                <button key={a.id} className="qa-btn" onClick={() => setActive(a.id)}>
                  <span>{a.icon}</span>{a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="widget">
            <div className="widget-title">Today's Quote</div>
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">— {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ADMIN SECTION
// ─────────────────────────────────────────────────────────────────

// ─── Admin Login Screen ───────────────────────────────────────────
function AdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMode, setLoginMode] = useState("username"); // "username" or "email"

  async function handleLogin() {
    setError("");
    if (!password) { setError("Password is required"); return; }
    if (loginMode === "username" && !username) { setError("Username is required"); return; }
    if (loginMode === "email" && !email) { setError("Email is required"); return; }

    setLoading(true);
    try {
      const body = loginMode === "username"
        ? { username, password }
        : { email, password };

      const r = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      if (data.success) {
        onLogin(data.token, data.admin);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-bg">
        <div className="login-orb login-orb--1" style={{ background: "var(--accent-2)" }} />
        <div className="login-orb login-orb--2" style={{ background: "var(--red)" }} />
        <div className="login-orb login-orb--3" />
      </div>
      <div className="login-card" style={{ maxWidth: 420 }}>
        <div className="login-brand">
          <span className="login-logo">🛡️</span>
          <h1 className="login-brand-name">Admin Portal</h1>
          <p className="login-tagline">LearnFlow Administration</p>
        </div>

        <div className="admin-login-tabs">
          <button
            className={cls("admin-tab", loginMode === "username" && "admin-tab--active")}
            onClick={() => setLoginMode("username")}
          >Username</button>
          <button
            className={cls("admin-tab", loginMode === "email" && "admin-tab--active")}
            onClick={() => setLoginMode("email")}
          >Email</button>
        </div>

        <div className="login-form" style={{ gap: 14 }}>
          {loginMode === "username" ? (
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="Enter username…"
                value={username} onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} autoFocus />
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="Enter email address…"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} autoFocus />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Enter password…"
              value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button className="btn btn--primary btn--full login-cta" onClick={handleLogin} disabled={loading}>
            {loading ? <span className="spinner" /> : "🛡️ Login as Admin →"}
          </button>

          <div className="admin-hint-box">
            <p className="admin-hint-title">Default Credentials</p>
            <p className="admin-hint">Username: <code>admin</code> / Password: <code>Admin@123</code></p>
            <p className="admin-hint">Username: <code>teacher</code> / Password: <code>Teacher@123</code></p>
          </div>

          <button className="link-btn" style={{ textAlign: "center" }} onClick={onBack}>
            ← Back to Student Login
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Topbar ─────────────────────────────────────────────────
function AdminTopBar({ admin, theme, setTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="breadcrumb">
          <span className="breadcrumb-root" style={{ color: "var(--accent-2)" }}>🛡️ Admin Portal</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <div className="topbar-avatar" style={{ background: "linear-gradient(135deg, var(--accent-2), var(--red))" }}
          title={admin.username}>
          {admin.username[0]?.toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-2)" }}>
          <div style={{ fontWeight: 600 }}>{admin.username}</div>
          <div style={{ fontSize: 10, color: "var(--accent-2)" }}>{admin.role}</div>
        </div>
      </div>
    </header>
  );
}

// ─── Admin Sidebar ────────────────────────────────────────────────
const ADMIN_NAV = [
  { id: "admin-dashboard", icon: "⊞", label: "Dashboard" },
  { id: "admin-courses",   icon: "◫", label: "Manage Courses" },
  { id: "admin-users",     icon: "◉", label: "User Overview" },
  { id: "admin-admins",    icon: "🛡️", label: "Admin Accounts", role: "superadmin" },
];

function AdminSidebar({ active, setActive, admin, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cls("sidebar", collapsed && "sidebar--collapsed")}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🛡️</span>
          {!collapsed && <span className="logo-text" style={{ color: "var(--accent-2)" }}>Admin</span>}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-user">
          <div className="avatar" style={{ background: "linear-gradient(135deg, var(--accent-2), var(--red))" }}>
            {admin.username[0]?.toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name">{admin.username}</div>
            <div className="user-role" style={{ color: "var(--accent-2)" }}>{admin.role}</div>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-group-label">{!collapsed && "ADMIN"}</div>
        {ADMIN_NAV.filter(item => !item.role || item.role === admin.role).map(item => (
          <button key={item.id}
            className={cls("nav-item", active === item.id && "nav-item--active")}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <span>⏻</span>{!collapsed && " Logout"}
        </button>
      </div>
    </aside>
  );
}

// ─── Admin Dashboard Overview ─────────────────────────────────────
function AdminDashboardView({ token }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/admin/stats`, { headers: { "x-admin-token": token } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ padding: 32, color: "var(--text-2)" }}>Loading stats…</div>;

  const cards = [
    { label: "Total Courses", value: stats.totalCourses, icon: "◫", color: "stat--blue" },
    { label: "Open Courses",  value: stats.openCourses,  icon: "✓", color: "stat--green" },
    { label: "Closed Courses",value: stats.closedCourses,icon: "✕", color: "stat--orange" },
    { label: "Total Lessons", value: stats.totalLessons, icon: "▷", color: "stat--purple" },
    { label: "User Enrolled", value: stats.enrolledCount,icon: "◉", color: "stat--blue" },
    { label: "Lessons Done",  value: stats.completedLessons, icon: "◎", color: "stat--green" },
  ];

  return (
    <div>
      <div className="welcome-banner" style={{ background: "linear-gradient(135deg, var(--surface), var(--surface-2))" }}>
        <div className="wb-left">
          <p className="wb-greeting">Admin Overview</p>
          <h1 className="welcome-title">🛡️ <span className="accent">Control Panel</span></h1>
          <p className="welcome-sub">
            Current active user: <strong style={{ color: "var(--text)" }}>{stats.currentUser || "None"}</strong>
          </p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: 24 }}>
        {cards.map(c => (
          <div key={c.label} className={cls("stat-card", c.color)}>
            <span className="stat-icon">{c.icon}</span>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-info-box" style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>
          ℹ️ Admin Capabilities
        </h3>
        <div className="admin-caps-grid">
          {[
            "View all courses with full lesson notes & video links",
            "Toggle course open/closed status",
            "Add new courses to the LMS",
            "Edit lesson notes and video links",
            "View student enrollment & progress",
            "Manage admin accounts (superadmin only)",
          ].map((cap, i) => (
            <div key={i} className="admin-cap-item">
              <span style={{ color: "var(--green)" }}>✓</span> {cap}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── File helpers ─────────────────────────────────────────────────
function fileIcon(mimetype) {
  if (!mimetype) return "📄";
  if (mimetype === "application/pdf") return "📕";
  if (mimetype.includes("word")) return "📘";
  if (mimetype.includes("powerpoint") || mimetype.includes("presentation")) return "📙";
  if (mimetype.startsWith("image/")) return "🖼️";
  if (mimetype === "text/plain") return "📄";
  return "📎";
}

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Admin Manage Courses ─────────────────────────────────────────
function AdminCoursesView({ token, toast }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editLesson, setEditLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({ notes: "", videoLink: "" });
  const [addingCourse, setAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", instructor: "", category: "", level: "Beginner", status: true });
  const [savingLesson, setSavingLesson] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API}/admin/courses`, { headers: { "x-admin-token": token } })
      .then(r => r.json()).then(setCourses).finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { load(); }, [load]);

  async function refreshSelected(id) {
    const upd = await fetch(`${API}/admin/courses/${id || selected?.id}`, { headers: { "x-admin-token": token } });
    const data = await upd.json();
    setSelected(data);
  }

  async function toggleStatus(id) {
    const r = await fetch(`${API}/admin/courses/${id}/toggle-status`, {
      method: "PATCH", headers: { "x-admin-token": token }
    });
    const data = await r.json();
    if (data.success) { toast.success(data.message); load(); }
    else toast.error(data.message);
  }

  function openEditLesson(courseId, li, lesson) {
    setEditLesson({ courseId, li });
    setLessonForm({ notes: lesson.notes || "", videoLink: lesson.videoLink || "" });
  }

  async function saveLesson() {
    if (!editLesson) return;
    setSavingLesson(true);
    const r = await fetch(`${API}/admin/courses/${editLesson.courseId}/lessons/${editLesson.li}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify(lessonForm)
    });
    const data = await r.json();
    setSavingLesson(false);
    if (data.success) {
      toast.success("Lesson updated!");
      setEditLesson(null);
      load();
      if (selected) await refreshSelected(selected.id);
    } else toast.error(data.message);
  }

  async function uploadFile(courseId, li, file) {
    setUploadingFile(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const r = await fetch(`${API}/admin/courses/${courseId}/lessons/${li}/files`, {
        method: "POST",
        headers: { "x-admin-token": token },
        body: formData
      });
      const data = await r.json();
      if (data.success) {
        toast.success(`"${file.name}" uploaded!`);
        if (selected) await refreshSelected(courseId);
      } else toast.error(data.message);
    } catch (e) { toast.error("Upload failed"); }
    setUploadingFile(false);
  }

  async function deleteFile(courseId, li, fileId, fileName) {
    if (!window.confirm(`Delete "${fileName}"?`)) return;
    const r = await fetch(`${API}/admin/courses/${courseId}/lessons/${li}/files/${fileId}`, {
      method: "DELETE", headers: { "x-admin-token": token }
    });
    const data = await r.json();
    if (data.success) {
      toast.success("File deleted");
      if (selected) await refreshSelected(courseId);
    } else toast.error(data.message);
  }

  async function addCourse() {
    if (!newCourse.title || !newCourse.instructor || !newCourse.category) {
      toast.error("Title, instructor and category are required"); return;
    }
    const r = await fetch(`${API}/admin/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ ...newCourse, lessons: [] })
    });
    const data = await r.json();
    if (data.success) {
      toast.success("Course added!");
      setAddingCourse(false);
      setNewCourse({ title: "", instructor: "", category: "", level: "Beginner", status: true });
      load();
    } else toast.error(data.message);
  }

  if (loading) return <div style={{ padding: 32, color: "var(--text-2)" }}>Loading courses…</div>;

  return (
    <div>
      <Section title="Manage Courses" subtitle="View, edit, and control all courses"
        action={
          <button className="btn btn--primary" onClick={() => setAddingCourse(!addingCourse)}>
            {addingCourse ? "✕ Cancel" : "+ Add Course"}
          </button>
        }>

        {addingCourse && (
          <div className="admin-form-card">
            <h4 style={{ marginBottom: 14, fontSize: 14, fontWeight: 700 }}>New Course</h4>
            <div className="admin-form-grid">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="Course title" value={newCourse.title}
                  onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Instructor</label>
                <input className="form-input" placeholder="Instructor name" value={newCourse.instructor}
                  onChange={e => setNewCourse(p => ({ ...p, instructor: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" placeholder="e.g. Programming" value={newCourse.category}
                  onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Level</label>
                <select className="form-input" value={newCourse.level}
                  onChange={e => setNewCourse(p => ({ ...p, level: e.target.value }))}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn btn--primary" onClick={addCourse}>Save Course</button>
              <button className="btn" onClick={() => setAddingCourse(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Course list */}
        <div className="admin-course-list">
          {courses.map(c => (
            <div key={c.id} className="admin-course-row">
              <div className="admin-course-info">
                <span className="admin-course-id">#{c.id}</span>
                <div>
                  <div className="admin-course-title">{c.title}</div>
                  <div className="admin-course-meta">{c.instructor} · {c.category} · {c.level}</div>
                </div>
              </div>
              <div className="admin-course-actions">
                <span className={cls("badge", c.status ? "badge--green" : "badge--gray")}>
                  {c.status ? "Open" : "Closed"}
                </span>
                <button className="btn btn--sm" onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                  {selected?.id === c.id ? "Hide Details" : "View / Edit"}
                </button>
                <button className={cls("btn btn--sm", c.status ? "btn--danger" : "btn--primary")}
                  onClick={() => toggleStatus(c.id)}>
                  {c.status ? "Close" : "Open"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected course lesson editor */}
        {selected && (
          <div className="admin-lesson-editor">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              📚 {selected.title} — Lessons & Content
            </h3>
            {selected.lessons.length === 0
              ? <p style={{ color: "var(--text-3)" }}>No lessons yet.</p>
              : selected.lessons.map((l, i) => (
                <div key={i} className="admin-lesson-card">
                  <div className="admin-lesson-header">
                    <div>
                      <span className="curriculum-num" style={{ marginRight: 8 }}>{i}</span>
                      <strong style={{ fontSize: 14 }}>{l.name}</strong>
                    </div>
                    <button className="btn btn--sm btn--primary"
                      onClick={() => editLesson?.courseId === selected.id && editLesson?.li === i
                        ? setEditLesson(null)
                        : openEditLesson(selected.id, i, l)}>
                      {editLesson?.courseId === selected.id && editLesson?.li === i ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {editLesson?.courseId === selected.id && editLesson?.li === i ? (
                    <div className="admin-lesson-form">
                      <div className="form-group">
                        <label className="form-label">Notes</label>
                        <textarea className="form-input admin-textarea"
                          placeholder="Enter lesson notes…"
                          value={lessonForm.notes}
                          onChange={e => setLessonForm(p => ({ ...p, notes: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Video Link</label>
                        <input className="form-input" type="url" placeholder="https://youtube.com/watch?v=…"
                          value={lessonForm.videoLink}
                          onChange={e => setLessonForm(p => ({ ...p, videoLink: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">📎 Attach Files <span style={{ fontWeight: 400, color: "var(--text-3)", fontSize: 11 }}>(PDF, Word, PPT, images — max 20 MB)</span></label>
                        <label className={cls("btn btn--sm", uploadingFile ? "btn--ghost" : "btn--secondary")}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: uploadingFile ? "not-allowed" : "pointer" }}>
                          {uploadingFile ? <><span className="spinner" /> Uploading…</> : "📁 Choose File"}
                          <input type="file" style={{ display: "none" }}
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.webp,.txt"
                            disabled={uploadingFile}
                            onChange={e => { if (e.target.files[0]) uploadFile(selected.id, i, e.target.files[0]); e.target.value = ""; }} />
                        </label>
                        {(l.files || []).length > 0 && (
                          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                            {(l.files || []).map(f => (
                              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--bg-2)", borderRadius: 6, fontSize: 12 }}>
                                <span>{fileIcon(f.mimetype)}</span>
                                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.originalName}</span>
                                <span style={{ color: "var(--text-3)", flexShrink: 0 }}>{formatSize(f.size)}</span>
                                <a href={`${API.replace("/api", "")}${f.url || `/api/uploads/${f.filename}`}`} target="_blank" rel="noopener noreferrer"
                                  className="btn btn--sm btn--ghost" style={{ padding: "2px 8px" }}>View</a>
                                <button className="btn btn--sm btn--danger" style={{ padding: "2px 8px" }}
                                  onClick={() => deleteFile(selected.id, i, f.id, f.originalName)}>✕</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button className="btn btn--primary btn--sm" onClick={saveLesson} disabled={savingLesson}>
                        {savingLesson ? <span className="spinner" /> : "Save Changes"}
                      </button>
                    </div>
                  ) : (
                    <div className="admin-lesson-content">
                      {l.notes && (
                        <div className="lesson-notes-box">
                          <span className="lesson-content-label">📝 Notes</span>
                          <p>{l.notes}</p>
                        </div>
                      )}
                      {l.videoLink && (
                        <div className="lesson-video-box">
                          <span className="lesson-content-label">🎬 Video</span>
                          <a href={l.videoLink} target="_blank" rel="noopener noreferrer"
                            className="admin-video-link" onClick={e => e.stopPropagation()}>
                            {l.videoLink}
                          </a>
                        </div>
                      )}
                      {(l.files || []).length > 0 && (
                        <div className="lesson-files-box">
                          <span className="lesson-content-label">📎 Attachments ({l.files.length})</span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                            {l.files.map(f => (
                              <span key={f.id} style={{ fontSize: 12, padding: "3px 8px", background: "var(--bg-2)", borderRadius: 4 }}>
                                {fileIcon(f.mimetype)} {f.originalName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {!l.notes && !l.videoLink && !(l.files || []).length && (
                        <p style={{ fontSize: 12, color: "var(--text-3)" }}>No content yet. Click Edit to add notes, video, or files.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}
      </Section>
    </div>
  );
}

// ─── Admin Users View ─────────────────────────────────────────────
function AdminUsersView({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/admin/users`, { headers: { "x-admin-token": token } })
      .then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ padding: 32, color: "var(--text-2)" }}>Loading…</div>;

  const u = data?.currentUser;

  return (
    <Section title="User Overview" subtitle="Active student and enrollment data">
      <div className="admin-user-card">
        <div className="admin-user-header">
          <div className="avatar" style={{ width: 48, height: 48, fontSize: 20 }}>
            {u?.name ? u.name[0]?.toUpperCase() : "?"}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{u?.name || "No active user"}</div>
            <div style={{ fontSize: 12, color: "var(--text-3)" }}>Student Account</div>
          </div>
        </div>

        {u?.enrolledCourses?.length > 0 ? (
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, margin: "16px 0 10px", color: "var(--text-2)" }}>
              ENROLLED COURSES ({u.enrolledCourses.length})
            </h4>
            {u.enrolledCourses.map(c => (
              <div key={c.id} className="admin-enroll-row">
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                    {c.completedLessons}/{c.totalLessons} lessons completed
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="pi-bar-wrap" style={{ width: 120 }}>
                    <div className="pi-bar" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="pi-pct">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-3)", marginTop: 12, fontSize: 13 }}>
            {u?.name ? "This student has not enrolled in any courses." : "No active user session found."}
          </p>
        )}
      </div>
    </Section>
  );
}

// ─── Admin Accounts View ──────────────────────────────────────────
function AdminAccountsView({ token }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/admin/admins`, { headers: { "x-admin-token": token } })
      .then(r => r.json())
      .then(data => {
        if (data.success === false) setError(data.message);
        else setAdmins(data);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ padding: 32, color: "var(--text-2)" }}>Loading…</div>;
  if (error) return (
    <div className="empty-state">
      <span className="empty-icon">🔒</span>
      <p>{error}</p>
    </div>
  );

  return (
    <Section title="Admin Accounts" subtitle="All registered admin users">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {admins.map(a => (
          <div key={a.id} className="admin-user-card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="avatar" style={{ background: "linear-gradient(135deg, var(--accent-2), var(--red))", width: 42, height: 42 }}>
              {a.username[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{a.username}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>{a.email}</div>
            </div>
            <span className={cls("badge", a.role === "superadmin" ? "badge--yellow" : "badge--blue")}>
              {a.role}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Admin App Shell ──────────────────────────────────────────────
function AdminApp({ token, admin, onLogout }) {
  const [activeSection, setActiveSection] = useState("admin-dashboard");
  const [theme, setTheme] = useState("dark");
  const { toasts, toast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const renderContent = () => {
    switch (activeSection) {
      case "admin-dashboard": return <AdminDashboardView token={token} />;
      case "admin-courses":   return <AdminCoursesView token={token} toast={toast} />;
      case "admin-users":     return <AdminUsersView token={token} />;
      case "admin-admins":    return <AdminAccountsView token={token} />;
      default: return null;
    }
  };

  return (
    <div className="app-shell">
      <ToastContainer toasts={toasts} />
      <AdminSidebar active={activeSection} setActive={setActiveSection} admin={admin} onLogout={onLogout} />
      <div className="app-right">
        <AdminTopBar admin={admin} theme={theme} setTheme={setTheme} />
        <main className="main-content">
          <div className="content-inner">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STUDENT SECTION (existing + enhanced with notes/video)
// ─────────────────────────────────────────────────────────────────

// ─── Lesson Notes Modal (for enrolled students) ───────────────────
function LessonNotesModal({ lesson, onClose, onMarkComplete }) {
  const [marking, setMarking] = useState(false);
  const [marked, setMarked] = useState(lesson.done || false);

  async function handleMarkComplete() {
    if (marked || marking) return;
    setMarking(true);
    try {
      const r = await fetch(`${API}/progress/${lesson.courseId}/${lesson.lessonIndex}`, { method: "POST" });
      const data = await r.json();
      if (data.success) {
        setMarked(true);
        if (onMarkComplete) onMarkComplete(lesson.courseId, lesson.lessonIndex);
      }
    } catch (e) { /* ignore */ }
    setMarking(false);
  }

  const files = lesson.files || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <span className="search-modal-icon">📖</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{lesson.name}</span>
          {marked && <span style={{ fontSize: 12, color: "var(--accent-green, #4ade80)", fontWeight: 600, marginRight: 8 }}>✓ Completed</span>}
          <button className="search-modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16, maxHeight: "65vh", overflowY: "auto" }}>
          {/* Notes */}
          {lesson.notes ? (
            <div className="lesson-notes-box">
              <span className="lesson-content-label">📝 Lesson Notes</span>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-2)", whiteSpace: "pre-wrap" }}>{lesson.notes}</p>
            </div>
          ) : (
            <div style={{ padding: "12px 16px", background: "var(--surface-2, var(--bg-2))", borderRadius: 8, color: "var(--text-3)", fontSize: 13 }}>
              No notes available for this lesson yet.
            </div>
          )}

          {/* Video */}
          {lesson.videoLink ? (
            <div className="lesson-video-box">
              <span className="lesson-content-label">🎬 Video Tutorial</span>
              <a href={lesson.videoLink} target="_blank" rel="noopener noreferrer" className="video-link-btn">
                ▶ Watch Video Lesson
              </a>
            </div>
          ) : (
            <div style={{ padding: "12px 16px", background: "var(--surface-2, var(--bg-2))", borderRadius: 8, color: "var(--text-3)", fontSize: 13 }}>
              No video available for this lesson yet.
            </div>
          )}

          {/* File Attachments */}
          {files.length > 0 && (
            <div className="lesson-notes-box">
              <span className="lesson-content-label">📎 Lesson Materials ({files.length})</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {files.map(f => (
                  <a key={f.id}
                    href={`http://localhost:5000${f.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                      background: "var(--bg-2)", borderRadius: 8, textDecoration: "none",
                      border: "1px solid var(--border, rgba(255,255,255,0.08))",
                      transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-3, var(--bg-2))"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--bg-2)"}>
                    <span style={{ fontSize: 22 }}>{fileIcon(f.mimetype)}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {f.originalName}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-3)" }}>{formatSize(f.size)}</div>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--accent)", flexShrink: 0 }}>Open ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            className={cls("btn", marked ? "btn--ghost" : "btn--primary")}
            style={{ marginTop: 4 }}
            onClick={handleMarkComplete}
            disabled={marked || marking}>
            {marking ? <span className="spinner" /> : marked ? "✓ Lesson Completed" : "Mark as Complete"}
          </button>
        </div>
        <div className="search-modal-hint">Press <kbd>Esc</kbd> to close</div>
      </div>
    </div>
  );
}

// ─── Main Student App ─────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [isNew_, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActive] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [showSearch, setShowSearch] = useState(false);
  const [confirm, setConfirm] = useState(null);

  // Admin state
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  // Data
  const [courses, setCourses] = useState([]);
  const [details, setDetails] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  const [progress, setProgress] = useState([]);
  const [activity, setActivity] = useState([]);

  // Form fields
  const [courseId, setCourseId] = useState("");
  const [enrollId, setEnrollId] = useState("");
  const [withdrawId, setWithdrawId] = useState("");
  const [progressCourse, setProgressCourse] = useState("");
  const [lessonIndex, setLessonIndex] = useState("");

  // Lesson notes modal
  const [notesLesson, setNotesLesson] = useState(null);

  // Admin full course data (with notes/video) for enrolled view
  const [enrolledFull, setEnrolledFull] = useState([]);

  const { toasts, toast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Ctrl+K shortcut
  useEffect(() => {
    if (!loggedIn) return;
    const fn = e => { if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setShowSearch(s => !s); } };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [loggedIn]);

  function addActivity(text, type = "info") {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setActivity(p => [{ text, type, time }, ...p].slice(0, 20));
  }

  async function apiCall(fn) {
    setLoading(true);
    try { await fn(); } catch (e) { toast.error(e.message || "An error occurred"); } finally { setLoading(false); }
  }

  async function login() {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    await apiCall(async () => {
      const r = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      await r.json();
      const newUser = isNewUser(name);
      setIsNew(newUser);
      setLoggedIn(true);
      const cr = await fetch(`${API}/courses`);
      setCourses(await cr.json());
      const er = await fetch(`${API}/enrolled`);
      setEnrolled(await er.json());
      toast.success(newUser ? `Welcome, ${name}! 🎓` : `${getTimeGreeting()}, ${name}! 🔥`);
      addActivity(`Logged in as ${name}`, "info");
    });
  }

  async function viewCourses() {
    await apiCall(async () => {
      const r = await fetch(`${API}/courses`);
      setCourses(await r.json());
    });
  }

  async function viewDetails(id) {
    const cid = id || courseId;
    if (!cid) { toast.error("Please enter a Course ID"); return; }
    await apiCall(async () => {
      const r = await fetch(`${API}/courses/${cid}`);
      const data = await r.json();
      if (!data) { toast.error("Course not found"); return; }
      setDetails(data);
      setCourseId(String(cid));
      setActive("details");
    });
  }

  async function enrollCourse(course) {
    const id = course?.id || enrollId;
    if (!id) { toast.error("Please enter a Course ID"); return; }
    await apiCall(async () => {
      const r = await fetch(`${API}/enroll/${id}`, { method: "POST" });
      const data = await r.json();
      if (data.success) {
        toast.success(data.message);
        addActivity(`Enrolled in course #${id}`, "success");
        await refreshEnrolled();
      } else toast.error(data.message);
    });
  }

  async function refreshEnrolled() {
    const r = await fetch(`${API}/enrolled`);
    setEnrolled(await r.json());
  }

  async function viewEnrolled() { await apiCall(refreshEnrolled); }

  async function completeLesson() {
    if (!progressCourse || lessonIndex === "") {
      toast.error("Please enter valid course ID and lesson index"); return;
    }
    await apiCall(async () => {
      const r = await fetch(`${API}/progress/${progressCourse}/${lessonIndex}`, { method: "POST" });
      const data = await r.json();
      if (data.success) {
        toast.success(data.message);
        addActivity(`Completed lesson ${lessonIndex} in course #${progressCourse}`, "success");
        await refreshEnrolled();
      } else toast.error(data.message);
    });
  }

  async function viewProgress() {
    await apiCall(async () => {
      const r = await fetch(`${API}/progress`);
      setProgress(await r.json());
    });
  }

  async function withdraw() {
    if (!withdrawId) { toast.error("Please enter a Course ID"); return; }
    setConfirm({
      message: `Are you sure you want to withdraw from course #${withdrawId}? All your progress will be lost.`,
      onConfirm: async () => {
        setConfirm(null);
        await apiCall(async () => {
          const r = await fetch(`${API}/withdraw/${withdrawId}`, { method: "DELETE" });
          const data = await r.json();
          if (data.success) {
            toast.success(data.message);
            addActivity(`Withdrew from course #${withdrawId}`, "warn");
            setWithdrawId("");
            await refreshEnrolled();
          } else toast.error(data.message);
        });
      }
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    setName("");
    setCourses([]); setDetails(null); setEnrolled([]); setProgress([]); setActivity([]);
    setCourseId(""); setEnrollId(""); setWithdrawId(""); setProgressCourse(""); setLessonIndex("");
    toast.info("Logged out. See you soon!");
  }

  // Admin handlers
  function handleAdminLogin(token, admin) {
    setAdminToken(token);
    setAdminInfo(admin);
    setShowAdminLogin(false);
  }

  async function handleAdminLogout() {
    if (adminToken) {
      await fetch(`${API}/admin/logout`, { method: "POST", headers: { "x-admin-token": adminToken } });
    }
    setAdminToken(null);
    setAdminInfo(null);
    toast.info("Admin logged out.");
  }

  // ── Admin app
  if (adminToken && adminInfo) {
    return <AdminApp token={adminToken} admin={adminInfo} onLogout={handleAdminLogout} />;
  }

  // ── Admin login screen
  if (showAdminLogin) {
    return (
      <>
        <ToastContainer toasts={toasts} />
        <AdminLogin onLogin={handleAdminLogin} onBack={() => setShowAdminLogin(false)} />
      </>
    );
  }

  // ── Student login
  if (!loggedIn) {
    return (
      <div className="login-screen">
        <ToastContainer toasts={toasts} />
        <div className="login-bg">
          <div className="login-orb login-orb--1" />
          <div className="login-orb login-orb--2" />
          <div className="login-orb login-orb--3" />
        </div>
        <div className="login-card">
          <div className="login-brand">
            <span className="login-logo">🎓</span>
            <h1 className="login-brand-name">LearnFlow</h1>
            <p className="login-tagline">Your intelligent learning companion</p>
          </div>
          <div className="login-form">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" placeholder="Enter your name…"
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()} autoFocus />
            <button className="btn btn--primary btn--full login-cta" onClick={login} disabled={loading}>
              {loading ? <span className="spinner" /> : "Start Learning →"}
            </button>
            <button className="btn btn--full" style={{ marginTop: 4 }} onClick={() => setShowAdminLogin(true)}>
              🛡️ Admin Login
            </button>
          </div>
          <div className="login-features">
            {["Track progress", "Enroll in courses", "Complete lessons"].map(f => (
              <span key={f} className="feature-pill">✓ {f}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Main student app
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard name={name} isNew={isNew_} courses={courses} enrolled={enrolled} activity={activity} setActive={setActive} />;

      case "courses":
        return (
          <Section title="Browse Courses" subtitle="Discover courses across all categories"
            action={<button className="btn btn--primary" onClick={viewCourses}>{loading ? <span className="spinner" /> : "↻ Refresh"}</button>}>
            {courses.length === 0
              ? <div className="empty-state"><span className="empty-icon">◫</span><p>Click "Refresh" to load available courses</p></div>
              : <div className="course-grid">
                {courses.map(c => <CourseCard key={c.id} course={c} onAction={enrollCourse} actionLabel="Enroll Now" />)}
              </div>}
          </Section>
        );

      case "details":
        return (
          <Section title="Course Details" subtitle="Look up detailed information for any course">
            <div className="form-row">
              <input className="form-input" type="number" min="1" placeholder="Enter Course ID"
                value={courseId} onChange={e => setCourseId(e.target.value)} />
              <button className="btn btn--primary" onClick={() => viewDetails(null)} disabled={loading}>
                {loading ? <span className="spinner" /> : "View Details"}
              </button>
            </div>
            {details && (
              <div className="detail-card">
                <div className="detail-head">
                  <h2 className="detail-title">{details.title}</h2>
                  <div className="detail-badges">
                    <span className={cls("badge", LEVEL_COLOR[details.level] || "badge--blue")}>{details.level}</span>
                    <span className={cls("badge", details.status ? "badge--green" : "badge--gray")}>{details.status ? "Open" : "Closed"}</span>
                  </div>
                </div>
                <div className="detail-meta">
                  <div className="detail-meta-item"><span>Instructor</span><strong>{details.instructor}</strong></div>
                  <div className="detail-meta-item"><span>Category</span><strong>{details.category}</strong></div>
                  <div className="detail-meta-item"><span>Lessons</span><strong>{details.lessons?.length}</strong></div>
                </div>
                <h4 className="lessons-heading">Curriculum</h4>
                <div className="curriculum">
                  {details.lessons?.map((l, i) => (
                    <div key={i} className="curriculum-item">
                      <span className="curriculum-num">{i}</span>
                      <span className="curriculum-name">{typeof l === "object" ? l.name : l}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn--primary enroll-cta" onClick={() => enrollCourse({ id: details.id })}>
                  Enroll in this Course
                </button>
              </div>
            )}
          </Section>
        );

      case "enroll":
        return (
          <Section title="Enroll in a Course" subtitle="Join a course to start learning">
            <div className="enroll-panel">
              <div className="form-group">
                <label className="form-label">Course ID</label>
                <div className="form-row">
                  <input className="form-input" type="number" min="1" placeholder="Enter Course ID"
                    value={enrollId} onChange={e => setEnrollId(e.target.value)} />
                  <button className="btn btn--primary" onClick={() => enrollCourse(null)} disabled={loading}>
                    {loading ? <span className="spinner" /> : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
            {courses.length > 0 && (
              <div>
                <p className="enroll-quick-title">Quick Enroll</p>
                <div className="quick-enroll-grid">
                  {courses.map(c => (
                    <div key={c.id} className="quick-card" onClick={() => enrollCourse(c)}>
                      <span className="quick-id">#{c.id}</span>
                      <span className="quick-title">{c.title}</span>
                      <span className="quick-sub">{c.instructor}</span>
                      <span className="quick-action">Enroll →</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>
        );

      case "enrolled":
        return (
          <Section title="My Courses" subtitle="Courses you are enrolled in"
            action={<button className="btn btn--primary" onClick={viewEnrolled}>{loading ? <span className="spinner" /> : "↻ Refresh"}</button>}>
            {enrolled.length === 0
              ? <div className="empty-state"><span className="empty-icon">✓</span><p>No enrolled courses yet</p></div>
              : <div className="course-grid">
                {enrolled.map(c => {
                  const pct = c.lessons.length > 0 ? (c.completedLessons.length / c.lessons.length) * 100 : 0;
                  return (
                    <div key={c.id} className="enrolled-card">
                      <div className="ec-top">
                        <div>
                          <div className="ec-title">{c.title}</div>
                          <div className="ec-instructor">by {c.instructor}</div>
                        </div>
                        <ProgressRing percent={pct} size={54} stroke={5} />
                      </div>
                      <div className="ec-progress-bar">
                        <div className="ec-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="ec-lessons">
                        {c.lessons.map((l, i) => {
                          const lessonName = typeof l === "object" ? l.name : l;
                          const done = c.completedLessons.includes(i);
                          return (
                            <span key={i} className={cls("lesson-chip", done && "lesson-chip--done")}
                              title="Click to view notes & video"
                              onClick={() => {
                                fetch(`${API}/courses/${c.id}/lessons/${i}`)
                                  .then(r => r.json())
                                  .then(lessonData => {
                                    setNotesLesson({
                                      name: lessonData.name || lessonName,
                                      notes: lessonData.notes || "",
                                      videoLink: lessonData.videoLink || "",
                                      files: lessonData.files || [],
                                      courseId: c.id,
                                      lessonIndex: i,
                                      done
                                    });
                                  });
                              }}>
                              {done ? "✓" : i} {lessonName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>}
          </Section>
        );

      case "lesson":
        return (
          <Section title="Complete a Lesson" subtitle="Mark lessons as done to track your progress">
            <div className="lesson-form">
              <div className="form-group">
                <label className="form-label">Course ID</label>
                <input className="form-input" type="number" min="1" placeholder="Enter Course ID"
                  value={progressCourse} onChange={e => setProgressCourse(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Lesson Index</label>
                <input className="form-input" type="number" min="0" placeholder="Enter Lesson Index (0-based)"
                  value={lessonIndex} onChange={e => setLessonIndex(e.target.value)} />
              </div>
              <button className="btn btn--primary" onClick={completeLesson} disabled={loading}>
                {loading ? <span className="spinner" /> : "✓ Mark as Completed"}
              </button>
            </div>
            {enrolled.length > 0 && (
              <div className="enrolled-lessons-ref">
                <h4>Your Enrolled Courses & Lessons:</h4>
                {enrolled.map(c => (
                  <div key={c.id} className="ref-course">
                    <div className="ref-head"><strong>#{c.id}</strong> {c.title}</div>
                    <div className="ref-lessons">
                      {c.lessons.map((l, i) => {
                        const lessonName = typeof l === "object" ? l.name : l;
                        const done = c.completedLessons.includes(i);
                        return (
                          <span key={i} className={cls("lesson-chip", done && "lesson-chip--done")}
                            title="Click to view notes & video"
                            onClick={() => {
                              fetch(`${API}/courses/${c.id}/lessons/${i}`)
                                .then(r => r.json())
                                .then(lessonData => {
                                  setNotesLesson({
                                    name: lessonData.name || lessonName,
                                    notes: lessonData.notes || "",
                                    videoLink: lessonData.videoLink || "",
                                    files: lessonData.files || [],
                                    courseId: c.id,
                                    lessonIndex: i,
                                    done
                                  });
                                })
                                .catch(() => {
                                  setProgressCourse(String(c.id));
                                  setLessonIndex(String(i));
                                });
                            }}>
                            {done ? "✓" : i} {lessonName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        );

      case "progress":
        return (
          <Section title="My Progress" subtitle="Track your learning journey"
            action={<button className="btn btn--primary" onClick={viewProgress}>{loading ? <span className="spinner" /> : "↻ Refresh"}</button>}>
            {progress.length === 0
              ? <div className="empty-state"><span className="empty-icon">◎</span><p>Click "Refresh" to load progress</p></div>
              : <div className="progress-grid">
                {progress.map((p, i) => (
                  <div key={i} className="prog-card">
                    <div className="prog-card-top">
                      <ProgressRing percent={parseFloat(p.progress)} size={72} stroke={7} />
                      <div>
                        <div className="prog-title">{p.course}</div>
                        <div className="prog-label">{p.progress}% complete</div>
                      </div>
                    </div>
                    <div className="prog-bar-wrap">
                      <div className="prog-bar-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>}
          </Section>
        );

      case "withdraw":
        return (
          <Section title="Withdraw from a Course" subtitle="Leave a course and reset your progress">
            <div className="withdraw-panel">
              <div className="withdraw-warning">
                ⚠ Withdrawing will permanently delete your progress in that course.
              </div>
              <div className="form-group">
                <label className="form-label">Course ID</label>
                <div className="form-row">
                  <input className="form-input" type="number" min="1" placeholder="Enter Course ID"
                    value={withdrawId} onChange={e => setWithdrawId(e.target.value)} />
                  <button className="btn btn--danger" onClick={withdraw} disabled={loading}>
                    {loading ? <span className="spinner" /> : "Withdraw"}
                  </button>
                </div>
              </div>
            </div>
            {enrolled.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--text-2)" }}>
                  Select course to withdraw:
                </p>
                <div className="quick-enroll-grid">
                  {enrolled.map(c => (
                    <div key={c.id}
                      className={cls("quick-card quick-card--danger", withdrawId === String(c.id) && "quick-card--selected")}
                      onClick={() => setWithdrawId(String(c.id))}>
                      <span className="quick-id">#{c.id}</span>
                      <span className="quick-title">{c.title}</span>
                      <span className="quick-action">Select →</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>
        );

      default: return null;
    }
  };

  return (
    <div className="app-shell">
      {loading && <div className="global-loader" />}
      <ToastContainer toasts={toasts} />
      {showSearch && (
        <SearchModal courses={courses} onClose={() => setShowSearch(false)}
          onEnroll={enrollCourse} onDetails={viewDetails} />
      )}
      {confirm && (
        <ConfirmDialog message={confirm.message}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />
      )}
      {notesLesson && (
        <LessonNotesModal lesson={notesLesson} onClose={() => setNotesLesson(null)}
          onMarkComplete={async (courseId, lessonIndex) => {
            await refreshEnrolled();
            setNotesLesson(prev => prev ? { ...prev, done: true } : null);
          }} />
      )}

      <Sidebar active={activeSection} setActive={setActive}
        name={name} enrolled={enrolled} onLogout={handleLogout} />

      <div className="app-right">
        <TopBar name={name} theme={theme} setTheme={setTheme}
          onSearch={() => setShowSearch(true)} hasSearch={courses.length > 0} />
        <main className="main-content">
          <div className="content-inner">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
