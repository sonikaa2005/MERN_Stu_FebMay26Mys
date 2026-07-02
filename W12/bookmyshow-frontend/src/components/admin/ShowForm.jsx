// MERN_Stu_FebMay26Mys\W12\bookmyshow-frontend\src\components\admin\ShowForm.jsx

// Modified: Added useEffect for Edit functionality
import { useState, useEffect } from "react";

// Modified: Added initialData and buttonText props
export default function ShowForm({
  movies,
  onSubmit,
  initialData,
  buttonText,
}) {
  const [formData, setFormData] = useState({
    movieId: "",
    date: "",
    time: "",
    totalSeats: 50,
  });

  // ============================
  // Modified: Convert AM/PM time to 24-hour format
  // because input type="time" accepts only HH:mm
  // ============================
  function convertTo24Hour(time) {
    if (!time) return "";

    if (!time.includes("AM") && !time.includes("PM")) {
      return time;
    }

    let [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    hours = parseInt(hours);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  // ============================
  // Modified: Convert 24-hour time back to AM/PM
  // before sending to backend
  // ============================
  function convertTo12Hour(time) {
    if (!time) return "";

    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

  // ============================
  // Modified: Fill form while editing
  // ============================
  useEffect(() => {
    if (initialData) {
      setFormData({
        movieId: initialData.movieId?._id || initialData.movieId,
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "",
        time: convertTo24Hour(initialData.time),
        totalSeats: initialData.totalSeats,
      });
    } else {
      setFormData({
        movieId: "",
        date: "",
        time: "",
        totalSeats: 50,
      });
    }
  }, [initialData]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Modified: Convert time back to AM/PM before updating
    onSubmit({
      ...formData,
      time: convertTo12Hour(formData.time),
    });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <select
        name="movieId"
        value={formData.movieId}
        onChange={handleChange}
        required
      >
        <option value="">Select Movie</option>

        {movies.map((movie) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="totalSeats"
        value={formData.totalSeats}
        onChange={handleChange}
      />

      {/* Modified: Dynamic button text */}
      <button type="submit">
        {buttonText || "Create Show"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "30px",
  },
};