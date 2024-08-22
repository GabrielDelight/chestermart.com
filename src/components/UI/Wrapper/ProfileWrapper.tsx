import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileWrapperTypes } from "../../../types/types";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import classes from "./ProfileStyles.module.css";
const ProfileWrapper: React.FC<ProfileWrapperTypes> = ({ children }) => {
  const navigate = useNavigate();

  const isTokenExpired = (token: any) => {
    if (!token || token === "undefined") {
      navigate("/login");

      return;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Math.floor(Date.now() / 1000) >= payload.exp;
  };

  // Example usage:
  const token = localStorage.getItem("token");
  const expired = isTokenExpired(token);

  useEffect(() => {
    if (expired) {
      alert("Session has expired");
    }
    if (expired || !token || token.length < 1) {
      navigate("/login");
    }
  }, [expired]);

  return (
    <>
      <Header />
      <main className={classes.main}>
        <aside>
          <SideBar />
        </aside>
        <article>{children}</article>
      </main>
    </>
  );
};

export default ProfileWrapper;
