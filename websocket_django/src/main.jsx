import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth/AuthProvider";
import { StudentProvider } from "./context/studentsProvider/StudentsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StudentProvider>
  </React.StrictMode>
);
