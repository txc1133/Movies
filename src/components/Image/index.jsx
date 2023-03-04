import React, { useState, useRef, useEffect } from "react";

function LazyImage(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(props.src);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px 100% 0px", // Load image when it's 100% in view
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [props.src]);

  return <img ref={imgRef} {...props} src={imageSrc} />;
}

export default LazyImage;