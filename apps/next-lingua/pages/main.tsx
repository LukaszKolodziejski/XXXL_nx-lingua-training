import React, { useState, useEffect } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

type Word = {
  word: string;
  series: number;
  repeat_0_2: number;
  repeat_0_5: number;
  active: boolean;
};

const selectedWordsHandler = (data: Array<Word>) => {
  console.log(data);

  const filteredWords = data.filter(
    (word) => word.series === 0 || word.repeat_0_5 === 5
  );
  return filteredWords.slice(0, 3);
};

// export function Main({ Component, pageProps }: AppProps) {
// export function Main({ data }: Array<Word>) {
export function Main({ data }) {
  const [selectedWords, setSelectedWords] = useState(Array<Word>);
  // console.log(data);
  useEffect(() => {
    // console.log('pageProps');
    // console.log(pageProps);
    //   const data = getServerSideProps();
    //   console.log('data');
    //   console.log(data);

    setSelectedWords(selectedWordsHandler(data));
  }, []);
  console.log('selectedWords');
  console.log(selectedWords);

  const speechHandler = () => {
    const msg = new SpeechSynthesisUtterance('I will be in this town');
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  };

  return (
    <>
      <main className="mx-4">
        <div className="bg-green-500 p-5">Header</div>
        <div className="flex flex-row items-center justify-between bg-green-700">
          <div className="bg-red-200">Speak</div>
          <div className="bg-red-500" onClick={speechHandler}>
            Click me to Speech
          </div>
          <div className="bg-red-700">Eng Time</div>
        </div>

        <div className="flex flex-row items-center justify-between bg-blue-200">
          <div className="bg-blue-500">Amount of words: {data?.length}</div>
          <div className="bg-blue-700">
            <button className="flex w-full justify-center bg-yellow-800">
              Next
            </button>
            <div className="flex flex-row items-center justify-between min-w-[400px] bg-green-200">
              {selectedWords.map((wordData, index) => (
                <div key={`${wordData.word}-${index}`} className="bg-green-200">
                  <button className="flex justify-center w-[100px] bg-green-500">
                    {wordData.word}
                  </button>
                  <div className="flex justify-center bg-blue-400">
                    {wordData.repeat_0_2}/2
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-yellow-500">Statistic</div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:4200/api/words`);
  const data = await res.json();
  console.log('data');
  console.log(data);
  return { props: { data } };
}

export default Main;
