import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaQuoteLeft } from "react-icons/fa";
import domtoimage from "dom-to-image";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MintQuote from "./MintQuote.json";
import { mintQuoteAddress } from "../config";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import { useRouter } from "next/router";
import { addQuote, checkIfQuoteExists } from "../firebase";
import { getDocs } from "firebase/firestore";

const charLimit = 365;

const client = create("https://ipfs.infura.io:5001/api/v0" as any);

const Home: NextPage = () => {
  const [quote, setQuote] = useState({
    value:
      "If you don’t believe it or don’t get it, I don’t have the time to try to convince you, sorry.",
    error: false,
    touched: false,
  });
  const [name, setName] = useState({
    value: "Satoshi Nakamoto",
    error: false,
    touched: false,
  });
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [quoteExists, setQuoteExists] = useState(false);
  const {
    currentAccount,
    connectToMetaMask,
    currentNetwork,
    isChainSupported,
    setId,
    id
  } = useContext(AppContext);

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fileUrl) return;
    setLoading(true);
    const data = JSON.stringify({
      name: "Quotation",
      description: "One and only quote.",
      image: fileUrl,
    });

    (async () => {
      try {
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(
          mintQuoteAddress,
          MintQuote.abi,
          signer
        );

        let transaction = await contract.createToken(url);
        let tx = await transaction.wait();
        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();
        setId(tokenId);
        await addQuote(tokenId, quote.value, name.value);
        setLoading(false);
        router.push('/created');
      } catch (error) {
        setFileUrl('');
        setLoading(false);
      }
    })();
  }, [fileUrl]);

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
        const snapshot = await checkIfQuoteExists(quote.value);
        if (snapshot.size > 0) {
          setQuoteExists(true);
          return;
        }
        setQuoteExists(false);
      } catch (error) {
        console.log(error);
        return;
      }
      

      try {
        const dataUrl = await domtoimage.toPng(ref.current, {
          width: 800,
          height: 600,
        });
        const img = new Image();
        img.src = dataUrl;

        const fetchedImage = await fetch(img.src);
        const fetchedImageBlob = await fetchedImage.blob();
        const file = new File(
          [fetchedImageBlob],
          "quote.png",
          fetchedImageBlob
        );

        const added = await client.add(file, {
          progress: (prog) => console.log(`received: ${prog}`),
        });
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setFileUrl(url);
      } catch (error) {
        setLoading(false);
        console.error("oops, something went wrong!", error);
      }
    },
    [ref, quote, name]
  );

  return (
    <>
      {!isChainSupported && <Banner />}
      {loading && (
        <div>
          <div className="h-[100vh] w-[100vw] absolute z-40 top-0 left-0 backdrop-blur-md"></div>
          <div className="absolute z-50 top-[50%] left-[50%]">
            <Loader />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <div
          ref={ref}
          className="w-fit flex items-center justify-center bg-white"
        >
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
      {!!currentAccount && isChainSupported ? (
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
            <p className="text-red-500 text-xs italic">
              Please enter the quote.
            </p>
          )}
          {quoteExists && (
            <p className="text-red-500 text-xs italic">
              Quote existed, please enter a new one.
            </p>
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
            <p className="text-red-500 text-xs italic">
              Please enter the name.
            </p>
          )}

          <button
            onClick={(e) => handleSubmit(e)}
            className="text-xl border px-4 rounded-full font-bold bg-pink-400 text-white h-full hover:bg-pink-600"
          >
            Mint
          </button>
        </form>
      ) : (
        <div className="flex justify-center text-2xl mt-20">
          <a
            className="underline cursor-pointer hover:decoration-pink-400"
            onClick={connectToMetaMask}
            hidden={!isChainSupported}
          >
            Create your favorite quote and store it on the blockchain!
          </a>
        </div>
      )}
    </>
  );
};

export default Home;
