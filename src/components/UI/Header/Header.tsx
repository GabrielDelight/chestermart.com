import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetRequestQuery,
  usePostRequestMutation,
} from "../../../store/services/users";
import SearchModal from "./SearchModal";
import LazyImage from "../../LazzyLoad/LazyImage";
import { FiMenu } from "react-icons/fi";
import SideBar from "../SideBar/SideBar";
import FilterModal from "../Filter/FilterModal";
import { BsFunnelFill } from "react-icons/bs";
import LazyLoad from "../../LazzyLoad/LazyLoad";

function Header() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data: user, refetch } = useGetRequestQuery("/user");
  const [isLoogedIn, setIsLoggedIn] = useState<boolean>(true);
  const naviagate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const reFetchData = async () => {
    // await refetch();
  };

  useEffect(() => {
    const intervalId = setInterval(reFetchData, 1000);
    return () => clearInterval(intervalId);
  }, [window.location.search]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user?._id, localStorage.getItem("token")]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("token")]);

  let [carts, setCart] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");
      let getQuantity = storedItems.map((item: any) => item.quantity);

      let calc = getQuantity.reduce((a: any, b: any) => a + b, 0);
      setCart(calc);
    }, 1000);
  }, []);

  // Real-time Search
  let [enteredValue, setEnteredValue] = useState<string>(""); // Imported
  const onCHangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  useEffect(() => {
    // IMported useEffect
    if (enteredValue.length > 0) {
      setShowSearchModal(true);
    } else {
      setShowSearchModal(false);
    }
  }, [enteredValue]);

  const [PostRequest, { isLoading }] = usePostRequestMutation(); // Imported

  const [foundItem, setFoundItem] = useState([]);
  useEffect(() => {
    if (enteredValue.length < 1) return;

    let intervalIdid = setTimeout(() => {
      PostRequest({
        url: "/search-product",
        body: {
          query: enteredValue,
        },
      })
        .unwrap()
        .then((data) => {
          console.log(data);
          setFoundItem(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 600);

    return () => clearTimeout(intervalIdid);
  }, [enteredValue]);

  const onCLickSearchHandler = () => {
    naviagate("/search?query=" + enteredValue);
  };

  // End of search

  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const onCloseHandler = (e: any) => {
    if (e.target?.id === "mobile_wrapper") {
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [isLoogedIn]);

  // FIlter
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const toggleFilterModal = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className={classes.header}>
      <div className={classes.left_}>
        <div className={classes.logo}>
          <Link to={"/"} aria-label={"logo"}>
            <LazyLoad>
              <LazyImage width={40} height={40} src="/images/logo.webp" />
            </LazyLoad>{" "}
          </Link>{" "}
        </div>

        {showSearchModal && (
          <div
            className={classes.overlay}
            onClick={() => setShowSearchModal(false)}
          ></div>
        )}

        <div className={classes.input_wrapper}>
          <input
            type="text"
            onChange={onCHangeHandler}
            placeholder="Search for anything: name, description, brand, and category "
          />
          <button
            onClick={onCLickSearchHandler}
            disabled={enteredValue.length < 1 ? true : false}
          >
            Search
          </button>

          {showSearchModal && (
            <SearchModal
              item={foundItem}
              onCloseHandler={() => setShowSearchModal(false)}
              isLoading={isLoading}
            />
          )}

          <div className={classes.search_icon}>
            <FaSearch />
          </div>
        </div>
      </div>

      <div className={classes.right_}>
        <div className={classes.logo}>
          <Link to={"/"} aria-label={"image"}>
            <LazyLoad>
              <LazyImage width={40} height={40} src="/images/logo.webp" />
            </LazyLoad>
          </Link>{" "}
        </div>

        <div className={classes.row_}>
          <div
            className={classes.small_icons + " " + classes.funnel}
            onClick={toggleFilterModal}
          >
            <BsFunnelFill size={17} color="white" />
          </div>
          <Link to={"/cart"} aria-label={"cart link"}>
            <div className={classes.small_icons}>
              <FaShoppingCart size={17} color="white" />
              <div className={classes.floating_text}>
                <p>{carts}</p>
              </div>
            </div>
          </Link>

          {isLoogedIn ? (
            <>
              <Link to={"/account"}  aria-label={"account link"}>
                <div className={classes.user_profile}>
                  <span>{user?.firstname.substr(0, 1)}</span>
                  <span>{user?.lastname.substr(0, 1)}</span>
                </div>
              </Link>

              <div className={classes.menu}>
                <FiMenu size={25} onClick={toggleSideBar} />
              </div>
            </>
          ) : (
            <Link to={"/login"}>
              <button className={classes.login_btn}>Login</button>
            </Link>
          )}
        </div>
      </div>

      {/* Side bar */}
      {isLoogedIn && (
        <>
          {showSideBar && (
            <>
              <div
                id="mobile_wrapper"
                className={classes.mobile_sidebar}
                onClick={onCloseHandler}
              >
                <div className={classes.wrapper}>
                  <div className={classes.close_wrapper}>
                    <FaTimes
                      size={25}
                      color={"white"}
                      onClick={toggleSideBar}
                    />
                  </div>
                  <SideBar />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Filter Side bar */}
      {showFilter && <FilterModal toggleHandler={toggleFilterModal} />}
    </div>
  );
}

export default Header;
