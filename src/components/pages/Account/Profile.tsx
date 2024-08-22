import React, { useEffect, useState } from "react";
import ProfileWrapper from "../../UI/Wrapper/ProfileWrapper";
import classes from "../../../Styles/Profile.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useGetRequestQuery, usePostRequestMutation } from "../../../store/services/users";
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
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .min(new Date(1900, 0, 1), "Date of Birth cannot be before 1900"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Phone number is required"),
 
});

const PasswordFormSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required("Password is required"),
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



function Profile() {
  const [PostRequest] = usePostRequestMutation();

  const { data: user = {}, refetch } = useGetRequestQuery("/user");
  let [updateKey, setUpdateKey] = useState(1);

  //   THis codeelow b will help to update the fomr state when it load with the init values
  useEffect(() => {
    refetch();
    if (user?._id) {
      let intervalId = setTimeout(() => {
        setUpdateKey(Math.random());
      }, 100);

      return () => clearTimeout(intervalId);
    }
  }, [user?._id]);

  console.log(user.dob)

  return (
    <ProfileWrapper>
      <Formik
        key={updateKey}
        initialValues={{
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          dob: user.dob,
          phoneNumber: user.phoneNumber,
         
        }}
        onSubmit={(values) => {
          PostRequest({
            url: "/account-update",
            body: {
             ...values
            },
          })
            .unwrap()
            .then((data) => {

              console.log(data);
              Swal.fire({
                icon: "success",
                text: data.message,
              });
              
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
          <>
            <div className={classes.form}>
              <h1>Profile Information</h1>
              <br />
              <div className={classes.form_row}>
                <div>
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                  />
                  {touched.firstname && errors.firstname && (
                    <p className={classes.error}>
                      {errors.firstname as unknown as any}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                  />
                  {touched.lastname && errors.lastname && (
                    <p className={classes.error}>
                      {errors.lastname as unknown as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={classes.form_row}>
                <div>
                  <label htmlFor="">D.O.B</label>
                  <input
                    type="date"
                    value={values.dob}
                    onChange={handleChange("dob")}
                  />

                  {touched.dob && errors.dob && (
                    <p className={classes.error}>
                      {errors.dob as unknown as any}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="">Phone number</label>
                  <input
                    type="number"
                    placeholder="+123 456 789"
                    value={values.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className={classes.error}>
                      {errors.phoneNumber as unknown as any}
                    </p>
                  )}
                </div>
              </div>

              <div className={classes.form_list}>
                <div>
                  <label htmlFor="">E-mail Address</label>
                  <input
                    type="email"
                    disabled
                    placeholder="johnsmith@email.com"
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                  {touched.email && errors.email && (
                    <p className={classes.error}>
                      {errors.email as unknown as any}
                    </p>
                  )}
                </div>
              </div>

              <div className={classes.form_list}>
                <button type="button" onClick={() => handleSubmit()}>Save Changes</button>
              </div>
            </div>
          </>
        )}
      </Formik>

      <br />


      <Formik
        initialValues={{
          password: "",
          oldPassword: "",
          confirmPassword: ''

        }}
        onSubmit={(values) => {

            PostRequest({
              url: "/change-password",
              body: {
                oldPassword: values.oldPassword,
                password: values.password,
                confirmPassword: values.confirmPassword,
              },
            })
              .unwrap()
              .then((data) => {

                console.log(data);
                Swal.fire({
                  icon: "success",
                  text: data.message,
                });
               
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
        validationSchema={PasswordFormSchema}
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
                  <label htmlFor="">Old password</label>
                  <input type="password" placeholder="Enter your old password"  name="password"
                    value={values.oldPassword}
                    onChange={handleChange("oldPassword")}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <p className={classes.error}>{errors.oldPassword}</p>
                  )}
                </div>
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
                  <button onClick={() => handleSubmit()}>Change password</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>


    </ProfileWrapper>
  );
}

export default Profile;
