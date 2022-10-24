import React, { FC, useEffect, useState } from 'react';
import type { IBaseSingleWord } from '../../types';

type ICtaNextStateVariant = 0 | 1 | 2 | 3;

interface INextWordsProps {
  selectedWords: Array<IBaseSingleWord>;
  onFetchNewWordsTrigger: () => void;
  onClickNextButton: () => void;
}

export const NextWords: FC<INextWordsProps> = ({
  selectedWords,
  onClickNextButton,
  onFetchNewWordsTrigger,
}) => {
  const [ctaNextState, setCtaNextState] = useState<ICtaNextStateVariant>(0);

  const ctaNextStateHandler = () => {
    onClickNextButton();
    setCtaNextState((prev) => (prev + 1) as ICtaNextStateVariant);
  };

  useEffect(() => {
    if (ctaNextState === 3) {
      onFetchNewWordsTrigger();
      setTimeout(() => {
        setCtaNextState(0);
      }, 1200);
    }

    //TODO: counter in CtaNext
    // const id = setInterval(frame, 150);
    // function frame() {
    //   /* 15 | 35 | 75 | 100 */
    //   const ctaNextCounterArray = [15, 35, 75, 100];
    //   if (ctaNextCounter >= ctaNextCounterArray[ctaNextState]) {
    //     clearInterval(id);
    //   } else {
    //     setCtaNextCounter((prev) => prev + 1);
    //     // width += 0.05;
    //     // elem.style.width = width * 4.5 + '%';
    //     // elem.innerHTML = Math.round(width);
    //   }
    // }
  }, [ctaNextState]);

  //TODO: speechHandler -> utilitis
  const speechHandler = (word: string) => {
    const msg = new SpeechSynthesisUtterance(word);
    msg.lang = 'en-US';
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
  };

  const borderColorsStyle = [
    'border-[#1f77b4]',
    'border-[#ff7f0e]',
    'border-[#9467bd]',
  ];

  const bgColorsStyle = ['bg-[#1f77b444]', 'bg-[#ff7f0e44]', 'bg-[#9467bd44]'];

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-[400px] mb-8">
        {/* 15 | 35 | 75 | 100 */}
        <button
          className="flex w-full h-7 justify-center bg-transparent translate-y-7 font-semibold"
          disabled={ctaNextState === 3}
          onClick={ctaNextStateHandler}
        >
          {/* {`Next (${ctaNextCounter}%) ${ctaNextState}`} */}
          {`Next ${ctaNextState}`}
        </button>
        <div className="w-full h-7 bg-[#ddd] rounded-[20px]">
          <div className="w-[400px] h-10 ">
            <div className="w-[15%] h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[20px]" />
          </div>
        </div>
      </div>
      <div className="w-[500px] mb-7">
        {selectedWords.length ? (
          <div className="flex flex-row items-center justify-between min-w-[400px]">
            {selectedWords
              ?.map((wordData, index) => {
                const borderColor = borderColorsStyle[wordData.series];
                const bgColor = bgColorsStyle[wordData.series];

                return (
                  <button
                    key={`${wordData.word}-${index}`}
                    className={`flex justify-center items-center w-[145px] h-10 rounded-[3px] ${bgColor} ${borderColor} border-2`}
                    onClick={() => {
                      speechHandler(wordData.word);
                      navigator.clipboard.writeText(wordData.word);
                    }}
                  >
                    {wordData.word}
                  </button>
                );
              })
              .sort(() => 0.5 - Math.random())}
          </div>
        ) : (
          <div className="bg-red-300 rounded-[6px] text-center">
            Add new words to Database !!!
          </div>
        )}
      </div>
    </div>
  );
};
