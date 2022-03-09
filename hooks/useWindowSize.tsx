import { debounce } from "lodash";
import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const debouncedSetWindowSize = debounce(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 500);
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      debouncedSetWindowSize();
    });

    return () => {
      window.removeEventListener("resize", () => {
        debouncedSetWindowSize();
      });
    };
  }, []);

  return { width, height };
}

export default useWindowSize;
