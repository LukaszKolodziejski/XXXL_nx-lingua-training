import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Statistic,
  NextWords,
  ListeningSection,
  SpeakingSection,
} from '../screens/dashboard';

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

// export function Dashboard({ Component, pageProps }: AppProps) {
// export function Dashboard({ data }: Array<Word>) {

export function Dashboard({ data }) {
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

  return (
    <>
      <main className="mx-4">
        <div className="bg-green-500 p-5">Header</div>
        {/* <div className="flex flex-row items-center justify-between bg-green-700"> */}
        <div className="flex flex-row items-center bg-green-700">
          <SpeakingSection />
          <ListeningSection />

          <div className="bg-red-700">Eng Time</div>
        </div>

        {/* <div className="flex flex-row items-center justify-between bg-blue-200"> */}
        <div className="grid grid-flow-col auto-cols-[4fr_2fr] bg-blue-200">
          {/* TODO: types for Statistic | NextWords */}
          <NextWords selectedWords={selectedWords} />
          <Statistic data={data} />
          {/* <div className="bg-yellow-500">Statistic</div> */}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:4200/api/words`);
  const data = await res.json();
  // console.log('data ghghghghgh');
  // console.log(data);
  return { props: { data } };
}

export default Dashboard;
