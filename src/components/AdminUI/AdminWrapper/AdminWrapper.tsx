import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AdminWrapperTypes } from "../../../types/types";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import classes from "./AdminWrapperStyles.module.css";

const AdminWrapper: React.FC<AdminWrapperTypes> = ({ children }) => {
  const [showSideBar, setShowSidebar] = useState(true);
  const toggleSideBar = () => {
    setShowSidebar(!showSideBar);
  };

  return (
    <>
      <AdminHeader />
      <main className={classes.main}>
        <aside>
          <AdminSideBar />
        </aside>
        <article>

          {children}
        </article>
      </main>
    </>
  );
};

export default AdminWrapper;
