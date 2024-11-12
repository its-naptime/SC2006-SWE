// src/components/Form.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../AuthContext";
import LoadingIndicator from "./LoadingIndicator";
import { publicApi } from "../Api";

function Form({ activeTab, setActiveTab, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    login: {
      username: "",
      password: "",
      rememberMe: false
    },
    register: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    reset: {
      email: "",
    }
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange = (form, field, value) => {
    setFormData(prev => ({
      ...prev,
      [form]: {
        ...prev[form],
        [field]: value
      }
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowResetPassword(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicApi.post("/api/token/", {
        username: formData.login.username,
        password: formData.login.password
      });
      await login(res.data);
      onClose();
      router.push("/");
    } catch (error) {
      console.error('Login error:', error);
      alert("Login failed: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.register.password !== formData.register.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await publicApi.post("/api/user/register/", {
        username: formData.register.username,
        email: formData.register.email,
        password: formData.register.password,
      });
      alert("Registration successful");
      setActiveTab("login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await publicApi.post("/api/user/password-reset/", {
        email: formData.reset.email
      });
      alert("Password reset link sent to your email");
      setShowResetPassword(false);
      setActiveTab("login");
    } catch (error) {
      alert("Reset password failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Tab Navigation */}
      <ul className="nav nav-pills nav-justified mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabClick("login")}
            type="button"
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabClick("register")}
            type="button"
          >
            Register
          </button>
        </li>
      </ul>

      {/* Login Form */}
      {activeTab === "login" && !showResetPassword && (
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-group mb-3">
            <label htmlFor="loginUsername" className="form-label">Username</label>
            <input
              type="text"
              id="loginUsername"
              className="form-control"
              value={formData.login.username}
              onChange={(e) => handleInputChange("login", "username", e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
              id="loginPassword"
              className="form-control"
              value={formData.login.password}
              onChange={(e) => handleInputChange("login", "password", e.target.value)}
              required
            />
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  checked={formData.login.rememberMe}
                  onChange={(e) => handleInputChange("login", "rememberMe", e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-6 text-end">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setShowResetPassword(true)}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {loading && <LoadingIndicator />}

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            Sign In
          </button>

          <div className="text-center">
            <p>
              Not a member?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => handleTabClick("register")}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      )}

      {/* Register Form */}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} className="register-form">
          <div className="form-group mb-3">
            <label htmlFor="registerUsername" className="form-label">Username</label>
            <input
              type="text"
              id="registerUsername"
              className="form-control"
              value={formData.register.username}
              onChange={(e) => handleInputChange("register", "username", e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="registerEmail" className="form-label">Email</label>
            <input
              type="email"
              id="registerEmail"
              className="form-control"
              value={formData.register.email}
              onChange={(e) => handleInputChange("register", "email", e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="registerPassword" className="form-label">Password</label>
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              value={formData.register.password}
              onChange={(e) => handleInputChange("register", "password", e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="registerConfirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="registerConfirmPassword"
              className="form-control"
              value={formData.register.confirmPassword}
              onChange={(e) => handleInputChange("register", "confirmPassword", e.target.value)}
              required
            />
          </div>

          {loading && <LoadingIndicator />}

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            Register
          </button>

          <div className="text-center">
            <p>
              Already a member?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => handleTabClick("login")}
              >
                Login
              </button>
            </p>
          </div>
        </form>
      )}

      {/* Reset Password Form */}
      {showResetPassword && (
        <form onSubmit={handleResetPasswordSubmit} className="reset-password-form">
          <div className="form-group mb-4">
            <label htmlFor="resetEmail" className="form-label">Email</label>
            <input
              type="email"
              id="resetEmail"
              className="form-control"
              value={formData.reset.email}
              onChange={(e) => handleInputChange("reset", "email", e.target.value)}
              required
            />
          </div>

          {loading && <LoadingIndicator />}

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            Send Reset Link
          </button>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowResetPassword(false)}
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;