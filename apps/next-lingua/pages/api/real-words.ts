import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import words from '../../data/prod/db-words-prod.json';
import counter from '../../data/prod/db-daily-counter.json';

let copyData = { words, counter };
type IWord = { word: string; series: number };

const saveData = () => {
  fs.writeFile(
    './apps/next-lingua/data/prod/db-words-prod.json',
    JSON.stringify(copyData.words),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('file written successfully');
      }
    }
  );
  fs.writeFile(
    './apps/next-lingua/data/prod/db-daily-counter.json',
    JSON.stringify(copyData.counter),
    (err) => {
      err ? console.error(err) : console.log('file written successfully');
    }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const response = await fetch('http://localhost:4200/users');
  // console.log(response);
  // const users = await response.json();

  try {
    if (req.method === 'GET') {
      res.status(200).json(copyData);
    } else if (req.method === 'PUT') {
      const body = JSON.parse(req.body) as IWord[];
      console.log('body');
      console.log(body);

      const key = 'word';
      const updatedDataWords = words.map((el) => {
        const found = body.find((s) => s[key] === el[key]);
        if (found) {
          el = Object.assign(el, { ...found, series: found.series + 1 });
        }
        return el;
      });
      const updatedDataCounter = { dailyCounter: counter.dailyCounter + 1 };
      copyData = {
        words: updatedDataWords,
        counter: updatedDataCounter,
      };
      saveData();
      res.json(copyData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
