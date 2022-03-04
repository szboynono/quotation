import type { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaQuoteLeft } from "react-icons/fa";

const Home: NextPage = () => {
  const { currentAccount, metaMaskInstalled } = useContext(AppContext);
  return (
    <div>
      <button>Create my quote nft</button>
      {/* <div className="h-[80vh] flex items-center">
        <div className="mx-auto text-center max-w-6xl">
          <FaQuoteLeft className="mx-auto mb-10" size={48} />
          <h2 className="md:text-6xl text-5xl font-manrope">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos modi alias ccar
          </h2>
          <p className="text-3xl text-center font-manrope mt-12">- Tony Liu</p>
        </div>
      </div>
      <div className="text-center">
        <a href="#" className="underline hover:decoration-pink-400" >
          View on opensea
        </a>
      </div> */}
    </div>
  );
};

export default Home;
