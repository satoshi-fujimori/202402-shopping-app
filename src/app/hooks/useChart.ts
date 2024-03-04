import { useState, useEffect } from "react";
import * as actions from "@/lib/actions";
import { Histosy, Item, TotalHistoryByItem } from "@/type";
import { categories } from "@/components/ItemList";

export function useChart() {
  const [historyList, setHistoryList] = useState<TotalHistoryByItem[]>([]);
  const [itemHistoryList, setItemHistoryList] = useState<Histosy[]>([]);
  useEffect(() => {
    actions.getAllHistory().then((list) => {
      setItemHistoryList(list);
      const renderList = sumAmountByItem(list);
      setHistoryList(renderList);
    });
  }, []);

  //itemごとの合計を計算
  const sumAmountByItem = (list: Histosy[]): TotalHistoryByItem[] => {
    let formattedList: TotalHistoryByItem[] = [];
    for (let history of list) {
      let flag: boolean = false;
      for (let formattedHistory of formattedList) {
        if (history.itemId === formattedHistory.id) {
          formattedHistory.totalAmount += history.amount;
          flag = true;
          break;
        }
      }
      !flag &&
        formattedList.push({
          id: history.itemId,
          name: history.name,
          category: history.category,
          totalAmount: history.amount,
          purchasedDate: history.purchasedDate,
        });
    }
    return formattedList;
  };

  //比較できる形式に変換する関数
  const formatYearMonth = (date: Date) => {
    const year: string = new Date(date).getFullYear().toString();
    const month: string = (new Date(date).getMonth() + 1).toString();
    const formattedYearMonth =
      year + "/" + (month.length === 1 ? 0 + month : month);
    return formattedYearMonth;
  };
  //年月のselection
  const formatSelection = () => {
    let formattedSelections: string[] = ["All"];

    for (let history of historyList) {
      let flag = false;
      const formattedYearMonth = formatYearMonth(history.purchasedDate);
      for (let selection of formattedSelections) {
        if (formattedYearMonth === selection) {
          flag = true;
        }
      }
      !flag && formattedSelections.push(formattedYearMonth);
    }
    return formattedSelections;
  };
  const selections: string[] = formatSelection();

  //monthのselectを管理
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const handleSelectMonth = (value: string): void => {
    setSelectedMonth(value);
  };

  //categoryのselectを管理
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleSelectCategory = (value: string): void =>
    setSelectedCategory(value);

  //itemのselectを管理
  const [selectedItem, setSelectedItem] = useState<string>("");
  const handleSelectItem = (value: string): void => setSelectedItem(value);

  return {
    historyList,
    formatYearMonth,
    selections,
    selectedMonth,
    handleSelectMonth,
    selectedCategory,
    handleSelectCategory,
    itemHistoryList,
    selectedItem,
    handleSelectItem,
  };
}
