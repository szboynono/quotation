import React from "react";

const Navigation = () => {
  return (
    <div className="flex justify-between p-10">
      <div>
        <h1 className="text-3xl">Quotation</h1>
      </div>
      <div className="flex justify-between items-center w-[400px]">
        <a href="#" className="hover:decoration-pink-400 font-bold underline">How we work</a>
        <a href="#" className="hover:decoration-pink-400 font-bold underline">How we rock</a>
        <button className="border px-4 rounded-full font-bold bg-pink-400 text-white h-full hover:bg-pink-600">Connect Wallet</button>
      </div>
    </div>
  );
};

export default Navigation;
