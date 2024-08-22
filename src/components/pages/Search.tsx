import React, { useEffect, useState } from 'react'
import { useGetRequestQuery, usePostRequestMutation } from '../../store/services/users';
import ProductList from '../ProductList/ProductList';
import Wrapper from '../UI/Wrapper/Wrapper'
import classes from "../../Styles/Home.module.css";
import Spinner from '../UI/Spinner/Spinner';
import NotFound from '../UI/NotFound/NotFound';
import { useInView } from 'react-intersection-observer';

function Search() {

   const { ref, inView } = useInView({
      threshold: 0.1,
    });
  
    const [limit, setLimit] = useState<number>(10);
    let url = new URLSearchParams(window.location.search)
    let query: string  =  url.get("query") as unknown as string
  
    const {
      data = [],
      isLoading,
      refetch,
    } = useGetRequestQuery(`/search-product?limit=${limit}&&query=${query}`);
  
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

        <div ref={ref} style={{ height: "20px" }} />
      </div>
    </Wrapper>
  )
}

export default Search