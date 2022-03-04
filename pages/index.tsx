import type { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaQuoteLeft } from 'react-icons/fa';

const Home: NextPage = () => {
  const { currentAccount, metaMaskInstalled } = useContext(AppContext);
  return (
    <div className="w-[70%] mx-auto text-center mt-[68px]">
      <FaQuoteLeft className="mx-auto mb-10" size={48} />
      <h2 className="text-7xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        modi alias cum inventore numquam placeat. Ullam nemo facilis ducimus
        perspiciatis accusamus pariatur eos libero necessitatibus, autem,
        voluptate corrupti, dolorem dolore?
      </h2>
      <br />
      <p className="text-3xl text-right">- Tony Liu</p>
    </div>
  );
};

export default Home;
