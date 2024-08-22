import React, { useEffect, useState } from "react";
import {
  useGetRequestQuery,
  usePostRequestMutation,
} from "../../../store/services/users";
import classes from "./Filter.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../Spinner/Spinner";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const FormSchema = Yup.object().shape({
  category: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Category is required"),
  brand: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Brand is required"),
  minPrice: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Min price is required"),
  maxPrice: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Max price is required"),
});
const Filter = () => {
  const { data: brands = [] } = useGetRequestQuery("/brands");
  const { data: categories = [] } = useGetRequestQuery("/categories");

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        category: "",
        brand: "",
        minPrice: 0,
        maxPrice: 0,
      }}
      onSubmit={(values) => {
        console.log("::::", values);

        let url = `/filter?category=${values.category}&&brand=${values.brand}&&maxPrice=${values.maxPrice}&&minPrice=${values.minPrice}`;
        navigate(url);
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
        <div className={classes.filter_wrapper}>
          <div className={classes.form_list}>
            <p>Category</p>
            <select
              name="category"
              id=""
              value={values.category}
              onChange={handleChange("category")}
            >
              <option value="">Select Category</option>
              {categories.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            {touched.category && errors.category && (
              <p className={classes.error}>{errors.category}</p>
            )}
          </div>

          <div className={classes.form_list}>
            <p>Brand</p>
            <select
              name="brand"
              id=""
              value={values.brand}
              onChange={handleChange("brand")}
            >
              <option value="">Select brand</option>

              {brands.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}

            </select>
              {touched.brand && errors.brand && (
                <p className={classes.error}>{errors.brand}</p>
              )}
          </div>
          <br />
          <br />

          <div className={classes.form_list}>
            <label htmlFor="">Min Price</label>
            <input
              type="number"
              placeholder="Enter min price"
              name="minPrice"
              value={values.minPrice}
              onChange={handleChange("minPrice")}
            />
            {touched.minPrice && errors.minPrice && (
              <p className={classes.error}>{errors.minPrice}</p>
            )}
          </div>
          <div className={classes.form_list}>
            <label htmlFor="">Max Price</label>
            <input
              type="number"
              placeholder="Enter max price"
              name="maxPrice"
              value={values.maxPrice}
              onChange={handleChange("maxPrice")}
            />
            {touched.maxPrice && errors.maxPrice && (
              <p className={classes.error}>{errors.maxPrice}</p>
            )}
          </div>

          <button type="submit" onClick={() => handleSubmit()}>
            Filter
          </button>
        </div>
      )}
    </Formik>
  );
};

export default Filter;
