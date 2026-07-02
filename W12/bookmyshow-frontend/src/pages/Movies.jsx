// src/pages/Movies.jsx


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

import { fetchMovies } from "../redux/movies/moviesSlice";


export default function Movies() {
  const dispatch = useDispatch();


  const { movies, loading, error, pagination } = useSelector(
    (state) => state.movies,
  );


  const [search, setSearch] = useState("");


  const [genre, setGenre] = useState("");


  const [rating, setRating] = useState("");


  useEffect(() => {
    dispatch(
      fetchMovies({
        page: pagination.page,
        search,
        genre,
        rating,
      }),
    );
  }, [dispatch, pagination.page, search, genre, rating]);


  function handlePageChange(page) {
    dispatch(
      fetchMovies({
        page,
        search,
        genre,
        rating,
      }),
    );
  }


  return (
    <section>
      <h1>Movies</h1>


      <p>Discover and explore movies.</p>


      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search title"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />


        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value="">All Genres</option>


          <option value="Action">Action</option>


          <option value="Comedy">Comedy</option>


          <option value="Sci-Fi">Sci-Fi</option>
        </select>


        <select
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="">All Ratings</option>


          <option value="4">4+</option>


          <option value="4.5">4.5+</option>


          <option value="4.8">4.8+</option>
        </select>
      </div>


      {loading && <LoadingSpinner />}


      {error && <p style={styles.error}>{error}</p>}


      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}


      {!loading && !error && movies.length > 0 && (
        <>
          <div style={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>


          <Pagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}


const styles = {
  filters: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    margin: "25px 0",
  },


  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },


  error: {
    color: "red",
  },
};
