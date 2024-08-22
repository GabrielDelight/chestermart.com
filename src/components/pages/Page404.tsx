import React from "react";
import {  useNavigate } from "react-router-dom";
import Header from "../UI/Header/Header";
import classes from "../../Styles/404.module.css";
const Page404 = () => {
  const naviaate = useNavigate();
  return (
    <div className={classes.container}>
      <Header />
      <h1>404</h1>
      <h3>We're sorry, but the page you're looking for cannot be found</h3>
      <h3>
        Please check the URL or try searching for the content you're looking
        for.
      </h3>
      <button onClick={() => naviaate(-1)}>Go back</button>
    </div>
  );
};

export default Page404;
