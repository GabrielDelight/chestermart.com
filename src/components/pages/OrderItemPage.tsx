import ProfileWrapper from "../UI/Wrapper/ProfileWrapper";
import classes from "../../Styles/OrderItemPage.module.css";
import CartList from "../Cart/CartList";
import { Link, useParams } from "react-router-dom";
import { useGetRequestQuery } from "../../store/services/users";
import CreateRatings from "../UI/Ratings/CreateRatings";
function OrderItemPage() {
  const { id } = useParams();
  const { data = [] } = useGetRequestQuery("/orders/" + id);
  return (
    <ProfileWrapper>
      <main className={classes.main}>
        <div className={classes.article}>
          <p>
            <Link to={"/my-order"}>Order</Link> / item
          </p>
          <div>
            <p className={classes.title}>My Order Lists</p>
            <p className={classes.cart_sub_title}>
              Here is your fantastic order list, and we are pleased to inform
              you that your item has been approved by our admin.
            </p>
          </div>
          <br />
          <div className={classes.cart_wrapper}>
            {data.map((item: any) => {
              return <CartList item={item} hasRatings={true} />;
            })}
          </div>
        </div>

      
    
      </main>
    </ProfileWrapper>
  );
}

export default OrderItemPage;
