import { useEffect, useState } from "react";

const ImageComponent = ({ src, width, height, className }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };
      return;
    }

    setCurrentSrc(`https://placehold.co/${width}x${height}?text=NoImage`);

    return () => {
      //clean up function
      img.onload = null;
    };
  }, [height, src, width]);

  return (
    <>
      <img
        className={currentSrc === src ? className : `${className} blur-md`}
        //w-full rounded-lg blur-md
        src={currentSrc}
        width={width}
        height={height}
      />
    </>
  );
};
export default ImageComponent;
