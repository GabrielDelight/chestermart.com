import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardPayment from "../CardPayment/CardPayment";
import Wrapper from "../UI/Wrapper/Wrapper";
import classes from "../../Styles/Checkout.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { usePostRequestMutation } from "../../store/services/users";

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
  country: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Country is required"),

  state: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("State is required"),

  city: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("City is required"),

  address: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Address is required"),

  postalCode: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Postal or zip code is required"),
});

function Checkout() {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [PostRequest, { isLoading }] = usePostRequestMutation();

  const togglePayment = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    togglePayment();
    //   navigate("/payment")
  };

  const [_values, _setValues] = useState<any>({});

  const onPaymentHandler = () => {
    const carts = JSON.parse(window.localStorage.getItem("cart") || "[]");

    PostRequest({
      url: "/orders",
      body: {
        carts: JSON.stringify(carts),
        orderDetails: _values,
      },
    })
      .unwrap()
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: data.message,
        });
        window.localStorage.removeItem("cart");
        navigate("/my-order");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });

        console.log(error);
      });
  };

  return (
    <Wrapper>
      <main className={classes.main}>
        <article>
          <p className={classes.xx_text}>Checkout</p>
          <div className={classes.caution}>
            <p>
            To purchase products, you need to fill in the information first.
            
            <br />
             Please ensure it is completed accurately.





            </p>
          </div>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              phoneNumber: "",
              country: "",
              state: "",
              city: "",
              address: "",
              postalCode: "",
            }}
            onSubmit={(values) => {
              togglePayment();

              _setValues(values);
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
                <p className={classes.form_title}>Billing Details</p>

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
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    placeholder="Enter your billing country"
                    name="country"
                    value={values.country}
                    onChange={handleChange("country")}
                  />
                  {touched.country && errors.country && (
                    <p className={classes.error}>{errors.country}</p>
                  )}
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                    value={values.state}
                    onChange={handleChange("state")}
                  />
                  {touched.state && errors.state && (
                    <p className={classes.error}>{errors.state}</p>
                  )}
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">City</label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={values.city}
                    onChange={handleChange("city")}
                  />
                  {touched.city && errors.city && (
                    <p className={classes.error}>{errors.city}</p>
                  )}
                </div>
                <div className={classes.form_list}>
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your house address"
                    name="address"
                    value={values.address}
                    onChange={handleChange("address")}
                  />
                  {touched.address && errors.address && (
                    <p className={classes.error}>{errors.address}</p>
                  )}
                </div>

                <div className={classes.form_row}>
                  <div>
                    <label htmlFor="">Postalcode or Zip</label>
                    <input
                      type="text"
                      placeholder="Enter postal or zip code"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={handleChange("postalCode")}
                    />
                    {touched.postalCode && errors.postalCode && (
                      <p className={classes.error}>{errors.postalCode}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="">Company Name (optional)</label>
                    <input
                      type="text"
                      placeholder="Enter your company name if any"
                    />
                  </div>
                </div>

                <div className={classes.form_list}>
                  <button type="button" onClick={() => handleSubmit()}>
                    {isLoading ? "Please wait..." : "Next"}
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </article>

        <aside>
          <div className={classes.break_div}>
            <br />
            <br />
            <br />
          </div>
          <div className={classes.caution}>
            <h4>Have a promocode or Gift card?</h4>
            <a href="####">Click here to enter your code</a>
          </div>

          <div className={classes.method_main}>
            <p className={classes.form_title}>Shipping Method</p>

            <div className={classes.methods_wrapper}>
              <FaExclamationCircle />
              <div>
                <p>
                  FedEx Freight <small>(free)</small>
                </p>
                <p>
                  USPS International <small>(45.34)%</small>
                </p>
                <p>
                  DHL <small>(4.34)%</small>
                </p>
              </div>
            </div>
          </div>
          <div className={classes.method_main}>
            <p className={classes.form_title}>Shipping Method</p>

            <div className={classes.methods_wrapper}>
              <FaCheckCircle />
              <div>
                <p>Card payment</p>
              </div>
            </div>
          </div>
          <div className={classes.method_main}>
            <p className={classes.form_title}>Your Order</p>

            <div className={classes.cart_wrapper}>
              {/* {[1, 2, 3, 4].map((item) => {
                return <CartList />;
              })} */}
            </div>
          </div>
        </aside>
      </main>

      <>
        {showPaymentModal && (
          <CardPayment
            onClodeHandler={togglePayment}
            onSubmitHandler={onPaymentHandler}
          />
        )}
      </>
    </Wrapper>
  );
}

export default Checkout;
