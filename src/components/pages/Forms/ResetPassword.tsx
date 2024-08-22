import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../../Styles/Login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { usePostRequestMutation } from "../../../store/services/users";
import Swal from "sweetalert2";

const FormSchema = Yup.object().shape({
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

function ResetPassword() {
  const [PostRequest] = usePostRequestMutation();
  const navigate = useNavigate();
  let [queryData, setQueryData] = useState<{
    code: string;
    email: string;
  }>({
    code: "",
    email: "",
  });

  let url = new URLSearchParams(window.location.search);
  let code = url.get("code") as unknown as string;
  let email = url.get("email") as unknown as string;


  useEffect(() => {
    let _data = {
      code: code,
      email: email,
    };
    setQueryData(_data);

    console.log(Object.values(_data).length);

    console.log(code)
    
  }, []);

  return (
    <Wrapper>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: ''
        }}
        onSubmit={(values) => {

            PostRequest({
              url: "/reset-forgotten-password",
              body: {
                password: values.password,
                confirmPassword: values.confirmPassword,
                code: queryData.code,
                email: queryData.email
              },
            })
              .unwrap()
              .then((data) => {

                console.log(data);
                Swal.fire({
                  icon: "success",
                  text: data.message,
                });
                
                let token = data.token;
                window.localStorage.setItem("token", token);
                navigate("/")
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
          <div className={classes.main}>
            <div className={classes.wrapper}>
              <div className={classes.form}>
                <p className={classes.form_title}>Change Password</p>
                <p style={{ fontSize: 12, marginTop: -10 }}>
                  Please enter a stronger password
                </p>
                <br />
                <div className={classes.form_list}>
                  <label htmlFor="">Password</label>
                  <input type="password" placeholder="Enter your password"  name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                  />
                  {touched.password && errors.password && (
                    <p className={classes.error}>{errors.password}</p>
                  )}
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">Confirm Password</label>
                  <input type="password" placeholder="Confirm  password" name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className={classes.error}>{errors.confirmPassword}</p>
                  )}
                </div>

                <div className={classes.form_list}>
                  <button type="submit" onClick={() => handleSubmit()}>Update</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
}

export default ResetPassword;
