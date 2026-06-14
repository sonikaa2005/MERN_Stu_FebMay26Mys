// src/main.jsx


/*
=========================================================
SPRINT 1 – CORE APPLICATION BOOTSTRAPPING


TOPICS COVERED:


✓ React 18 Root API
✓ BrowserRouter
✓ Global CSS Import


WHY THIS FILE?


This is the true entry point of the application.


Responsibilities:


index.html
↓
main.jsx
↓
BrowserRouter
↓
App
↓
Entire React Application

Without BrowserRouter:


✓ Routes won't work
✓ Navigation won't work
✓ Protected Routes won't work


=========================================================
*/


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(


  <React.StrictMode>


    {/*
      BrowserRouter listens to:


      • Current URL
      • Browser Back
      • Browser Forward


      and synchronizes React Router
      with the browser.
    */}


<BrowserRouter>

      <AuthProvider>

        <App />

      </AuthProvider>
      


    </BrowserRouter>


  </React.StrictMode>


);


/*
=========================================================
VERIFICATION


✓ React 18 compatible
✓ Vite compatible
✓ React Router compatible
✓ Global CSS imported
=========================================================
*/