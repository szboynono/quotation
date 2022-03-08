import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Navigation = () => {
  const { connectToMetaMask, currentAccount, metaMaskInstalled } =
    useContext(AppContext);
  const [buttonContent, setButtonContent] = useState("Connect wallet");

  useEffect(() => {
    if (!metaMaskInstalled) {
      setButtonContent("Get MetaMask");
    } else {
      if (!!currentAccount) {
        setButtonContent(
          `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
        );
      } else {
        setButtonContent("Connect wallet");
      }
    }
  }, [metaMaskInstalled, currentAccount]);

  const onConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!metaMaskInstalled) {
      window.open("https://metamask.io/");
    } else {
      connectToMetaMask();
    }
  };

  return (
    <div className="flex justify-between py-10 px-10">
      <div>
        <h1 className="text-3xl">Quotation</h1>
      </div>
      <div className="flex justify-between items-center w-[300px]">
        <a href="#" className="hover:decoration-pink-400 underline">
          View on opensea
        </a>
        <button
          onClick={(e) => onConnectClick(e)}
          disabled={!!currentAccount}
          className="border px-4 rounded-full font-bold bg-pink-400 text-white h-full hover:bg-pink-600"
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
