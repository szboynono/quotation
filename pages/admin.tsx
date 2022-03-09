import React from "react";

import MintQuote from "./MintQuote.json";
import { mintQuoteAddress } from "../config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

function admin() {
  const viewBalance = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(mintQuoteAddress, MintQuote.abi, signer);
    let hex = await contract.getBalance();
    console.log("balance", hex.toNumber());
  };

  const withdraw = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(mintQuoteAddress, MintQuote.abi, signer);
    let transaction = await contract.withdrawMoney();
    

    console.log("withdraw", transaction);
  };

  return (
    <div>
      <button className="mr-10" onClick={viewBalance}>view balance</button>
      <button onClick={withdraw}>withdraw</button>
    </div>
  );
}

export default admin;
