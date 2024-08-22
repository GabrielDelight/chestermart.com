import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchModalTypes } from "../../../types/types";
import Spinner from "../Spinner/Spinner";
import classes from "./SearchModal.module.css";
const SearchModal: React.FC<SearchModalTypes> = ({ item = [], isLoading }) => {
  let splicedItem = item?.slice?.(0, 10)!;

  return (
    <>
      <div className={classes.search_wrapper}>
        {isLoading && <Spinner />}
        {splicedItem.map((item: any, index: number) => {
          return (
            <Link to={"/search?query=" + item.name}>
              <div key={index} className={classes.list_wrapper}>
                <FaSearch />
                <p>{item.name}</p>
              </div>
            </Link>
          );
        })}

        {isLoading && <Spinner />}

        {splicedItem.length < 1 && isLoading === false ? (
          <p>No item found</p>
        ) : null}
      </div>
    </>
  );
};

export default SearchModal;
