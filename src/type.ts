import { Item } from "@radix-ui/react-select";
import { ChangeEvent } from "react";

//apiで取得したitem
export type FetchedItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  name: string;
  currentAmount: number;
  currentPrice: number;
  status: boolean;
  inCart: boolean;
  unit: string;
  currentPurchasedDate: Date;
  category: string[];
  remarks: string;
};

//扱う形式にしたitem
export type Item = Pick<
  FetchedItem,
  | "id"
  | "name"
  | "currentAmount"
  | "currentPrice"
  | "status"
  | "inCart"
  | "unit"
  | "currentPurchasedDate"
  | "category"
>;

export type AddItem = Pick<
  FetchedItem,
  | "name"
  | "currentAmount"
  | "currentPrice"
  | "unit"
  | "currentPurchasedDate"
  | "remarks"
  | "category"
  | "status"
  | "inCart"
>;

export type ItemCardProps = {
  item: Item;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCart: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  isSubmitting: boolean;
};

export type CartItemListProps = {
  itemList: Item[];
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCart: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleSubmit: Function;
  isSubmitting: boolean;
};

export type FetchedHistory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  item: FetchedItem;
  amount: number;
  price: number;
  purchasedDate: Date;
};

//基本型
export type Histosy = Pick<
  FetchedHistory,
  "id" | "amount" | "price" | "purchasedDate"
> &
  Pick<FetchedItem, "name" | "category"> & { itemId: string };

//
export type TotalHistoryByItem = Pick<
  Histosy,
  "id" | "name" | "category" | "purchasedDate"
> & {
  totalAmount: number;
};
