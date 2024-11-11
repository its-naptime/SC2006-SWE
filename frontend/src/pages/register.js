import React from "react";
import Form from "../components/Form";

function Register({ switchToLogin }) {
  return <Form route="/api/user/register/" method="register" switchToLogin={switchToLogin} />;
}

export default Register;
