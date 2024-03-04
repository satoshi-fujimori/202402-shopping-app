"use client";

import { useChart } from "@/app/hooks/useChart";
import { TotalHistoryByItem } from "@/type";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateSelectionBox from "./DateSelectionBox";
import CategorySelectionBox from "./CategorySelectionBoX";
import { Suspense } from "react";

export default function ItemBarChart() {
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
      filteredList = historyList;
      break;
    default:
      filteredList = historyList.filter(
        (item) => formatYearMonth(item.purchasedDate) === selectedMonth
      );
  }
  switch (selectedCategory) {
    case "All":
    case "":
      break;
    default:
      filteredList = filteredList.filter(
        (item) => item.category[0] === selectedCategory
      );
  }

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
      {/*layoutをh-screenにするとコンテナのレスポンシブによりはみ出る。
      h-fullにするとコンテナが相対的に0になる。やむを得ずmin-h-60*/}
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="min-h-60 shadow-lg rounded-md px-2"
      >
        <BarChart width={200} height={200} data={filteredList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalAmount" fill="#E78895" maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
