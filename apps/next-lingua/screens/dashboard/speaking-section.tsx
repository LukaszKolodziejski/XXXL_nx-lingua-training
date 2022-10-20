import React, { FC, useEffect, useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export const SpeakingSection = () => {
  const [textContent, setTextContent] = useState('');

  const ref = useRef<HTMLParagraphElement>();

  const speechHandler = () => {
    const msg = new SpeechSynthesisUtterance(ref.current.innerText);
    msg.lang = 'en-US';
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
  };

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    console.log(transcript);
    setTextContent(transcript);
  }, [transcript]);

  //TODO: add cn()
  const btnStyle = `w-20 rounded-[12px] border-2 mx-2 ${
    textContent ? 'border-sky-700 text-black' : 'border-sky-600 text-gray-500'
  }`;

  return (
    <div className="bg-blue-300 w-[500px] px-4 py-3">
      <div className="flex justify-center mb-3">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button
          className="w-20 rounded-[12px] border-2 border-sky-700 mx-2"
          onClick={() => {
            listening
              ? SpeechRecognition.stopListening()
              : SpeechRecognition.startListening({
                  continuous: true,
                  language: 'en-US',
                });
          }}
        >
          {listening ? 'Stop' : 'Start'}
        </button>
        <button
          className={btnStyle}
          disabled={!textContent}
          onClick={() => {
            resetTranscript();
            setTextContent('');
          }}
        >
          Reset
        </button>
        <button
          className={btnStyle}
          onClick={speechHandler}
          disabled={!textContent}
        >
          Speech
        </button>
      </div>

      <ContentEditable
        innerRef={ref}
        tagName="p"
        className="h-52 border-2 py-1 px-2 rounded-[6px] border-green-600"
        html={textContent}
        disabled={listening}
        onChange={(evt) => setTextContent(evt.target.value)}
      />
    </div>
  );
};
