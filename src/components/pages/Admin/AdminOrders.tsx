import React from "react";
import AdminOrderList from "../../AdminUI/AdminOrderList/AdminOrderList";
import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import classes from "../../../Styles/AdminOrders.module.css";
function AdminOrders() {
  return (
    <AdminWrapper>
      <div className={classes.cart_wrapper}>
        <AdminOrderList />
      </div>
    </AdminWrapper>
  );
}

export default AdminOrders;
