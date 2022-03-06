import type { NextPage } from "next";
import { useCallback, useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaQuoteLeft } from "react-icons/fa";
import domtoimage from "dom-to-image";
import { create } from "ipfs-http-client";

const charLimit = 365;

const client = create("https://ipfs.infura.io:5001/api/v0" as any);

const Home: NextPage = () => {
  const [quote, setQuote] = useState({
    value: "Say Something",
    error: false,
    touched: false,
  });
  const [name, setName] = useState({
    value: "Satoshi Nakamoto",
    error: false,
    touched: false,
  });
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const ref = useRef<HTMLDivElement>(null);

  const onQuoteChange = (e: any) => {
    setQuote((state) => ({
      ...state,
      value: e.target.value,
      error: !e.target.value.length,
      touched: true,
    }));
  };

  const onNameChange = (e: any) => {
    setName((state) => ({
      ...state,
      value: e.target.value,
      error: !e.target.value.length,
      touched: true,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (ref.current === null) {
        return;
      }
      if (!quote.touched) return;
      if (!!quote.error || !!name.error) return;

      try {
        const dataUrl = await domtoimage.toPng(ref.current, {
          width: 800,
          height: 600,
        });
        const img = new Image();
        img.src = dataUrl;

        const fetchedImage = await fetch(img.src);
        const fetchedImageBlob = await fetchedImage.blob();
        const file = new File([fetchedImageBlob], "dot.png", fetchedImageBlob);

        const added = await client.add(file, {
          progress: (prog) => console.log(`received: ${prog}`),
        });
        // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        // setFileUrl(url);
      } catch (error) {
        console.error("oops, something went wrong!", error);
      }
    },
    [ref, quote, name]
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div ref={ref} className="w-fit flex items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto text-center w-[780px] h-[580px] p-10">
            <FaQuoteLeft className="mx-auto mb-10 shrink-0" size={48} />
            <div className="overflow-hidden max-h-[380px] p-2">
              <h2
                className={`${
                  quote.value.length < 85 ? "text-5xl" : "text-3xl"
                } font-manrope`}
                style={{ wordBreak: "break-word" }}
              >
                {quote.value}
              </h2>
            </div>
            <p
              className={`${
                quote.value.length < 85 ? "text-3xl" : "text-xl"
              } text-center font-manrope mt-12`}
            >
              - {name.value}
            </p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <label htmlFor="quote" className="underline">
          Enter your quote
        </label>
        <textarea
          id="quote"
          name="quote"
          value={quote.value}
          className="border w-[500px] h-[180px] shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          maxLength={charLimit}
          onChange={(e) => onQuoteChange(e)}
        />
        {quote.error && (
          <p className="text-red-500 text-xs italic">Please enter the quote.</p>
        )}

        <label htmlFor="name" className="underline">
          Who said it
        </label>
        <input
          id="name"
          name="name"
          value={name.value}
          className="border w-[500px] shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => onNameChange(e)}
        />
        {name.error && (
          <p className="text-red-500 text-xs italic">Please enter the name.</p>
        )}

        <button
          onClick={(e) => handleSubmit(e)}
          className="text-xl border px-4 rounded-full font-bold bg-pink-400 text-white h-full hover:bg-pink-600"
        >
          Mint
        </button>
      </form>
    </>
  );
};

export default Home;
