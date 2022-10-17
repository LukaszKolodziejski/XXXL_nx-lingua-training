import React, { FC, useEffect, useState } from 'react';

export const ListeningSection = () => {
  const [textContent, setTextContent] = useState('Lorem ipsum dolor sit');

  const speechHandler = () => {
    const msg = new SpeechSynthesisUtterance(textContent);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="bg-red-200 w-[550px] px-4 py-3">
      {/* Listening section */}
      <div className="flex justify-center mb-3">
        <button
          className="w-20 rounded-[12px] border-2 border-sky-700 mx-2"
          onClick={speechHandler}
        >
          Speech
        </button>
        <button className="w-20 rounded-[12px] border-2 border-sky-700 mx-2">
          Clear
        </button>
      </div>
      {/* <textarea className="w-full h-48" > */}
      <textarea
        rows={8}
        cols={60}
        className="ml-5 p-1"
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
      />
      {/* </textarea> */}
      {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
        consequatur aperiam tempore eveniet consectetur ducimus voluptate hic
        laudantium reiciendis non fugit cupiditate unde quod, quae dicta laborum
        temporibus porro odit fuga doloribus repellendus. Ut, repudiandae iste.
        Ducimus, eum consequatur vitae, neque quidem quas, corporis sequi
        expedita odio voluptatum laboriosam quibusdam. */}
    </div>
  );
};
