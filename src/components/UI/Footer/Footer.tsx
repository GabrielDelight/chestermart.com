import { BsEnvelope, BsPhone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import LazyImage from "../../LazzyLoad/LazyImage";
import LazyLoad from "../../LazzyLoad/LazyLoad";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.col1}>
        <Link to={"/"} aria-label={"home"}>
        <LazyLoad>
              <LazyImage  src="/images/logo.webp" />
            </LazyLoad>

        </Link>{" "}
        <p>
          Discover the latest trends in fashion at our e-commerce store, where
          style meets affordability. Shop a wide selection of clothing,
          accessories, and footwear for every occasion. Elevate your wardrobe
          with our curated collections designed to make you look and feel your
          best.
        </p>
      </div>
      <div className={classes.col2}>
        <h2>Help</h2>
        <ul>
          {/* <li>E commerce</li> */}
          <li>Delivery and timelines</li>
          <li>24/7 support</li>
        </ul>
      </div>
      <div className={classes.col3}>
        <h2>Contact</h2>
        <ul>
          <li>
            <i>
              <BsPhone />
            </i>
            <span>01-1234567; 02-1234567</span>
          </li>

          <li>
            <i>
              <BsEnvelope />
            </i>
            <span>support@chestermart.com</span>
          </li>

          <li>
            <i>
              <FiMapPin />
            </i>
            <span>Block 63, Port Harcourt, RIver, Nigeria.</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
