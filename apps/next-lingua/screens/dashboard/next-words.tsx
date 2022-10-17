import React, { FC, useEffect, useState } from 'react';

type IBaseSingleWordProps = {
  word: string;
  series: number;
};

type ICtaNextStateVariant = 0 | 1 | 2 | 3;

export const NextWords: FC<Array<IBaseSingleWordProps>> = ({
  selectedWords,
}) => {
  // const copyData = [...data] as Array<IBaseSingleWordProps>;

  const [ctaNextState, setCtaNextState] = useState<ICtaNextStateVariant>(0);
  const [ctaNextCounter, setCtaNextCounter] = useState<number>(0);

  const ctaNextStateHandler = () => {
    setCtaNextState(
      (prev) => (prev < 3 ? prev + 1 : 0) as ICtaNextStateVariant
    );
  };

  useEffect(() => {
    if (ctaNextState === 3) {
      setTimeout(ctaNextStateHandler, 1200);
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

  return (
    <div className="mt-7">
      <div className="w-[400px] mb-7 mx-auto">
        {/* 15 | 35 | 75 | 100 */}
        <button
          className="flex w-full h-7 justify-center bg-transparent translate-y-7 font-semibold"
          disabled={ctaNextState === 3}
          onClick={ctaNextStateHandler}
        >
          {`Next (${ctaNextCounter}%) ${ctaNextState}`}
        </button>
        <div className="w-full h-7 bg-[#ddd] rounded-[20px]">
          <div className="w-[15%] h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[20px]" />
        </div>
      </div>
      <div className="w-[450px] bg-blue-700 mb-7 mx-auto">
        <div className="flex flex-row items-center justify-between min-w-[400px] bg-green-200">
          {selectedWords.map((wordData, index) => (
            <div key={`${wordData.word}-${index}`} className="bg-green-200">
              <button className="flex justify-center w-[100px] bg-green-500">
                {wordData.word}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
