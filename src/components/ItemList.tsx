"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Item } from "@/type";
import ItemCard from "./ItemCard";
import {
  CircleSpinnerOverlay,
  FerrisWheelSpinner,
} from "react-spinner-overlay";

import { useItem } from "@/app/hooks/useItem";
import ShoppingCart from "./ShoppingCart";
import { Button } from "./ui/button";
import ItemAddButton from "./ItemAddButton";
import { Card } from "./ui/card";

export const categories: string[] = [
  "野菜",
  "果物",
  "肉魚",
  "乳製品",
  "飲料",
  "その他食品",
  "生活用品",
  "その他",
];
export function ItemList({ data }: { data: Item[] }) {
  const {
    itemList,
    filterList,
    handleChangeValue,
    handleChangeCart,
    handleAddItem,
    handleDeleteItem,
    isSubmitting,
    handleSubmit,
  } = useItem(data);
  return (
    <>
      <Card className="sm:w-1/2 mx-auto mt-10">
        <Tabs
          defaultValue="野菜"
          className="w-full flex flex-col items-center p-2 gap-y-2 bg-primary"
        >
          <div className="flex w-full justify-between">
            <FerrisWheelSpinner loading={isSubmitting} size={28} />
            <CircleSpinnerOverlay loading={isSubmitting} />
            <ShoppingCart
              itemList={itemList.filter((item) => item.inCart === true)}
              handleChangeCart={handleChangeCart}
              handleChangeValue={handleChangeValue}
              handleDeleteItem={handleDeleteItem}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          </div>
          <TabsList className="grid gap-1 grid-cols-5 bg-muted sm:fle w-full h-fit">
            {categories.map((category, i) => (
              <TabsTrigger value={category} key={i}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            className="text-xs w-fit h-fit p-2 mr-auto ml-0 bg-accent"
            onClick={() => handleSubmit(itemList)}
            disabled={isSubmitting}
          >
            Update
          </Button>
          {categories.map((category, i) => (
            <TabsContent value={category} key={i} className="w-full">
              {filterList(category).map((elem, i) => (
                <ItemCard
                  key={i}
                  item={elem}
                  handleChangeValue={handleChangeValue}
                  handleChangeCart={handleChangeCart}
                  handleDeleteItem={handleDeleteItem}
                  isSubmitting={isSubmitting}
                />
              ))}
              <ItemAddButton
                defaultCategory={category}
                handleAddItem={handleAddItem}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </>
  );
}
