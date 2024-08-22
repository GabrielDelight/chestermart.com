import React from "react";
import OrderList from "../../UI/Order/OrderList";
import ProfileWrapper from "../../UI/Wrapper/ProfileWrapper";
import classes from "../../../Styles/OrdersStyles.module.css";
function Orders() {
  return (
    <ProfileWrapper>
      <main>
        <div>
         
          <OrderList />
        </div>
      </main>
    </ProfileWrapper>
  );
}

export default Orders;
