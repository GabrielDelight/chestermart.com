import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { usePostRequestMutation } from "../../../store/services/users";
import { CreateRatingsTypes } from "../../../types/types";
import classes from "./CreateRatings.module.css";

const CreateRatings: React.FC<CreateRatingsTypes> = ({productId, onCloseHandler}) => {
   const [PostRequest] = usePostRequestMutation();
  let [rating, setRating] = useState<number>(0);
  let [comment, setComments] = useState<string>("");

  const setRatings = (index: number) => {
   setRating(index + 1)
  }

  const onSubmitHandler = () => {
   if(rating < 1) return alert("Please give a rating")
   if(comment.length < 1) return alert("Please enter your review")

   PostRequest({
      url: "/ratings",
      body: {
         rating,
         comment,
         productId

      },
    })
      .unwrap()
      .then((data) => {
        console.log(data);

        Swal.fire({
         icon: "success",
         text: data.message,
       });
       onCloseHandler()
      //   Navigate("/admin/dashboard");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });

        console.log(error);
      });
  }

  return (
    <div className={classes.container} id="wrapper-close">
      <div className={classes.wrapper}>
        <header>
          <p>Ratings and Review</p>
          <FaTimes onClick={onCloseHandler} />
        </header>

        <div>
          <div className={classes.star_wrapper}>
            {[0, 1, 2, 3, 4].map((index) => {
              return (
                <div key={index} onClick={() => setRatings(index)}>
                  {rating <= index ? (
                     <BsStar color="chocolate" size={25} />
                     ) : (
                     <BsStarFill color="chocolate" size={25} />
                  )}
                </div>
              );
            })}
          </div>
          <textarea onChange={(e) => setComments(e.target.value)} placeholder="Enter a review" name="" id="" maxLength={100} ></textarea>
          <button onClick={onSubmitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRatings;
