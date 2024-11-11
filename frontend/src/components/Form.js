import { useState } from "react";
import { useRouter } from "next/router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../Api";
import LoadingIndicator from "./LoadingIndicator"; // Ensure this path is correct

function Form({ activeTab, setActiveTab }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerDetails, setRegisterDetails] = useState({
<<<<<<< HEAD
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
=======
    //name: "",
    username: "",
    email: "",
    password: "",
    //confirmPassword: "",
>>>>>>> 60491a33e098015ed9c92272a365e23e4c1a42f5
  });
  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem("ACCESS_TOKEN", res.data.access);
      localStorage.setItem("REFRESH_TOKEN", res.data.refresh);
=======
      const res = await api.post("/api/token/", { username: username, password: password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
>>>>>>> 60491a33e098015ed9c92272a365e23e4c1a42f5
      router.push("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
<<<<<<< HEAD
    try {
      await api.post("/api/user/register/", registerDetails);
=======

    // Check if passwords match
    if (registerDetails.password != registerDetails.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/user/register/", {
        username: registerDetails.username,
        email: registerDetails.email,
        password: registerDetails.password,
      });
>>>>>>> 60491a33e098015ed9c92272a365e23e4c1a42f5
      alert("Registration successful");
      setActiveTab("login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Pills navs */}
      <ul className="nav nav-pills nav-justified mb-3 my-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            id="tab-login"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected={activeTab === "login"}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("login");
            }}
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            id="tab-register"
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected={activeTab === "register"}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("register");
            }}
          >
            Register
          </a>
        </li>
      </ul>
      {/* Pills content */}
      <div className="tab-content">
        <div
          className={`tab-pane fade ${activeTab === "login" ? "show active" : ""}`}
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form onSubmit={handleLoginSubmit}>
            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="loginName">
                Email or username
              </label>
              <input
                type="email"
                id="loginName"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email or username"
              />
            </div>

            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="loginPassword">
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div className="row p-2">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input className="form-check-input" type="checkbox" id="loginCheck" />
                  <label className="form-check-label" htmlFor="loginCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            {loading && <LoadingIndicator />}
            <div className="text-center py-4">
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p>
                Not a member?{" "}
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick("register");
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
        <div
          className={`tab-pane fade ${activeTab === "register" ? "show active" : ""}`}
          id="pills-register"
          role="tabpanel"
          aria-labelledby="tab-register"
        >
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="registerName">
                Name
              </label>
              <input
                type="text"
                id="registerName"
                className="form-control"
                value={registerDetails.name}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, name: e.target.value })
                }
                placeholder="Name"
              />
            </div>

            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="registerUsername">
                Username
              </label>
              <input
                type="text"
                id="registerUsername"
                className="form-control"
                value={registerDetails.username}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, username: e.target.value })
                }
                placeholder="Username"
              />
            </div>

            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="registerEmail">
                Email
              </label>
              <input
                type="email"
                id="registerEmail"
                className="form-control"
                value={registerDetails.email}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, email: e.target.value })
                }
                placeholder="Email"
              />
            </div>

            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="registerPassword">
                Password
              </label>
              <input
                type="password"
                id="registerPassword"
                className="form-control"
                value={registerDetails.password}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, password: e.target.value })
                }
                placeholder="Password"
              />
            </div>

            <div className="form-outline mb-4 p-2">
              <label className="form-label" htmlFor="registerConfirmPassword">
                Confirm password
              </label>
              <input
                type="password"
                id="registerConfirmPassword"
                className="form-control"
                value={registerDetails.confirmPassword}
                onChange={(e) =>
                  setRegisterDetails({ ...registerDetails, confirmPassword: e.target.value })
                }
                placeholder="Confirm password"
              />
            </div>

            {loading && <LoadingIndicator />}
            <div className="text-center py-4">
              <button type="submit" className="btn btn-primary btn-block mb-3">
                Register
              </button>
            </div>

            <div className="text-center">
              <p>
                Already a member?{" "}
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick("login");
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
