"use client";

import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";
import { Card } from "../ui/card";
import { Text } from "recharts";
import DateSelectionBox from "./DateSelectionBox";
import { useChart } from "@/app/hooks/useChart";
import type { TotalHistoryByItem } from "@/type";
import { categories } from "../ItemList";
import CategorySelectionBox from "./CategorySelectionBoX";

type LabelProps = {
  name: string;
  value: number;
  cx: number;
  x: number;
  y: number;
};

export default function CategoryPieChart() {
  const {
    historyList,
    selectedMonth,
    formatYearMonth,
    handleSelectMonth,
    selectedCategory,
    handleSelectCategory,
  } = useChart();
  let filteredList: TotalHistoryByItem[];
  switch (selectedMonth) {
    case "All":
    case "":
      filteredList = historyList.filter(
        (item) => item.category[0] === selectedCategory
      );
      break;
    default:
      filteredList = historyList.filter((item) => {
        return (
          formatYearMonth(item.purchasedDate) === selectedMonth &&
          item.category[0] === selectedCategory
        );
      });
  }
  const generateLabel = ({ name, value, cx, x, y }: LabelProps) => {
    const textAnchor = x > cx ? "start" : "end";
    return (
      <>
        {/*<Text x={x} y={y} textAnchor={textAnchor}>
          {name}
    </Text>*/}
        <Text x={x} y={y} dominantBaseline="hanging" textAnchor={textAnchor}>
          {value}
        </Text>
      </>
    );
  };
  const colors = [
    "#E78895", // 背景色との対比が強い色
    "#40BA5C",
    "#404CBA",
    "#BAAD40",
    "#5C40BA",
    "#BA4040",
    "#40BABA",
    "#AD40BA",
    "#BABA40",
    "#404040",
  ];

  return (
    <>
      <DateSelectionBox
        selectedMonth={selectedMonth}
        handleSelectMonth={handleSelectMonth}
      />
      <CategorySelectionBox
        selectedCategory={selectedCategory}
        handleSelectedCategory={handleSelectCategory}
      />
      {filteredList.length ? (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="min-h-60 shadow-lg rounded-md px-2"
        >
          <PieChart width={200} height={200} className="">
            <Pie
              data={filteredList}
              dataKey="totalAmount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label={generateLabel}
            >
              {filteredList.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index > colors.length ? colors[0] : colors[index]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
}
