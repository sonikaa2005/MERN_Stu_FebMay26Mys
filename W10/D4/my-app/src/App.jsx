import './App.css'
import { ProtectedRoute } from './routes/ProtetctedRoute';
import { AboutPage } from './pages/AboutPage';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const isAuthenticated = true;
  return (
    <>
      {/* BrowserRouter: enables React router in entire application */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainLayout />} >

            {/* Index Route */}
            <Route
              index element={<HomePage />} />

            {/* About page */}
            <Route
              path='about'
              element={<AboutPage />} />

            {/* Products page */}
            <Route
              path='products'
              element={<ProductsPage />} />

            {/* Dynamic Route */}
            <Route
              path='products/:id'
              element={<ProductDetailsPage />} />

            {/* Protected Route */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}>
                  <DashboardPage />
                </ProtectedRoute>
              } />

            {/* 404 not found route */}
            {/* About page */}
            <Route
              path='*'
              element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
