import React, { FC, useEffect, useState } from 'react';

export const ListeningSection = () => {
  const [textContent, setTextContent] = useState('');

  const btnSpeechHandler = () => {
    const msg = new SpeechSynthesisUtterance(textContent);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  const btnStyle = `w-20 rounded-[12px] border-2 mx-2 ${
    textContent ? 'border-sky-700 text-black' : 'border-sky-600 text-gray-500'
  }`;

  return (
    <div className="bg-blue-300 w-[550px] px-4 py-3">
      <div className="flex justify-center mb-3">
        <button
          className={btnStyle}
          disabled={!textContent}
          onClick={btnSpeechHandler}
        >
          Speech
        </button>
        <button
          className={btnStyle}
          disabled={!textContent}
          onClick={() => setTextContent('')}
        >
          Clear
        </button>
      </div>
      <textarea
        rows={8}
        cols={60}
        className="ml-5 p-1 bg-gray-300"
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
      />
    </div>
  );
};
