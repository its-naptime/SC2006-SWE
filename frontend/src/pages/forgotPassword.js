import React, { useState } from "react";
import Form from "../components/Form";

export default function ForgotPassword() {
  const [activeTab, setActiveTab] = useState("forgotPassword");

  return (
    <div>
      <h2>Forgot Password</h2>
      <Form activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
