import React, { FC, useEffect, useState, useCallback } from 'react';
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
import { colors } from '../../constant/colors';
import type { IBaseSingleWord } from '../../types';

interface IStatisticProps {
  data: Array<IBaseSingleWord>;
  dailyCounter: number;
}

export const Statistic: FC<IStatisticProps> = ({ data, dailyCounter }) => {
  const [chartData, setChartData] = useState([]);

  const getRangeOfWords = useCallback(
    (value: number): number => {
      if (value < 4) {
        return data?.filter((el) => el.series === value).length;
      } else {
        const singleDay = 24 * 60 * 60 * 1000;
        const oct15 = new Date('October 15, 2022').getTime();
        const today = new Date().getTime();
        const diffDays = Math.floor(Math.abs((today - oct15) / singleDay));
        const range = diffDays * 12 - dailyCounter;
        return range;
      }
    },
    [data, dailyCounter]
  );

  useEffect(() => {
    const chartDataArray = new Array(5).fill({}).map((_, index) => ({
      series: index,
      words: getRangeOfWords(index),
      fill: colors[index],
    }));
    setChartData(chartDataArray);
  }, [data, dailyCounter]);

  return (
    <div className="bg-blue-200">
      <div className="h-[200px] overflow-hidden">
        <ResponsiveContainer height={200} width={500}>
          <RadialBarChart
            data={chartData}
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
              {chartData.map((entry, index) => (
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
