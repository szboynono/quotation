import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import useWindowSize from "../hooks/useWindowSize";

const Navigation = () => {
  const {
    connectToMetaMask,
    currentAccount,
    metaMaskInstalled,
    currentNetwork,
  } = useContext(AppContext);
  const [buttonContent, setButtonContent] = useState("Connect wallet");

  const { width } = useWindowSize();

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
    router.push("/");
  };

  return (
    <div className="flex justify-between py-10 md:px-10 px-3">
      <div>
        <h1
          className="text-3xl cursor-pointer hover:text-pink-400 "
          onClick={onHeaderClick}
        >
          Quotation
        </h1>
      </div>
      <div className="flex flex-row justify-between items-center">
        <a
          href={`https://${
            currentNetwork === "0x4" ? "testnets." : ""
          }opensea.io/collection/quotation-v3`}
          className="hover:decoration-pink-400 underline mr-4 m"
        >
          {width > 500 ? (
            "View collection on opensea"
          ) : (
            <div className="relative top-1">
              <Image src="/opensea.svg" width={32} height={32} />
            </div>
          )}
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
