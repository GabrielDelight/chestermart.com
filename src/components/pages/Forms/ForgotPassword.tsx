import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../../Styles/Login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePostRequestMutation } from "../../../store/services/users";
import Swal from "sweetalert2";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Your valid email is required"),
});
const FormSchema2 = Yup.object().shape({
  code: Yup.string()
    .min(2, "Too Short!")
    .max(6, "Too Long!")
    .required("Please enter code"),
});

function ForgotPassword() {
  const [showCodeInput, setShowShow] = useState<boolean>(false);
  const [enteredEmail, setEnteredEmail] =  useState<string>("")

  const [PostRequest] = usePostRequestMutation();

  const navigate = useNavigate();
  const toggleSHowHide = () => {
    setShowShow(!showCodeInput);
  };

  const onVerifyHandler = () => {
    
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <p className={classes.form_title}>Forgot password?</p>

          {!showCodeInput ? (
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={(values) => {
                toggleSHowHide();
                setEnteredEmail(values.email)

                PostRequest({
                  url: "/generate-confirmation-code",
                  body: {
                    email: values.email,
                    emailType: "forgot-password",
                  },
                })
                  .unwrap()
                  .then((data) => {
                    console.log(data);
                    // toggleSHowHide();
                  })
                  .catch((error) => {
                    console.log(error);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error.data.message,
                    });
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
                <div className={classes.form}>
                  <p style={{ fontSize: 12, marginTop: -10 }}>
                    No worries! Your data is backed up, and you will recover
                    your password by simply following the process.
                  </p>

                  <br />
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
                    <button onClick={() => handleSubmit()}>Submit</button>
                  </div>
                </div>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                code: "",
              }}
              onSubmit={(values) => {



                // reset-password-compare-verification-code
                PostRequest({
                  url: "/reset-password-compare-verification-code",
                  body: {
                    code: values.code,
                    email: enteredEmail,
                  },
                })
                  .unwrap()
                  .then((data) => {
                    console.log(data);
                // onVerifyHandler();

                navigate(`/reset-password?code=${values.code}&&email=${enteredEmail}`);

                    // toggleSHowHide();
                  })
                  .catch((error) => {
                    console.log(error);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error.data.message,
                    });
                  });
              }}
              validationSchema={FormSchema2}
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
                <div className={classes.form}>
                  <p style={{ fontSize: 12, marginTop: -10 }}>
                    A code has been sent to your email; please enter it below.
                  </p>

                  <br />
                  <div className={classes.form_list}>
                    <label htmlFor="">Enter verification code</label>
                    <input
                      type="number"
                      placeholder="Enter your password"
                      name="code"
                      value={values.code}
                      onChange={handleChange("code")}
                    />
                    {touched.code && errors.code && (
                      <p className={classes.error}>{errors.code}</p>
                    )}
                  </div>
                  <div className={classes.form_list}>
                    <button type="submit" onClick={() => handleSubmit()}>verify</button>
                  </div>
                </div>
              )}
            </Formik>
          )}

          <p
            style={{ fontSize: 12, cursor: "pointer" }}
            onClick={() => setShowShow(false)}
          >
            Didn't get the code?
          </p>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
