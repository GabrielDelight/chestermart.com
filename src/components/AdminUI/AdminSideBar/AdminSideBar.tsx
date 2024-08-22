import React from "react";
import { Link } from "react-router-dom";
import classes from "./AdminSideBar.module.css";
function AdminSideBar() {
  return (
    <div className={classes.main}>
      <ul>
        <li>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/admin/orders"}>Orders</Link>
        </li>

        <li>
          <Link to={"/admin/products"}>Products</Link>
        </li>

        <li>
          <Link to={"/admin/brands"}>Brands</Link>
        </li>
        <li>
          <Link to={"/admin/categories"}>Categories</Link>
        </li>
        <li>
          <Link to={"/admin/users"}>Users</Link>
        </li>
        <li>
          <Link to={"/admin/admins"}>Admins</Link>
        </li>

        <li>
          <Link to={"/admin/login"} style={{ color: "red" }}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
