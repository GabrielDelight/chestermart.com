import React from "react";
interface ValueInterface {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
}
const SignupValidator = (values: any) => {
  const error: ValueInterface = {};
  if (values.firstname === "" || values.firstname.length < 1)
    error.firstname = "Firstname is required";
  if (values.lastname === "" || values.lastname.length < 1)
    error.lastname = "lastname is required";
  if (values.email === "" || values.email.length < 1)
    error.email = "Email is required";
  else if (!values.email.includes("@")) error.email = "Email is not validated";

  if (values.password === "" || values.password.length < 1)
    error.password = "Password is required";
  return error;
};

export default SignupValidator;
