import React, { useCallback, useRef, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import domtoimage from 'dom-to-image';

const charLimit = 365;

function CreateQuote() {
  const [quote, setQuote] = useState("Say something");
  const [name, setName] = useState("Satoshi Nakamoto");

  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }
    domtoimage.toPng(ref.current, { width: 800, height: 600})
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }, [ref])

  return (
    <>
    {quote.length}
    <div className="flex flex-col justify-center items-center">
      <div ref={ref} className="w-fit flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto text-center w-[780px] h-[580px] p-10">
          <FaQuoteLeft className="mx-auto mb-10 shrink-0" size={48} />
          <div className="overflow-hidden max-h-[380px] p-2">
          <h2 className={`${quote.length < 85 ? 'text-5xl' : 'text-3xl'} font-manrope`} style={ {wordBreak: 'break-word'}}>
            {quote}
          </h2>
          </div>
          <p className={`${quote.length < 85 ? 'text-3xl' : 'text-xl'} text-center font-manrope mt-12`}>- {name}</p>
        </div>
      </div>
    </div>
    <div>
        <textarea
          placeholder="quoto"
          maxLength={charLimit}
          onChange={(e) => setQuote(e.target.value)}
        />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={onButtonClick}>Mint</button>
      </div>
    </>
  );
}

export default CreateQuote;
