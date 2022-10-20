import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface IEnglishTensesProps {
  index: number;
}

export const EnglishTenses: FC<IEnglishTensesProps> = ({ index }) => {
  return (
    <div className="rounded overflow-hidden mt-12">
      <div className="w-[450px] h-[90px] relative">
        <Image
          layout="fill"
          alt="english tenses header"
          src={`/media/tenses-eng-header.jpg`}
        />
      </div>
      <div className="w-[450px]">
        <div className={`relative h-[70px] ${customImageStyle[index % 3]}`}>
          <Image
            layout="fill"
            alt={englishTensesArray[index]}
            src={`/media/${englishTensesArray[index]}.jpg`}
          />
        </div>
      </div>
    </div>
  );
};

const englishTensesArray = [
  'past-simple',
  'present-simple',
  'future-simple',
  'past-perfect',
  'present-perfect',
  'future-perfect',
  'past-continuous',
  'present-continuous',
  'future-continuous',
  'past-perfect-continuous',
  'present-perfect-continuous',
  'future-perfect-continuous',
];

const customImageStyle = [
  'w-[151px] translate-x-0',
  'w-[138px] translate-x-[151px]',
  'w-[162px] translate-x-72',
];
