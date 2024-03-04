import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { ItemCardProps } from "@/type";
import { ChangeEvent } from "react";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ItemInfo from "./ItemInfo";

export default function ItemCard({
  item,
  handleChangeValue,
  handleChangeCart,
  handleDeleteItem,
  isSubmitting,
}: ItemCardProps) {
  const colorList = [
    ["野菜", "red"],
    ["果物", "blue"],
    ["肉魚", "yellow"],
    ["乳製品", "green"],
    ["飲料", "indigo"],
    ["その他食品", "purple"],
    ["生活用品", "pink"],
    ["その他", "black"],
  ];

  let colorClass: string;
  switch (item.category[0]) {
    case "野菜":
      colorClass = "before:border-red-500";
      break;
    case "果物":
      colorClass = "before:border-blue-500";
      break;
    case "肉魚":
      colorClass = "before:border-yellow-500";
      break;
    case "乳製品":
      colorClass = "before:border-green-500";
      break;
    case "飲料":
      colorClass = "before:border-indigo-500";
      break;
    case "その他食品":
      colorClass = "before:border-purple-500";
      break;
    case "生活用品":
      colorClass = "before:border-pink-500";
      break;
    default:
      colorClass = "before:border-black-500";
  }

  return (
    <Card
      className={classNames("w-full my-2", item.inCart && "ring-4 ring-accent")}
    >
      <CardContent className="flex py-3 items-center justify-between ">
        <p
          className={classNames(
            "text-sm before:border-l-2 before:mr-1",
            colorClass
          )}
        >
          {item.name}
        </p>
        <div className="flex gap-x-2 items-center">
          <Input
            type="number"
            className="text-xs w-12 h-6 border-gray-500"
            onChange={handleChangeValue}
            data-id={item.id}
            name="currentAmount"
            value={item.currentAmount}
          />
          <p className="text-xs"> {item.unit}</p>
          <Popover>
            <PopoverTrigger>
              <InformationCircleIcon className="w-4 ml-auto mr-0" />
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <ItemInfo
                item={item}
                handleDeleteItem={handleDeleteItem}
                isSubmitting={isSubmitting}
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={() => handleChangeCart(item.id)}
            data-id={item.id}
            name="inCart"
          >
            {item.inCart ? (
              <ArrowUturnLeftIcon className="w-4 justify-self-end" />
            ) : (
              <ShoppingCartIcon className="w-4 justify-self-end" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
