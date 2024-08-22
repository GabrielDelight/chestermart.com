import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AdminWrapper from "../../AdminUI/AdminWrapper/AdminWrapper";
import CartList from "../../Cart/CartList";
import {
  useGetRequestAdminQuery,
  usePostRequestAdminMutation,
} from "../../../store/services/admin";
import classes from "../../../Styles/AdminOrderList.module.css";

function AdminOrderListItems() {
  const { id } = useParams();
  const { data = [] } = useGetRequestAdminQuery("/admin-orders/" + id);
  const { data: billingAddress } = useGetRequestAdminQuery(
    "/get-admin-billing-address/" + id
  );

  console.log("::YYY::", billingAddress);

  const [PostRequest] = usePostRequestAdminMutation();

  const onUpdateStatusHandler = (status: string) => {
    PostRequest({
      url: "/update-order-status",
      body: {
        status: status,
        order_id: id,
      },
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: data.message,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });

        console.log(error);
      });
  };

  return (
    <AdminWrapper>
      <main className={classes.main}>
        <div className={classes.article}>
          <p>
            <Link to={"/admin/orders"}>Order</Link> / item
          </p>
          <div></div>
          <br />
          <div className={classes.cart_wrapper}>
            {data.map((item: any) => {
              return <CartList item={item} />;
            })}
          </div>
        </div>

        <div className={classes.aside}>
          <div className={classes.update_btns}>
            <h3>Order Status</h3>
            <button
              style={{ backgroundColor: "green" }}
              onClick={() => onUpdateStatusHandler("paid")}
            >
              Paid
            </button>
            <button
              style={{ backgroundColor: "orange" }}
              onClick={() => onUpdateStatusHandler("pending")}
            >
              Pending
            </button>
            <button
              style={{ backgroundColor: "blue" }}
              onClick={() => onUpdateStatusHandler("success")}
            >
              Success
            </button>
            <button
              style={{ backgroundColor: "chocolate" }}
              onClick={() => onUpdateStatusHandler("processing")}
            >
              Processing
            </button>
            <button
              style={{ backgroundColor: "purple" }}
              onClick={() => onUpdateStatusHandler("delivered")}
            >
              Delivered
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => onUpdateStatusHandler("rejected")}
            >
              Rejected
            </button>
          </div>

          <hr className={classes.hr} />

          <div className={classes.order_details}>
            <h3>Order Details</h3>
            <p>
              <b>Status:</b> {billingAddress?.status!}
            </p>
            <p>
              <b>Quantity:</b> {billingAddress?.quantity!}
            </p>
            <p>
              <b>Total</b> amount {billingAddress?.total!}
            </p>
            <p>
              <b>Address:</b> {billingAddress?.address!}{" "}
            </p>
            <p>
              <b>Phone</b> Nu:mber {billingAddress?.phoneNumber!}
            </p>
            <p>
              <b>Email:</b> {billingAddress?.email!}
            </p>
            <p>
              <b>State:</b> {billingAddress?.state!}
            </p>
            <p>
              <b>City:</b> {billingAddress?.city!}
            </p>
            <p>
              <b>Postal code:</b> {billingAddress?.postalCode!}
            </p>
          </div>
        </div>
      </main>
    </AdminWrapper>
  );
}

export default AdminOrderListItems;
