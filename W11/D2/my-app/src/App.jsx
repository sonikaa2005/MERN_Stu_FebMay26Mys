import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { NestedRoutes } from './components/P1';
import { DynamicParamsUseParams } from './components/P2';
import { MultipleDynamicParams } from './components/P3';
import { OptionalParameters } from './components/P4';
import { NestedDynamicRoutes } from './components/P5';

function DashboardHome() {
  return (
    <div>
      <h3>Dashboard Home</h3>
      <p>Default Dashboard Page</p>
    </div>
  );
}

function DashboardProfile() {
  return (
    <div>
      <h3>Dashboard Profile</h3>
      <p>Profile Page inside Dashboard</p>
    </div>
  );
}

function DashboardSettings() {
  return (
    <div>
      <h3>Dashboard Settings</h3>
      <p>Settings Page inside Dashboard</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>React Router Concepts</h1>

      <ul>
        <li>Nested Routes</li>
        <li>Dynamic Params</li>
        <li>Multiple Dynamic Params</li>
        <li>Optional Parameters</li>
        <li>Nested Dynamic Routes</li>
      </ul>

      <nav style={styles.nav}>
        <Link to="/dashboard">Nested Routes</Link>

        <Link to="/products/101">
          Dynamic Params
        </Link>

        <Link to="/users/101/orders/5001">
          Multiple Params
        </Link>

        <Link to="/profile">
          Optional Params
        </Link>

        <Link to="/profile/sonika">
          Optional Params with Value
        </Link>

        <Link to="/courses/reactJS">
          Nested Dynamic Routes
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Nested Routes */}
        <Route path="/dashboard" element={<NestedRoutes />}>

          <Route index element={<DashboardHome />} />

          <Route
            path="profile"
            element={<DashboardProfile />}
          />

          <Route
            path="settings"
            element={<DashboardSettings />}
          />

        </Route>

        {/* Dynamic Params */}
        <Route
          path="/products/:id"
          element={<DynamicParamsUseParams />}
        />

        {/* Multiple Dynamic Params */}
        <Route
          path="/users/:userId/orders/:orderId"
          element={<MultipleDynamicParams />}
        />

        {/* Optional Parameters */}
        <Route
          path="/profile/:username?"
          element={<OptionalParameters />}
        />

        {/* Nested Dynamic Routes */}
        <Route
          path="/courses/:courseName"
          element={<NestedDynamicRoutes />}
        />

      </Routes>

    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px"
  }
};

export default App;