import React from "react";
import Form from "../components/Form";

function Login({ switchToRegister }) {
  return <Form route="/api/token/" method="login" switchToRegister={switchToRegister} />;
}

export default Login;
