import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

function CreateQuote() {
  const [quote, setQuote] = useState("Say something");
  const [name, setName] = useState("Satoshi Nakamoto");

  return (
    <div>
      <div className="flex items-center">
        <div className="mx-auto text-center max-w-6xl">
          <FaQuoteLeft className="mx-auto mb-10" size={48} />
          <h2 className="md:text-6xl text-5xl font-manrope break-words">{quote}</h2>
          <p className="text-3xl text-center font-manrope mt-12">- {name}</p>
        </div>
      </div>
      <div>
        <textarea
          placeholder="quoto"
          onChange={(e) => setQuote(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CreateQuote;
