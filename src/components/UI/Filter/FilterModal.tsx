import React from "react";
import { FaTimes } from "react-icons/fa";
import { FilterModalTypes } from "../../../types/types";
import Filter from "./FIlter";
import classes from "./Filter.module.css";

const FilterModal: React.FC<FilterModalTypes> = ({ toggleHandler }) => {
   const onCloseHandler = (e: any) => {
      if (e.target?.id === "mobile_wrapper") {
         toggleHandler();
      }
    };

  return (
    <div id="mobile_wrapper" onClick={onCloseHandler} className={classes.mobile_sidebar}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h2>Filter</h2>
          <FaTimes size={25} color={"black"} onClick={toggleHandler} />
        </div>
        <Filter />
      </div>
    </div>
  );
};

export default FilterModal;
