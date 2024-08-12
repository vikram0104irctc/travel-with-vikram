import React, { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./context/Datacontext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./context/loginContext.jsx";
import { ThemeProvider } from "./context/themecontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <LoginProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </LoginProvider>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
