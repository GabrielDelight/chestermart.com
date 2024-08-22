import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import classes from "../../../Styles/CreateProduct.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { BsPlus, BsPlusLg, BsTrash } from "react-icons/bs";
import { Blob } from "buffer";
import { useGetRequestQuery } from "../../../store/services/users";
import { useUploadFileAdminMutation } from "../../../store/services/admin";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { ProductUrl } from "../../../ImageUrl/ImageUrl";
import Spinner from "../../UI/Spinner/Spinner";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your first name"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please eneter your last name"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please eneter your last name"),
  brand: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Phone number is required"),
  price: Yup.string()
    .min(2, "Too Short!")
    .max(190, "Too Long!")
    .required("Price is required"),
});

interface IImages {
  image1: File | null;
  image2: File | null;
  image3: File | null;
}

function UpdateProduct() {
  let [specArr, setSpecArr] = useState<any>([]);
  const navigate = useNavigate();
  const [spec, setSpec] = useState<any>({
    property: "",
    value: "",
  });
  const { data: brands = [] } = useGetRequestQuery("/brands");
  const { data: categories = [] } = useGetRequestQuery("/categories");
  const [PostRequest, { isLoading }] = useUploadFileAdminMutation();

  const { id: _id } = useParams();

  const { data = {}, refetch } = useGetRequestQuery("/product/" + _id);

  const [images, setImages] = useState<IImages>({
    image1: null,
    image2: null,
    image3: null,
  });
  const [imagesURL, setImagesURL] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  let [updateKey, setUpdateKey] = useState(1);

  //   THis codeelow b will help to update the fomr state when it load with the init values
  useEffect(() => {
    refetch();
    if (data?._id) {
      let intervalId = setTimeout(() => {
        setUpdateKey(Math.random());

        console.log(":::::", JSON.parse(data.specifications));

        setSpecArr(JSON.parse(data.specifications));

        setImagesURL({
          image1: ProductUrl() + data?.image1,
          image2: ProductUrl() + data?.image2,
          image3: ProductUrl() + data?.image3,
        });
      }, 100);

      return () => clearTimeout(intervalId);
    }
  }, [data?._id, data.specifications]);

  // End

  const enteredSpec = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpec((prevState: any) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onAddSpecHandler = () => {
    let findProps = specArr.filter((el: any) => el.property === spec.property);

    if (findProps.length > 0) return alert("Item already exists");
    setSpecArr([...specArr, { ...spec, id: Math.random().toString() }]);

    setcustomError((prevState) => {
      return {
        ...prevState,
        spec: "",
      };
    });
  };

  const onDeleteSpecHandler = (id: number | string) => {
    let findProps = specArr.filter((el: any) => el.id !== id);

    setSpecArr(findProps);
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    imageKey: keyof IImages
  ) => {
    const file = event.target?.files?.[0];
    setImages((prevImages) => ({
      ...prevImages,
      [imageKey]: file,
    }));

    if (file) {
      setImagesURL((prevImages) => ({
        ...prevImages,
        [imageKey]: URL.createObjectURL(file as any),
      }));

      setcustomError((prevState) => {
        return {
          ...prevState,
          images: ``,
        };
      });
    }
  };

  const [customError, setcustomError] = useState({
    spec: "",
    images: "",
  });

  console.log(":::", customError);

  return (
    <AdminWrapper>
      <div>
        <Formik
          key={updateKey}
          initialValues={{
            name: data?.name!,
            description: data?.description!,
            category: data?.category!,
            brand: data?.brand!,
            price: data?.price!,
          }}
          onSubmit={(values) => {
            console.log("::::", values);
            //   togglePayment();

            // Validation
            if (specArr.length < 1) {
              setcustomError((prevState) => {
                return {
                  ...prevState,
                  spec: "Please add specifications",
                };
              });

              return console.log("Please add specifications");
            }

            // if (!images.image1) {
            //   setcustomError((prevState) => {
            //     return {
            //       ...prevState,
            //       images: `Please ensure you add at least the initial product images.`,
            //     };
            //   });

            //   return console.log("Please add product images (3)");
            // }

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("category", values.category);
            formData.append("brand", values.brand);
            formData.append("price", values.price);
            formData.append("_id", data?._id);
            formData.append("specifications", JSON.stringify(specArr));

            if (images.image1) {
              formData.append("uploads", images.image1);
            }
            if (images.image2) {
              formData.append("uploads", images.image2);
            }
            if (images.image3) {
              formData.append("uploads", images.image3);
            }

            PostRequest({
              url: "/update-product",
              body: formData,
            })
              .unwrap()
              .then((data) => {
                Swal.fire({
                  icon: "success",
                  title: data.message,
                });
                window.location.href = "/product/" + data?._id
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.data.message,
                });
                console.log(error);
              });
            //
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
              <p className={classes.form_title}>Create product</p>

              <div className={classes.form_row}>
                <div>
                  <label htmlFor=""> Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    name="name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                  {touched.name && errors.name && (
                    <p className={classes.error}>
                      {errors.name as unknown as any}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor=""> Description</label>
                  <input
                    type="text"
                    placeholder="enter product description"
                    name="description"
                    value={values.description}
                    onChange={handleChange("description")}
                  />
                  {touched.description && errors.description && (
                    <p className={classes.error}>
                      {errors.description as unknown as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={classes.form_row}>
                <div>
                  <label htmlFor="">Category</label>

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
                    <p className={classes.error}>
                      {errors.category as unknown as any}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="">Brand</label>
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
                    <p className={classes.error}>
                      {errors.brand as unknown as any}
                    </p>
                  )}
                </div>
              </div>

              <div className={classes.form_list}>
                <label htmlFor=""> Price</label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={values.price}
                  onChange={handleChange("price")}
                />
                {touched.price && errors.price && (
                  <p className={classes.error}>
                    {errors.price as unknown as any}
                  </p>
                )}
              </div>

              <div className={classes.form_row_2}>
                <div className={classes.form_row_2_xx}>
                  <label htmlFor="">Enter specifications </label>
                  <div className={classes.spec_wrapper}>
                    <input
                      type="text"
                      name="property"
                      placeholder="Property"
                      onChange={enteredSpec}
                    />
                    <input
                      type="text"
                      name="value"
                      placeholder="Value"
                      onChange={enteredSpec}
                    />
                    <button
                      disabled={
                        spec.property !== "" && spec.value !== "" ? false : true
                      }
                      onClick={onAddSpecHandler}
                    >
                      Add Spec
                    </button>

                    {customError.spec && (
                      <p className={classes.error}>{customError.spec}</p>
                    )}
                  </div>

                  <div className={classes.form_row_2_xx}>
                    {specArr.map((item: any) => {
                      return (
                        <div className={classes.spec_items}>
                          <b>{item.property}:</b> <span>{item.value}</span>{" "}
                          <b>
                            <BsTrash
                              onClick={() => onDeleteSpecHandler(item.id)}
                            />
                          </b>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="">Add images </label>
                  <div className={classes.img_wrappers}>
                    <div className={classes.img_box_wrapper}>
                      {imagesURL?.image1?.length > 0 && (
                        <img src={imagesURL.image1} alt="" />
                      )}
                      <div className={classes.plus_wrapper}>
                        <label htmlFor="img1">
                          <BsPlusLg size={25} />
                          <input
                            type="file"
                            id="img1"
                            style={{ display: "none" }}
                            name={"image1"}
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "image1")}
                          />
                        </label>{" "}
                      </div>
                    </div>
                    <div className={classes.img_box_wrapper}>
                      {imagesURL?.image2?.length > 0 && (
                        <img src={imagesURL.image2} alt="" />
                      )}{" "}
                      <div className={classes.plus_wrapper}>
                        <label htmlFor="img2">
                          <BsPlusLg size={25} />
                          <input
                            type="file"
                            id="img2"
                            style={{ display: "none" }}
                            name={"image2"}
                            onChange={(e) => handleImageChange(e, "image2")}
                          />
                        </label>
                      </div>
                    </div>
                    <div className={classes.img_box_wrapper}>
                      {imagesURL?.image3?.length! > 0 && (
                        <img src={imagesURL.image3} alt="" />
                      )}{" "}
                      <div className={classes.plus_wrapper}>
                        <label htmlFor="img3">
                          <BsPlusLg size={25} />
                          <input
                            type="file"
                            id="img3"
                            style={{ display: "none" }}
                            name={"image3"}
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "image3")}
                          />
                        </label>{" "}
                      </div>
                    </div>
                  </div>
                  {customError.images && (
                    <p className={classes.error}>{customError.images}</p>
                  )}
                </div>
              </div>

              <br />

              <div className={classes.form_list}>
                <button type="submit" onClick={() => handleSubmit()}>
                  {isLoading ? <Spinner /> : "Next"}
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </AdminWrapper>
  );
}

export default UpdateProduct;
