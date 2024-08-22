import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartList from "../Cart/CartList";
import NotFound from "../UI/NotFound/NotFound";
import Wrapper from "../UI/Wrapper/Wrapper";
import { useGetRequestQuery } from "../../store/services/users";
import classes from "../../Styles/Cart.module.css";
function Cart() {
  const { data: user } = useGetRequestQuery("/user");
  const [isLoogedIn, setIsLoggedIn] = useState<boolean>(true);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  let [carts, setCart] = useState([]);

  let [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    setInterval(() => {
      let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");
      setCart(storedItems);

      if (storedItems.length > 0) {
        let getTotal = storedItems.map((_item: any) => {
          _item.total = _item.price * _item.quantity;
          return _item;
        });

        let getNewTotal = getTotal.map((item: any) => item.total);

        let calcTotal = getNewTotal.reduce((a: any, b: any) => a + b, 0);

        setTotalBalance(calcTotal);
      }
    }, 100);
  }, []);

  return (
    <Wrapper>
      <main className={classes.main}>
        <article>
          <div>
            <p className={classes.title}>My Cart</p>
            <p className={classes.cart_sub_title}>
              You have amzing items in yout cart, you can simple inclreade the
              wauntity or you cart and the balance will be topped as well
            </p>
          </div>
          <br />
          <div className={classes.cart_wrapper}>
            {carts.map((item: any) => {
              return <CartList key={item.id} isCart={true} item={item} />;
            })}
          </div>



{carts.length < 1 && <NotFound /> }
        </article>

        <aside>
          <h1>Total: ${totalBalance.toLocaleString("en")}</h1>

          {isLoogedIn ? (
            <Link to={"/checkout"}>
              <button>Checkout now</button>
            </Link>
          ) : (
            <>
            <br />
              <p>
                You need to log in to proceed to checkout. Please log in to
                continue.
              </p>
              <Link to={"/login?redirect=checkout"}>
                <button>Login </button>
              </Link>
            </>
          )}
        </aside>
      </main>
    </Wrapper>
  );
}

export default Cart;
