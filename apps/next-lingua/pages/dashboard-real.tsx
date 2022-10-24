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

type IURL = '/api/dev-words' | '/api/real-words';

const API_URL: IURL = '/api/real-words';

// export function Dashboard({ Component, pageProps }: AppProps) {
export function Dashboard() {
  const { data, mutate } = useSWR(API_URL, fetcher);
  const [selectedWords, setSelectedWords] = useState<Array<IBaseSingleWord>>(
    []
  );
  const [englishTensesIndex, setEnglishTensesIndex] = useState(0);
  const [resetSpeakingSection, setResetSpeakingSection] = useState(false);

  const getRandomIndexHandler = (prevIndex): number => {
    const range = 12;
    let index = Math.floor(Math.random() * range);

    do {
      index = Math.floor(Math.random() * range);
    } while (index === prevIndex);

    return index;
  };

  useEffect(() => {
    if (data) {
      setSelectedWords(selectedWordsHandler(data.words));
    }
  }, [data]);

  useEffect(() => {
    if (resetSpeakingSection) {
      setResetSpeakingSection(false);
    }
  }, [resetSpeakingSection]);

  const clickNextButtonHandler = () => {
    setResetSpeakingSection(true);
    setEnglishTensesIndex(getRandomIndexHandler);
  };

  const fetchNewWordsTriggerHandler = async () => {
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

  const getMultipleRandom = (arr: Array<IBaseSingleWord>, num: number) => {
    if (arr.length) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    } else {
      return [];
    }
  };

  const selectedWordsHandler = (data: Array<IBaseSingleWord>) => {
    const amountOfFilteredDataBySeries = [12, 5, 2];
    // const amountOfFilteredDataBySeries = [10, 6, 3];
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

  //FIXME: delete repiting bg-blue in components
  return (
    <div className="box-border relative">
      <div className="bg-blue-400 p-5">
        <Link href="/dashboard">
          <a>NOW: {API_URL}</a>
        </Link>
      </div>
      <div className="flex flex-row bg-blue-300">
        <SpeakingSection reset={resetSpeakingSection} />
        <ListeningSection />
        <EnglishTenses index={englishTensesIndex} />
      </div>

      <div className="flex flex-row items-center justify-between bg-blue-200 rounded overflow-hidden mx-4">
        <NextWords
          selectedWords={selectedWords}
          onClickNextButton={clickNextButtonHandler}
          onFetchNewWordsTrigger={fetchNewWordsTriggerHandler}
        />
        <Statistic
          data={data?.words}
          dailyCounter={data?.counter.dailyCounter}
        />
      </div>
      <div className="text-xs text-sky-700 font-bold text-right pr-[120px] pt-2">
        {` Daily Counter: ${data?.counter.dailyCounter}`}
      </div>
    </div>
  );
}

export default Dashboard;
