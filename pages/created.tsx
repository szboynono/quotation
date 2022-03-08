import React, { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import Confetti from "react-confetti";
import { AppContext } from "../context/AppContext";

function created() {
  const { id, currentNetwork } = useContext(AppContext);
  const [windowSize, setWindowSize] = useState({
    height: 0,
    width: 0,
  });

  const debouncedSetWindowSize = debounce(
    () =>
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      }),
    800
  );

  useEffect(() => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    window.addEventListener("resize", () => {
      debouncedSetWindowSize();
    });
  }, []);

  return (
    <div className="h-[80vh] flex items-center justify-center flex-col">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />
      <div className="flex flex-col items-center">
        <h1 className="font-manrope text-4xl bold">
          <span className="text-pink-400">Congratulation!</span> You just
          created a quote on the blockchain!
        </h1>
        <div className="flex flex-col text-center mt-40">
        <a
          href={`https://${currentNetwork === '0x4' ? 'testnets.' : ''}opensea.io/assets/0xcba687550c4cb2b737f69826eb2b158697aea754/${id}`}
          className="text-lg underline hover:decoration-pink-400 mb-4"
          >
          View on opensea
        </a>
        <p className="text-gray-800 text-xs">Note: it may take a minute or two for opensea to show the image, please try to refresh the metadata in opensea if you can't see the image.</p>
        </div>
      </div>
    </div>
  );
}

export default created;
