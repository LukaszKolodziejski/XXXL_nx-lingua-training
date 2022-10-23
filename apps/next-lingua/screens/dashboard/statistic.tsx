import React, { FC, useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  PolarAngleAxis,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import type { IBaseSingleWord } from '../../types';

interface IStatisticProps {
  data: Array<IBaseSingleWord>;
}

export const Statistic: FC<IStatisticProps> = ({ data }) => {
  const colors = scaleOrdinal(schemeCategory10).range() as Array<string>;
  const customColors = [colors[0], colors[1], colors[2], colors[4], '#aaa'];
  const [dataDemo3, setDataDemo3] = useState([]);
  //   console.log('super data');
  //   console.log(data);

  const oneDay = 24 * 60 * 60 * 1000;
  const paz15 = new Date('October 15, 2022').getTime();
  const today = new Date().getTime();
  const diffDays = Math.floor(Math.abs((today - paz15) / oneDay));
  //   console.log('diffDays');
  //   console.log(diffDays);

  //   const dataDomo2 = new Array(6).fill({}).map((_, index) => ({
  //     series: index,
  //     words:
  //       index < 5
  //         ? data.filter((el) => el.series === index).length
  //         : diffDays * 12,
  //     fill: index < 5 ? colors[index] : '#aaa',
  //   }));

  useEffect(() => {
    const dataDomonew = new Array(5).fill({}).map((_, index) => ({
      series: index,
      words:
        index < 4
          ? data?.filter((el) => el.series === index).length
          : diffDays * 12,
      fill: customColors[index],
    }));
    setDataDemo3(dataDomonew);
  }, [data]);

  //   console.log('dataDomo 2 2 2');
  //   console.log(dataDomo2);

  //   const dataDomo = [
  //     { series: 0, words: 60, fill: colors[0] },
  //     { series: 1, words: 50, fill: colors[1] },
  //     { series: 2, words: 30, fill: colors[2] },
  //     { series: 3, words: 59, fill: colors[3] },
  //     { series: 4, words: 48, fill: colors[4] },
  //     { series: 5, words: 92, fill: '#aaa' },
  //   ];

  const dataDomo = [
    { series: 0, words: 60, fill: colors[0] },
    { series: 1, words: 50, fill: colors[1] },
    { series: 2, words: 30, fill: colors[2] },
    { series: 3, words: 59, fill: colors[4] },
    { series: 4, words: 92, fill: '#aaa' },
  ];

  const style = {
    lineHeight: '24px',
    left: 300,
  };

  return (
    <div className="bg-blue-200">
      <div className="h-[200px] overflow-hidden">
        <ResponsiveContainer height={200} width={500}>
          <RadialBarChart
            // data={dataDomo}
            // data={dataDomo2}
            data={dataDemo3}
            cx="50%"
            cy="90%"
            innerRadius="30%"
            outerRadius="140%"
            startAngle={0}
            endAngle={180}
          >
            <Tooltip shared={false} />
            <PolarAngleAxis type="number" domain={[0, 100]} />
            <RadialBar
              stackId="stack"
              minPointSize={15}
              background
              dataKey="words"
            >
              {/* {dataDomo.map((entry, index) => ( */}
              {/* {dataDomo2.map((entry, index) => ( */}
              {dataDemo3.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList position="insideEnd" fill="#fff" fontSize={10} />
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
