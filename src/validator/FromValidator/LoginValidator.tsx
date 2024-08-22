import React from "react";
interface ValueInterface {
  email?: string | null;
  password?: string | null;
}
const LoginValidator = (values: any) => {
  const error: ValueInterface = {};
  if (values.email === "" || values.email.length < 1)
    error.email = "Email is required";
  else if (!values.email.includes("@")) error.email = "Email is not validated";

  if (values.password === "" || values.password.length < 1)
    error.password = "Password is required";
  return error;
};

export default LoginValidator;
