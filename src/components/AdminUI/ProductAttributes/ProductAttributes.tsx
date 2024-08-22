import React from "react";
import classes from "./ProductAttributes.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { ProductAttributesTypes } from "../../../types/types";
import Spinner from "../../UI/Spinner/Spinner";

const FormSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Name is required"),
  description: Yup.string().min(2).max(50).required("Description is required"),
});

const ProductAttributes: React.FC<ProductAttributesTypes> = ({
  onClodeHandler,
  onSubmitHandler,
  isLoading,
  title,
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.sub_wrapper}>
        <Formik
          initialValues={{
            description: "",
            name: "",
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
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
              <header>
                <h3>{title}</h3>

                <FaTimes onClick={onClodeHandler} />
              </header>
              <div className={classes.form_list}>
                <label htmlFor="">Name</label>
                <input
                  type="name"
                  placeholder="Enter your name"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                />
                {touched.name && errors.name && (
                  <p className={classes.error}>{errors.name}</p>
                )}
              </div>
              <div className={classes.form_list}>
                <label htmlFor="">Description</label>
                <textarea
                  placeholder="Enter a description"
                  // value={values.name}
                  onChange={handleChange("description")}
                ></textarea>
                {touched.description && errors.description && (
                  <p className={classes.error}>{errors.description}</p>
                )}
              </div>

              <div className={classes.form_list}>
                <button
                  disabled={isLoading ? true : false}
                  onClick={() => handleSubmit()}
                >
                  {isLoading ? <Spinner /> : "Create" }
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductAttributes;
