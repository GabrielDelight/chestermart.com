import React from "react";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductUrl } from "../../ImageUrl/ImageUrl";
import { ProductListTypes } from "../../types/types";
import LazyImage from "../LazzyLoad/LazyImage";
import LazyLoad from "../LazzyLoad/LazyLoad";
import classes from "./ProductList.module.css";
const ProductList: React.FC<ProductListTypes> = ({
  image,
  price,
  name,
  _id,
  item,
}) => {
  const onAddToCartHandler = () => {
    let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");

    let findDublicate: [] = storedItems.filter((item: any) => item._id === _id);

    if (findDublicate.length > 0) {
      storedItems.map((cur: any) => {
        if (cur._id === _id) {
          cur.quantity += 1;
        }

        return cur;
      });


      localStorage.setItem("cart", JSON.stringify(storedItems));

      return;
    }

    let newArr = [
      ...storedItems,
      {
        ...item,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newArr));

  };

  return (
    <div className={classes.main_}>
      <div className={classes.img_wrapper}>
        <LazyLoad offset={120} height={120}>
          <LazyImage src={ProductUrl() + image} alt={name} />
        </LazyLoad>
      </div>
      <div>
        <p>{name}</p>
        <p>
          <b>${price}</b> <del>${price + price / 2}</del>
        </p>
      </div>

      <div className={classes.add_to_cart_wrapper} onClick={onAddToCartHandler}>
        <div>
          <FaCartPlus size={20} />
        </div>{" "}
        <Link to={"/product/" + _id} aria-label={name} >
          <div>
            <FaEye size={20} />
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
