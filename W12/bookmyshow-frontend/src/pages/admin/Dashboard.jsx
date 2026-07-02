// src/pages/admin/Dashboard.jsx

/*
=========================================================
SPRINT 1 – ADMIN DASHBOARD


TOPICS COVERED:


✓ Functional Components
✓ Rendering Lists
✓ map()
✓ Dashboard Layout
✓ Reusable UI Patterns


WHY THIS COMPONENT?


Administrators need a quick overview
of the system.


Examples:


Total Movies
Total Shows
Total Bookings


Sprint 1:


Static Dashboard Shell


Sprint 7:


Analytics APIs
↓
Real-Time Statistics
↓
Charts & Insights


=======================================================
*/

import { useEffect, useState } from "react";

import { getDashboardStats } from "../../api/admin.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await getDashboardStats();

        setStats(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  const dashboardStats = [
    {
      title: "Movies",
      value: stats.totalMovies,
      description: "Movies currently available",
    },

    {
      title: "Shows",
      value: stats.totalShows,
      description: "Active show schedules",
    },

    {
      title: "Bookings",
      value: stats.totalBookings,
      description: "Total bookings made",
    },

    {
      title: "Users",
      value: stats.totalUsers,
      description: "Registered users",
    },
  ];

  return (
    <section>
      <header>
        <h1>Admin Dashboard</h1>

        <p>Welcome back. Here's a quick overview of the platform.</p>
      </header>

      <section style={styles.grid}>
        {dashboardStats.map((stat) => (
          <article key={stat.title} style={styles.card}>
            <h3>{stat.title}</h3>

            <h2>{stat.value}</h2>

            <p>{stat.description}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

const styles = {
  grid: {
    marginTop: "30px",

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",

    gap: "20px",
  },

  card: {
    background: "#fff",

    border: "1px solid #ddd",

    borderRadius: "8px",

    padding: "25px",
  },

  error: {
    color: "red",
  },
};
