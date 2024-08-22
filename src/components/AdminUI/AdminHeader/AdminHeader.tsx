import  { useEffect, useState } from "react";
import classes from "./AdminHeader.module.css";
import {  FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useGetRequestAdminQuery } from "../../../store/services/admin";
import LazyImage from "../../LazzyLoad/LazyImage";
import { FiMenu } from "react-icons/fi";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

function AdminHeader() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data: user, refetch } = useGetRequestAdminQuery("/admin");
  const navigate = useNavigate();


  const isTokenExpired = (token: any) => {
    if (!token || token === "undefined") {
      navigate("/admin/login");
      return
    };
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Math.floor(Date.now() / 1000) >= payload.exp;
  };

  // Example usage:
  const token = localStorage.getItem("admin-token");
  const expired = isTokenExpired(token);

  console.log("===>", expired);

  useEffect(() => {
    if (expired) {
      alert("Session has expired");
    }
    if (expired || !token || token.length < 1) {
      navigate("/admin/login");
    }
  }, [expired]);

  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const onCloseHandler = (e: any) => {
    if (e.target?.id === "mobile_wrapper") {
      toggleSideBar();
    }
  };

  return (
    <div className={classes.header}>
      <div className={classes.left_}>
        <div className={classes.logo}>
          <Link to={"/admin/dashboard"} aria-label={"logo"}>
            <LazyImage src="/images/logo.webp" width={50} height={50} />
          </Link>{" "}
        </div>
      </div>

      <div className={classes.right_}>
        <Link to={"/admin/dashboard"} aria-label={"User name"}>
          <div className={classes.user_profile}>
            <span>{user?.firstname.substr(0, 1)}</span>
            <span>{user?.lastname.substr(0, 1)}</span>
          </div>
        </Link>

        <div className={classes.menu}>
          <FiMenu size={25} onClick={toggleSideBar} />
        </div>
      </div>

      {showSideBar && (
        <>
          <div
            id="mobile_wrapper"
            className={classes.mobile_sidebar}
            onClick={onCloseHandler}
          >
            <div className={classes.wrapper}>
              <div className={classes.close_wrapper}>
                <FaTimes size={45} color={"white"} onClick={toggleSideBar} />
              </div>
              <AdminSideBar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHeader;
