import { ItemCardProps } from "@/type";
import ItemCard from "./ItemCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { CurrencyYenIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export default function ItemInCart({
  item,
  handleChangeCart,
  handleChangeValue,
  handleDeleteItem,
  isSubmitting,
}: ItemCardProps) {
  return (
    <>
      <input
        type="checkbox"
        className="w-4 h-4"
        checked={item.status}
        data-id={item.id}
        name="status"
        onChange={handleChangeValue}
      />
      <Popover>
        <PopoverTrigger>
          <CurrencyYenIcon
            className={classNames("w-5", !item.status && "hidden")}
          />
        </PopoverTrigger>
        <PopoverContent className="flex gap-x-2 w-fit">
          ￥
          <Input
            type="number"
            className="text-xs text-right w-20 h-6 border-gray-500"
            onChange={handleChangeValue}
            data-id={item.id}
            value={item.currentPrice}
            name="currentPrice"
          />
        </PopoverContent>
      </Popover>

      <ItemCard
        item={item}
        handleChangeCart={handleChangeCart}
        handleChangeValue={handleChangeValue}
        isSubmitting={isSubmitting}
        handleDeleteItem={handleDeleteItem}
      />
    </>
  );
}
