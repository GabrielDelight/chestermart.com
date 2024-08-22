import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = (props) => {

  return (
    <LazyLoadImage
      alt={!props.alt? "image": props.alt}
      width={props.width}
      height={props.height}
      effect="blur"
      src={props.src}
      className={props.className}
      onClick={props.onClick}    
      placeholderSrc={"/images/image-loader.png"}
    />
  );
};

export default LazyImage;
