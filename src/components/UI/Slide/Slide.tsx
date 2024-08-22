import LazyLoad from "../../LazzyLoad/LazyLoad";
import classes from "./Slide.module.css";
function Slide() {
  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <h2>Last Minute Gift Guild</h2>
        <h2>Up to 50% OFF</h2>

        <div>
          <p>
            Get up to 50% off with our Last Minute Gift Guide! Find perfect
            gifts and save big. Don’t miss out!
          </p>
        </div>
        <a href="#posts" aria-label={"Shop now link"}>
          <button>Shop now</button>
        </a>
      </div>

      <LazyLoad className={classes.right}>
  
        <div className={classes.floating_text}>
          <p>Buy from Chestermart</p>
        </div>
      
      </LazyLoad>
    </div>
  );
}

export default Slide;
