import React, { useEffect, useState } from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import classes from "../../Styles/Filter.module.css";
import Filter from "../UI/Filter/FIlter";
import ProductList from "../ProductList/ProductList";
import { useInView } from "react-intersection-observer";
import { useGetRequestQuery } from "../../store/services/users";
import Spinner from "../UI/Spinner/Spinner";
import NotFound from "../UI/NotFound/NotFound";
const FilterScreen = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [limit, setLimit] = useState<number>(10);
  let [items, setItems] = useState<{
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  }>({
    category: "",
    brand: "",
    minPrice: 1000,
    maxPrice: 20000,
  });

  let url = new URLSearchParams(window.location.search);
  let brand = url.get("brand") as unknown as string;
  let category = url.get("category") as unknown as string;
  let minPrice = url.get("minPrice") as unknown as number;
  let maxPrice = url.get("maxPrice") as unknown as number;

  useEffect(() => {
    setItems({
      brand,
      category,
      minPrice,
      maxPrice,
    });

    refetch();

  }, [brand, category, minPrice, maxPrice]);

  const {
    data = [],
    isLoading,
    refetch,
  } = useGetRequestQuery(
    `/filter-products?limit=${limit}&&category=${items.category}&&brand=${items.brand}&&maxPrice=${items.maxPrice}&&minPrice=${items.minPrice}`
  );

  useEffect(() => {
    if (inView) {
      setLimit(limit + 10);
      setTimeout(() => {
        refetch();
      }, 100);
    }
  }, [inView]);

  return (
    <Wrapper>
      <main className={classes.main}>
        <aside>
          <Filter />
        </aside>
        <article>
        <h3>Filter</h3>

          <div className={classes.product_wrapper}>
            {data.map((item: any) => {
              return (
                <ProductList
                  image={item.image1}
                  name={item.name}
                  price={item.price}
                  key={item.id}
                  _id={item._id}
                  item={item}
                />
              );
            })}
          </div>

          {isLoading && <Spinner />}

          {data.length < 1 && isLoading === false ? <NotFound /> : null}

          <div id="posts" ref={ref} style={{ height: "20px" }} />
        </article>
      </main>
    </Wrapper>
  );
};

export default FilterScreen;
