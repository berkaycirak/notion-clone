import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWidthChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidthChange);

    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return width;
};

export default useMediaQuery;
