import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductUrl } from "../../ImageUrl/ImageUrl";
import { CartListTypes } from "../../types/types";
import LazyImage from "../LazzyLoad/LazyImage";
import CreateRatings from "../UI/Ratings/CreateRatings";
import classes from "./CartList.module.css";
const CartList: React.FC<CartListTypes> = ({
  item,
  isCart = false,
  hasRatings = false,
}) => {
  const onDeleteHandler = () => {
    let isDeleting = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (!isDeleting) return;
    let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");
    let filteredItems = storedItems.filter(
      (_item: any) => _item._id !== item._id
    );
    localStorage.setItem("cart", JSON.stringify(filteredItems));
  };

  const adjustQuantity = (type: string) => {
    let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");

    let findDublicate: [] = storedItems.filter(
      (_item: any) => _item._id === item._id
    );

    if (findDublicate.length > 0) {
      storedItems.map((cur: any) => {
        if (cur._id === item._id) {
          if (cur.quantity >= 1) {
            if (type == "inc") cur.quantity += 1;
            if (type == "dsc") cur.quantity -= 1;
          } else {
            cur.quantity = 1;
          }
        }

        return cur;
      });

      localStorage.setItem("cart", JSON.stringify(storedItems));

      return;
    }
  };

  const [showReview, setShowReview] = useState<boolean>(false);
  const onToggleReviewHandler = () => {
    setShowReview(!showReview);
  };

  return (
    <div className={classes.main}>
      <div className={classes.img_wrapper}>
        <Link to={"/product/" + item._id}>
          <LazyImage src={ProductUrl() + item.image1} alt="" />
        </Link>
      </div>

      <div className={classes.details_wrapper}>
        <p className={classes.big_txt}>
          {item.name} ({item.brand})
        </p>

        {/* <p>Brand: RandomStyles</p> */}
        {/* <p className={classes.product_code}>Product code: {}</p> */}

        <div className={classes.price_wrapper}>
          {/* <p>Price</p> */}

          <div>
            <b>
              {item?.price?.toLocaleString("en")} x {item.quantity} = $
              {(item?.price * item.quantity).toLocaleString()}
            </b>
            {/* <del>${(item.price + item.price / 2).toLocaleString()}</del>{" "} */}
          </div>
        </div>

        {isCart && (
          <div className={classes.btn_wrapper}>
            <div className={classes.qty_wrapper}>
              <button
                onClick={() => adjustQuantity("dsc")}
                disabled={item.quantity === 1 ? true : false}
              >
                <FaChevronLeft />
              </button>
              <input type="number" disabled value={item.quantity} />
              <button onClick={() => adjustQuantity("inc")}>
                <FaChevronRight />
              </button>
            </div>
            <button className={classes.cart_btn} onClick={onDeleteHandler}>
              {" "}
              {/* <FaTrash /> */}
              Remove
            </button>
          </div>
        )}

        {hasRatings && (
            
              <button
                className={classes.cart_btn}
                onClick={onToggleReviewHandler}
              >
                {" "}
                Give a review
              </button>
          
        )}

{showReview && (
        <CreateRatings
          productId={item._id}
          onCloseHandler={onToggleReviewHandler}
        />

        )}
      </div>
    </div>
  );
};

export default CartList;
