import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Navigation = () => {
  const { connectToMetaMask, currentAccount, metaMaskInstalled, currentNetwork } =
    useContext(AppContext);
  const [buttonContent, setButtonContent] = useState("Connect wallet");

  const router = useRouter();

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

  const onHeaderClick = () => {
    router.push('/')
  }

  return (
    <div className="flex justify-between py-10 px-10">
      <div>
        <h1 className="text-3xl cursor-pointer hover:text-pink-400 " onClick={onHeaderClick}>Quotation</h1>
      </div>
      <div className="flex justify-between items-center w-[380px]">
        <a href={`https://${currentNetwork === '0x4' ? 'testnets.' : ''}opensea.io/collection/quotation-v3`} className="hover:decoration-pink-400 underline">
          View collection on opensea
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
