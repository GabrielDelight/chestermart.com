import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../../Styles/Login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePostRequestMutation } from "../../../store/services/users";
import Swal from "sweetalert2";

const FormSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your first name"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please eneter your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your valid email is required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Confirm password must be 8 characters long")
    .oneOf([Yup.ref("password")], "Password did not match")
    .required("Confirm password is required"),
});

function SignUp() {
  const [PostRequest] = usePostRequestMutation();

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          PostRequest({
            url: "/signup",
            body: values,
          })
            .unwrap()
            .then((data) => {
              console.log(data);
              navigate("/login");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.data.message,
              });

              console.log(error);
            });
        }}
        validationSchema={FormSchema}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          touched,
          isValid,
          values,
          errors,
        }) => (
          <div className={classes.main}>
            <div className={classes.wrapper}>
              <div className={classes.form}>
                <p className={classes.form_title}>Register now</p>

                <div className={classes.form_row}>
                  <div>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange("firstname")}
                    />
                    {touched.firstname && errors.firstname && (
                      <p className={classes.error}>{errors.firstname}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange("lastname")}
                    />
                    {touched.lastname && errors.lastname && (
                      <p className={classes.error}>{errors.lastname}</p>
                    )}
                  </div>
                </div>
                <div className={classes.form_row}>
                  <div>
                    <label htmlFor="">E-mail Address</label>
                    <input
                      type="text"
                      placeholder="johnsmith@email.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                    {touched.email && errors.email && (
                      <p className={classes.error}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="">Phone number</label>
                    <input
                      type="number"
                      placeholder="+123 456 789"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange("phoneNumber")}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className={classes.error}>{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                  {touched.password && errors.password && (
                    <p className={classes.error}>{errors.password}</p>
                  )}
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className={classes.error}>{errors.confirmPassword}</p>
                  )}
                </div>

                <div className={classes.form_list}>
                  <button type="submit" onClick={() => handleSubmit()}>Submit</button>
                </div>

                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>.
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
