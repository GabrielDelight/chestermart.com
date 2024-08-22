import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import LazyImage from "../LazzyLoad/LazyImage";
import Wrapper from "../UI/Wrapper/Wrapper";
import { ProductUrl } from "../../ImageUrl/ImageUrl";
import { useGetRequestQuery } from "../../store/services/users";
import classes from "../../Styles/Product.module.css";
import MatchingProduct from "../UI/MatchingProduct/MatchingProduct";
import { BsStar, BsStarFill } from "react-icons/bs";
function Product() {
  const { id: _id } = useParams();

  const { data = {} } = useGetRequestQuery("/product/" + _id);
  const { data: summary, isLoading } = useGetRequestQuery(
    `/ratings-summary/${_id}`
  );

  const [specArr, setSpecArr] = useState<any[]>([]);
  const [mainImage, setMaimImage] = useState<string>(
    ProductUrl() + data?.image1
  );

  const setSelectedImage = (_img: string) => {
    setMaimImage(ProductUrl() + _img);
  };

  useEffect(() => {
    setMaimImage(ProductUrl() + data?.image1);
  }, [data?.image1]);

  useEffect(() => {
    // Parse specifications safely, defaulting to an empty array if not valid JSON
    let rawSpec: any[] = [];

    try {
      rawSpec = JSON.parse(data?.specifications || "[]");
    } catch (e) {
      console.error("Error parsing specifications:", e);
    }

    if (Array.isArray(rawSpec)) {
      setSpecArr(rawSpec);
    }
  }, [data?.specifications]);

  let [counter, setCounter] = useState<{
    count: number;
  }>({
    count: 1,
  });

  useEffect(() => {
    let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");

    let [findDublicate] = storedItems.filter((item: any) => item._id === _id);

    if (findDublicate) {
      setCounter(() => {
        return {
          count: findDublicate.quantity,
        };
      });
    }
  }, []);

  const adjustQuantity = (type: string) => {
    setCounter((prevState) => {
      return {
        count: type === "inc" ? (prevState.count += 1) : (prevState.count -= 1),
      };
    });
  };

  const onAddToCart = () => {
    let storedItems = JSON.parse(window.localStorage.getItem("cart") || "[]");

    let findDublicate: [] = storedItems.filter((item: any) => item._id === _id);

    if (findDublicate.length > 0) {
      storedItems.map((cur: any) => {
        if (cur._id === _id) {
          cur.quantity = counter.count;
        }

        return cur;
      });

      localStorage.setItem("cart", JSON.stringify(storedItems));
      return;
    }

    let newArr = [
      ...storedItems,
      {
        ...data,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  return (
    <Wrapper>
      <main className={classes.main}>
        <div className={classes.left_side}>
          <LazyImage src={mainImage} alt="" height={400} />

          <div className={classes.img_lists}>
            <LazyImage
              onClick={() => setSelectedImage(data?.image1)}
              src={ProductUrl() + data?.image1}
              alt=""
            />

            {data?.image2?.length > 0 && (
              <div>
                <LazyImage
                  onClick={() => setSelectedImage(data?.image2)}
                  src={ProductUrl() + data?.image2}
                  alt=""
                />
              </div>
            )}
            {data?.image3?.length > 0 && (
              <div>
                <LazyImage
                  onClick={() => setSelectedImage(data?.image3)}
                  src={ProductUrl() + data?.image3}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>

        <div className={classes.right_side}>
          <h1 className={classes.h1}>{data?.name}</h1>
          <h4>Brand: {data?.brand}</h4>
          <h4>
            Price: {" "}
            <b>${data?.price!}</b>{" "}
            <del> ${data?.price! + data?.price! / 2}</del>
          </h4>

          <div className={classes.rating_wrap}>
            {[0, 1, 2, 3, 4].map((index) => {
              return (
                <div key={index}>
                  {summary?.ratings! <= index ? (
                    <BsStar color="chocolate" size={20} />
                  ) : (
                    <BsStarFill color="chocolate" size={20} />
                  )}
                </div>
              );
            })}

            <Link to={"/ratings/" + data?._id}>
              <p>({summary?.itemlength!} verified ratings)</p>
            </Link>
          </div>

          <div className={classes.btn_wrapper}>
            <div className={classes.qty_wrapper}>
              <button
                onClick={() => adjustQuantity("dsc")}
                disabled={counter.count === 1 ? true : false}
              >
                <FaChevronLeft />
              </button>
              <input type="number" disabled value={counter.count} />
              <button onClick={() => adjustQuantity("inc")}>
                <FaChevronRight />
              </button>
            </div>
            <button className={classes.cart_btn} onClick={onAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className={classes.dispcth_xx}>
            <div className={classes.dispatch_time}>
              <small>Dispatched in 5 - 7 weeks</small>

              <FaExclamationCircle />
            </div>

            <div className={classes.dispatch_time}>
              <small>Home Delivery - $10</small>
            </div>
          </div>

          <div className={classes.description}>
            <h4>DESCRIPTION</h4>

            <p className={classes.para}>{data?.description}</p>

            <div>
              {specArr.map((item, index) => {
                return (
                  <div key={index} className={classes.property_list}>
                    <h4>{item.property}:</h4>
                    <p>{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <section className="section">
        <h1>Matching With</h1>
        <MatchingProduct brand={data?.brand} category={data?.category} />
      </section>
    </Wrapper>
  );
}

export default Product;
