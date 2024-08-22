import React from "react";
import { FaTimes } from "react-icons/fa";
import { CardPaymentTypes } from "../../types/types";
import classes from "./CardPayment.module.css";
const CardPayment: React.FC<CardPaymentTypes> = ({
  onClodeHandler,
  onSubmitHandler,
}) => {
  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <header>
          <h3>Card Payment</h3>

          <FaTimes onClick={onClodeHandler} />
        </header>
        <div className={classes.form}>
          <div className={classes.form_row}>
            <div>
              <label htmlFor="">CARD NUMBER</label>
              <input type="text" placeholder="1234 123 1234 123" />
            </div>

            <div>
              <label htmlFor="">CVC</label>
              <input type="text" placeholder="000" />
            </div>
          </div>

          <div className={classes.form_list}>
            <label htmlFor="">CARD HOLDER NAME</label>
            <input type="number" placeholder="John Smith" />
          </div>

          <div className={classes.form_list}>
            <label htmlFor="">EXPIRATION DATE</label>
            <input type="number" placeholder="John Smith" />
          </div>

          <div className={classes.expiration_date}>
            <div className={classes.day}>
              <label htmlFor="">DAY</label>
              <input type="text" placeholder="1234 123 1234 123" />
            </div>

            <div className={classes.month}>
              <label htmlFor="">CMONTHVC</label>
              <input type="text" placeholder="000" />
            </div>

            <div className={classes.year}>
              <label htmlFor="">YEAR</label>
              <input type="text" placeholder="000" />
            </div>
          </div>

          <button onClick={onSubmitHandler}>COMPLETE ORDER (TOTAL: 200)</button>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
