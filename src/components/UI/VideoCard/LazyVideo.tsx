import React, { useEffect, useRef, useState } from "react";
import LazyLoad from "../../LazzyLoad/LazyLoad";

interface LazyVideoProps {
  src: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({ src, ...props }) => {
  return (
    <>
      <LazyLoad>
        {/* <video muted autoPlay width="100%" {...props} loop> */}
        <video  width="100%" {...props} loop>
          <source src={src} type="video/mp4" />
          <track
                    kind="subtitles"
                    src="/captions.vtt"
                    srcLang="en"
                    label="English"
                />
          Your browser does not support the video tag.
        </video>
      </LazyLoad>
    </>
  );
};

export default LazyVideo;
