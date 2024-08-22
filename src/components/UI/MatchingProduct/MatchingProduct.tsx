import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useGetRequestQuery } from '../../../store/services/users';
import { MatchingProductTypes } from '../../../types/types';
import ProductList from '../../ProductList/ProductList';
import NotFound from '../NotFound/NotFound';
import Spinner from '../Spinner/Spinner';
import classes from "./MatchingProduct.module.css"

const MatchingProduct: React.FC<MatchingProductTypes>  = ({brand, category}) => {
   const { ref, inView } = useInView({
      threshold: 0.1,
    });
  
    const [limit, setLimit] = useState<number>(10);
  
    const {
      data = [],
      isLoading,
      refetch,
    } = useGetRequestQuery(
      `/filter-products?limit=${limit}&&category=${category}&&brand=${brand}&&maxPrice=${90000000}&&minPrice=${0}`
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

        <div id="posts" ref={ref} style={{ height: "20px" }} />
    </div>
  )
}

export default MatchingProduct