import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/about";
import Search from "./pages/Search";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Ensure you're using this if working with routing
import { AuthProvider } from '../AuthContext'; // Import the AuthProvider

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>  
  );
}

export default App;
