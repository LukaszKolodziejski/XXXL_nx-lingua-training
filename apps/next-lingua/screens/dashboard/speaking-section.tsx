import React, { FC, useEffect, useState } from 'react';

export const SpeakingSection = () => {
  const [textContent, setTextContent] = useState('Lorem ipsum dolor sit');
  const speechHandler = () => {
    const msg = new SpeechSynthesisUtterance(textContent);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };
  return (
    <div className="bg-red-200 w-[500px] px-4 py-3">
      <div className="flex justify-center mb-3">
        <button className="w-20 rounded-[12px] border-2 border-sky-700 mx-2">
          Start
        </button>
        <button className="w-20 rounded-[12px] border-2 border-sky-700 mx-2">
          Reset
        </button>
        <button
          className="w-20 rounded-[12px] border-2 border-sky-700 mx-2"
          onClick={speechHandler}
        >
          Speech
        </button>
      </div>
      <p contentEditable className="h-48 overflow-y-auto">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
        consequatur aperiam tempore eveniet consectetur ducimus voluptate hic
        laudantium reiciendis non fugit cupiditate unde quod, quae dicta laborum
        temporibus porro odit fuga doloribus repellendus. Ut, repudiandae iste.
        Ducimus, eum consequatur vitae, neque quidem quas, corporis sequi
        expedita odio voluptatum laboriosam quibusdam.
      </p>
    </div>
  );
};
