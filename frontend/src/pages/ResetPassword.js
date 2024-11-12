import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Api";


const ResetPassword = () => {
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const uidFromUrl = queryParams.get("uid");
      const tokenFromUrl = queryParams.get("token");

      setUid(uidFromUrl);
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/api/user/password-reset-confirm/", {
        uid,
        token,
        new_password: newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Your password has been successfully reset.");
        //navigate("/login");
      }
    } 
    catch (error) {
      console.error("Error resetting password:", error)
      setErrorMessage("There was an error resetting your password.");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>

      {/* Display the uid and token to check if they are being saved */}
      <p>UID: {uid}</p>
      <p>Token: {token}</p>

    
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
