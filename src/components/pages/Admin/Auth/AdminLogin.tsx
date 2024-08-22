import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../../../Styles/Login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { usePostRequestMutation } from "../../../../store/services/users";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Your valid email is required"),

  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required("Password is required"),
});

function AdminLogin() {
  useEffect(() => {
    window.localStorage.removeItem("admin-token");
  }, []);
  const [PostRequest] = usePostRequestMutation();
  const navigate = useNavigate();

  return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          const url = new URLSearchParams(window.location.search);
          let new_url = url.get("redirect");
          let redirectTo: any = "/";
          if (new_url) {
            redirectTo = "/"+new_url;
          }

          PostRequest({
            url: "/admin/login",
            body: values,
          })
            .unwrap()
            .then((data) => {
              console.log(data);

              let token = data.user.token;
              window.localStorage.setItem("admin-token", token);

              navigate("/admin/dashboard");
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
                <p className={classes.form_title}>Admin Sign In</p>

                <div className={classes.form_list}>
                  <label htmlFor="">E-mail Address</label>
                  <input
                    type="email"
                    placeholder="johnsmith@email.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                  {touched.email && errors.email && (
                    <p className={classes.error}>{errors.email}</p>
                  )}
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
                  {/* <p>
                    <Link to={"/forgot-password"}>Forgot password?</Link>{" "}
                  </p> */}
                </div>

                <div className={classes.form_list}>
                  <button onClick={() => handleSubmit()}>Login</button>
                </div>
                <p>
                  Don't have an account?{" "}
                  <Link to={"/admin/signup"}>Register now</Link>.
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
  );
}

export default AdminLogin;
