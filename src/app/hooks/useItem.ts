"use client";

import { Item, AddItem } from "@/type";
import { ItemForm } from "@/components/ItemFormCard";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import * as actions from "@/lib/actions";

type UseItemReturnType = {
  itemList: Item[];
  isSubmitting: boolean;
  handleSubmit: Function;
  filterList: (category: string) => Item[];
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCart: (id: string) => void;
  handleAddItem: (item: ItemForm) => void;
  handleDeleteItem: (id: string) => void;
};

export function useItem(data: Item[]): UseItemReturnType {
  const [itemList, setItemList] = useState<Item[]>(data);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const filterList = (category: string): Item[] => {
    return itemList.filter((item) => item.category[0] === category);
  };
  //アイテムリスト内で数や状態の更新をハンドリング
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const changedItemId = e.target.getAttribute("data-id");
    const changedItemList: Item[] = itemList.map((item) => {
      if (item.id === changedItemId) {
        switch (e.target.name) {
          case "status":
            return {
              ...item,
              status: !item.status,
            };
          default:
            return {
              ...item,
              [e.target.name]: Number(e.target.value),
            };
        }
      }
      return item;
    });
    setItemList(changedItemList);
  };
  //カートへのアイテムの出入をハンドリング
  const handleChangeCart = (id: string) => {
    const changedItemList: Item[] = itemList.map((item) => {
      if (item.id === id) {
        !item.inCart
          ? toast("カートへ追加", { position: "bottom-right" })
          : toast("カートから削除", { position: "bottom-right" });
        return {
          ...item,
          inCart: !item.inCart,
          status: false,
        };
      }
      return item;
    });
    setItemList(changedItemList);
  };
  //アイテムの更新をハンドリング
  const handleSubmit = async (data: Item[]): Promise<void> => {
    try {
      setIsSubmitting(true);
      await actions.updateItemList(data);
      setIsSubmitting(false);
      window.location.reload();
      toast("更新完了", { position: "bottom-right" });
    } catch (e) {
      console.log(e);
    }
  };
  //アイテムの追加をハンドリング
  const handleAddItem = async (item: ItemForm) => {
    const addToList = (createdItem: Item): void => {
      let newList: Item[] = itemList;
      newList.push(createdItem);
      setItemList(newList);
    };
    setIsSubmitting(true);
    const formattedItem: AddItem = {
      ...item,
      currentAmount: 0,
      currentPrice: 0,
      currentPurchasedDate: new Date(),
      remarks: "",
      category: [item.category],
      status: false,
      inCart: false,
    };
    const id = await actions.addItem(formattedItem);
    const addedItem: Item = await actions.getItem(id);
    addToList(addedItem);
    toast("アイテムを追加しました", { position: "bottom-right" });
    setIsSubmitting(false);
  };
  const handleDeleteItem = async (id: string) => {
    try {
      setIsSubmitting(true);
      await actions.deleteItem(id);
      const newList: Item[] = itemList.filter((item) => item.id !== id);
      setItemList(newList);
      setIsSubmitting(false);
      toast("アイテムを削除しました", { position: "bottom-right" });
    } catch (e) {
      throw e;
    }
  };

  return {
    itemList,
    isSubmitting,
    handleSubmit,
    filterList,
    handleChangeValue,
    handleChangeCart,
    handleAddItem,
    handleDeleteItem,
  };
}
