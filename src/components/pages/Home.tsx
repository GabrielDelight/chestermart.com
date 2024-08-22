import ProductList from "../ProductList/ProductList";
import Slide from "../UI/Slide/Slide";
import Wrapper from "../UI/Wrapper/Wrapper";
import classes from "../../Styles/Home.module.css";
import { useGetRequestQuery } from "../../store/services/users";
import Spinner from "../UI/Spinner/Spinner";
import NotFound from "../UI/NotFound/NotFound";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import VideoCard from "../UI/VideoCard/VideoCard";

function Home() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [limit, setLimit] = useState<number>(10);

  // Fetch items
  const {
    data = [],
    isLoading,
    refetch,
  } = useGetRequestQuery("/products?limit=" + limit);

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
      <div>
        <div className={classes.slide_wrapper}></div>

        <Slide />

        <VideoCard />
        <div className={classes.product_wrapper}>
          <h1 className="title">Popular items</h1>
        </div>
        <br />
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
      </div>
    </Wrapper>
  );
}

export default Home;
