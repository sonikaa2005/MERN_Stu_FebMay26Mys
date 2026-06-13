import './App.css'
//import  HomePage from './pages/HomePage'
//import MovieCard from './components/MovieCard'
//mport CitySelector from './components/CitySelector';
//import MovieSearch from './components/MovieSearch';
//import BookButton from './components/BookButton';
//import GenreFilter from './components/GenreFilter';
//import LoginForm from './components/LoginForm';
//import SearchShortcut from './components/SearchShortcut';
//import AuthStatus from './components/AuthStatus';
// import MovieLoader from './components/MovieLoader';
// import MovieResults from './components/MovieResults';

//import { Routes, Route, useParams, useNavigate, Navigate, Link } from "react-router-dom";
//import Navbar from './components/Navbar';
//import DashboardSection from './components/DashboardSection';
import MovieExplorer from './components/MovieExplorer';
import ErrorBoundary from './components/ErrorBoundary';

// const isAuthenticated = true;
// function ProtectedRoute({ children }) {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }
//   return children;
// }

// function HomePage() {
//   return (
//     <section>
//       <h2>Home</h2>
//       <p>Welcome to Bookmyshow</p>
//     </section>
//   );
// }

// function MoviePage() {
//   const navigate = useNavigate();
//   const movies = [
//     {
//       id: 101,
//       title: "Inception"
//     },
//     {
//       id: 102,
//       title: "Interstellar"
//     },
//   ];
//   return (
//     <section>
//       <h2>Movies</h2>
//       <p>Click a movie to view details</p>
//       <ul>
//         {movies.map((movie)=>{
//           <li key={movie.id}>
//             <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
//           </li>
//         })}
//       </ul>
//     </section>
//   );
// }
// function MovieDetailsPage() {
//   const { movieId } = useParams();
//   return (
//     <section>
//       <h3>Movie Details</h3>
//       <p>Movie ID: {movieId}</p>
//     </section>
//   );
// }

// function LoginPage() {
//   const navigate = useNavigate();
//   return (
//     <section>
//       <h2>Login</h2>
//       <p>Login Screen</p>
//       <button
//         style={styles.button}
//         onClick={() => {
//           navigate("/bookings");
//         }}>
//         Login
//       </button>
//     </section>
//   );
// }

// function SignupPage() {
//   return (
//     <section>
//       <h2>Signup</h2>
//       <p>New users can register here.</p>
//     </section>
//   );
// }

// function BookingsPage() {
//   return (
//     <section>
//       <h2>My Bookings</h2>
//       <p>Protected Page.</p>
//     </section>
//   );
// }

// function DashboardOverview() {
//   return (
//     <section>
//       <h2>Dashboard Overview</h2>
//       <p>Booking stats.</p>
//     </section>
//   );
// }

// function DashboardMovies() {
//   return (
//     <section>
//       <h2>Dashboard Movies</h2>
//       <p>Managed movies here</p>
//     </section>
//   );
// }

// function NotFoundPage() {
//   return (
//     <section>
//       <h2>404</h2>
//       <p>Page not found.</p>
//     </section>
//   );
// }

//function App() {
//return (
//<HomePage />
// createing a pages puting it together inside one single function is "Component Composition"
<>
  {/* <CitySelector/> */}
  {/* controlled component  */}
  {/* <MovieSearch/> */}
  {/* <BookButton /> */}
  {/* <GenreFilter /> */}
  {/* <LoginForm/> */}
  {/* <SearchShortcut /> */}
  {/* <AuthStatus /> */}
  {/* <MovieLoader/> */}
  {/* <MovieResults/> */}
  {/* distructuring props */}
  {/* <MovieCard  */}
  {/* title="Inception"
      genre="Sci-fi"
      rating={4.8}
      duration="2h 28m"
      poster="https://picsum.photos/200/300?1"
      />,

       <MovieCard 
      title="Avatar"
      genre="Sci-fi"
      rating={4.1}
      duration="3h 28m"
      poster="https://picsum.photos/200/300?2"
      />,
       <MovieCard 
      title="FightClub"
      genre="Sci-fi"
      rating={4.9}
      duration="2h 28m"
      poster="https://picsum.photos/200/300?3"
      /> */}
</>

//);
//}
// export default function App() {
//   return (
//     <div style={styles.container}>
//       <Navbar />
//       <Routes>
//         {/* public routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/movies" element={<MoviePage />} />
//         <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* protected routes */}
//         <Route path="/bookings"
//           element={
//             <ProtectedRoute>
//               <BookingsPage />
//             </ProtectedRoute>
//           } />

//           {/* Nested Dashboard routes */}
//           <Route path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardSection />
//             </ProtectedRoute>
//           } />

//           {/* Index route */}
//           <Route index element={<DashboardOverview />} />
//           <Route path="movies" element={<DashboardMovies />} />
//           {/* <Route path="shows" element={<DashboardShows />} /> */}

//           {/* 404 route */}
//           <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   );
// }


// it is for MovieExplore and ErrorBoundary

export default function App(){
  return(
    <div>
      <header>
        <ErrorBoundary>
          <MovieExplorer />
        </ErrorBoundary>
      </header>
    </div>
  )
}

const styles = {
  container:{
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
  },
  button: {
    padding: "8px 12px",
    marginTop: "8px",
  },
}