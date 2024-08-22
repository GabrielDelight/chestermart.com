import LazyLoadLibrary  from "react-lazyload";

function LazyLoad(props) {
  return (
    <LazyLoadLibrary className={props.className}>{props.children}</LazyLoadLibrary>
  )
}

export default LazyLoad