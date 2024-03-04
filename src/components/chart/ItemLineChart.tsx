"use client";

import { useChart } from "@/app/hooks/useChart";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import { Histosy } from "@/type";
import CategoryTabList from "./CategoryTabList";

export type LineChartItem = Histosy & {
  avePrice: number;
};
export default function ItemLineChart() {
  const {
    itemHistoryList,
    selectedItem,
    handleSelectItem,
    selectedCategory,
    handleSelectCategory,
  } = useChart();
  //averagePriceプロパティを追加
  const addedList: LineChartItem[] = itemHistoryList.map((item) => {
    const avePrice = Math.floor(item.price / item.amount);
    return {
      ...item,
      avePrice,
    };
  });
  const filteredListByItem = addedList.filter(
    (item) => item.name === selectedItem
  );

  return (
    <>
      <CategoryTabList
        addedList={addedList}
        handleSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
      />

      <ResponsiveContainer
        width="100%"
        height="100%"
        className="min-h-60 shadow-lg rounded-md px-2"
      >
        <LineChart
          width={200}
          height={200}
          data={filteredListByItem}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="purchasedDate"
            tickFormatter={(props) => {
              const month: string = (new Date(props).getMonth() + 1).toString();
              const date: string = new Date(props).getDate().toString();
              return `${month}/${date}`;
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avePrice" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
