import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const history = useHistory();
  
  // Extract uid and token from the URL query string
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/password-reset-confirm/", {
        uid,
        token,
        new_password: newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Your password has been successfully reset.");
        history.push("/login"); // Redirect to the login page after successful reset
      }
    } catch (error) {
      setErrorMessage("There was an error resetting your password.");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
