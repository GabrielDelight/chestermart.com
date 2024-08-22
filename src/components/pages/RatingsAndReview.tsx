import React, { useEffect, useState } from "react";
import Wrapper from "../UI/Wrapper/Wrapper";
import classes from "../../Styles/RatingsAndReview.module.css";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { useGetRequestQuery } from "../../store/services/users";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import NotFound from "../UI/NotFound/NotFound";
function RatingsAndReview() {

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [limit, setLimit] = useState<number>(10);
  const { id } = useParams();

  const {
    data = [],
    isLoading,
    refetch,
  } = useGetRequestQuery(`/ratings/${id}?limit=${limit}`);

  const { data: summary, isLoading: loadSummmary } = useGetRequestQuery(
    `/ratings-summary/${id}`
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
          <p>VERIFIED RATINGS ({summary?.itemlength})</p>
          <div className={classes.box}>
            <h1>{summary?.ratings!}/5</h1>
            <div className={classes.star_wrapper}>
              {[0, 1, 2, 3, 4].map((index) => {
                return (
                  <div key={index}>
                    {summary?.ratings! <= index ? (
                      <BsStar color="chocolate" size={25} />
                    ) : (
                      <BsStarFill color="chocolate" size={25} />
                    )}
                  </div>
                );
              })}
            </div>

            <p>{summary?.itemlength} verified ratings</p>
          </div>

          <div className={classes.summary_last}>
            {summary?.starArr?.map((item: any, index: number) => {
              return (
                <div className={classes.sumaary_list}>
                  <div className={classes.summary_row}>
                    <p>{item?.index!} </p>
                    <BsStarFill color="chocolate" size={20} />
                    <p>({item?.ratings!})</p>
                  </div>
                  <div className={classes.pipe_wrapper}>
                    <div
                      style={{
                        width: `${
                          (item?.ratings! / parseInt(summary?.starArr?.length!)) * 100
                        }%`,
                      }}
                      className={classes.pipe}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        <article>
          <p>Verified Customer Feedback</p>
          <br />
          <br />

          {data.map((item: any) => {
            return (
              <div className={classes.rating_container}>
                <div className={classes.star_wrapper}>
                  {[0, 1, 2, 3, 4].map((index) => {
                    return (
                      <div key={index}>
                        {item?.rating! <= index ? (
                          <BsStar color="chocolate" size={25} />
                        ) : (
                          <BsStarFill color="chocolate" size={25} />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p>{item.comment!}</p>
                <p className={classes.bottom_txt}>
                  {new Date(item?.createdAt!).toLocaleDateString()} by{" "}
                  {item?.full_name}
                </p>{" "}
              </div>
            );
          })}

          {isLoading && <Spinner />}

          {data.length < 1 && isLoading === false ? <NotFound /> : null}

          <div id="posts" ref={ref} style={{ height: "20px" }} />
        </article>
      </main>
    </Wrapper>
  );
}

export default RatingsAndReview;
