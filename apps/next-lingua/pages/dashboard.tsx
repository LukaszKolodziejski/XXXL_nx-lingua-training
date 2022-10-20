import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Statistic,
  NextWords,
  ListeningSection,
  SpeakingSection,
  EnglishTenses,
} from '../screens/dashboard';
import fetcher from '../libs/fetch';
import type { IBaseSingleWord } from '../types';

type IApiWords = '/api/dev-words' | '/api/real-words';

const API_URL: IApiWords = '/api/dev-words';

// export function Dashboard({ Component, pageProps }: AppProps) {
// export function Dashboard({ data }: Array<IBaseSingleWord>) {
export function Dashboard({ fallbackData }) {
  const { data, mutate } = useSWR(API_URL, fetcher, { fallbackData });
  console.log('fallback data');
  console.log(data);
  const [selectedWords, setSelectedWords] = useState(Array<IBaseSingleWord>);
  const [englishTensesIndex, setEnglishTensesIndex] = useState(0);

  console.log('mutate data');
  console.log(data);

  const getRandomIndexHandler = (prevIndex): number => {
    const range = 12;
    let index = Math.floor(Math.random() * range);

    do {
      index = Math.floor(Math.random() * range);
    } while (index === prevIndex);

    return index;
  };

  useEffect(() => {
    // Development
    // setSelectedWords(selectedWordsHandler(data.words));
    //TODO: selectedWordsHandler2 -> work on 100%
    setSelectedWords(selectedWordsHandler2(data.words));
  }, [data]);
  console.log('selectedWords');
  console.log(selectedWords);

  const newWordsTriggerHandler = async () => {
    setEnglishTensesIndex(getRandomIndexHandler);
    try {
      await mutate(
        fetcher(API_URL, {
          method: 'PUT',
          body: JSON.stringify(selectedWords),
        })
        //,
        // {
        // optimisticData: [...data, newTodo],
        // rollbackOnError: true,
        // populateCache: (newItem) => {

        //   return [...data, newItem];
        // },
        // revalidate: true,
        // }
      );
    } catch (e) {
      console.log('error to mutate');
    }
  };

  const selectedWordsHandler = (data: Array<IBaseSingleWord>) => {
    const filteredWords = data.filter((word) => word.series === 0);
    return filteredWords.slice(0, 3);
  };

  const getMultipleRandom = (arr: Array<IBaseSingleWord>, num: number) => {
    if (arr.length) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    } else {
      return [];
    }
  };

  const selectedWordsHandler2 = (data: Array<IBaseSingleWord>) => {
    const amountOfFilteredDataBySeries = [10, 6, 3];
    const shuffledDataArray = amountOfFilteredDataBySeries.map(
      (quantity, index) => {
        const filteredDataArray: Array<IBaseSingleWord> = data.filter(
          (el) => el.series === index
        );
        return getMultipleRandom(filteredDataArray, quantity);
      }
    );

    const combinationOfMixedData = shuffledDataArray[0].concat(
      shuffledDataArray[1],
      shuffledDataArray[2]
    );

    const shuffledCombination = getMultipleRandom(
      combinationOfMixedData,
      combinationOfMixedData.length
    );

    return shuffledCombination.slice(0, 3);
  };

  return (
    <div className="box-border relative">
      <div className="bg-blue-400 p-5">
        <Link href="/dashboard-real">
          <a>NOW: {API_URL}</a>
        </Link>
      </div>
      <div className="flex flex-row bg-blue-300">
        <SpeakingSection />
        <ListeningSection />
        <EnglishTenses index={englishTensesIndex} />
      </div>

      <div className="flex flex-row items-center justify-between bg-blue-200 rounded overflow-hidden mx-4">
        <NextWords
          selectedWords={selectedWords}
          onNewWordsTrigger={newWordsTriggerHandler}
        />
        <Statistic data={data.words} />
      </div>
      <div className="text-xs text-sky-700 font-bold text-right pr-[120px] pt-2">
        {` Daily Counter: ${data.counter.dailyCounter}`}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetcher(`http://localhost:4200${API_URL}`);

  return {
    props: { fallbackData: data },
  };
}

export default Dashboard;
