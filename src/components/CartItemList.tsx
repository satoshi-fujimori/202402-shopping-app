import type { Item, CartItemListProps } from "@/type";
import { Button } from "./ui/button";
import { useItem } from "@/app/hooks/useItem";
import ItemInCart from "./ItemInCart";

export default function CartItemList({
  itemList,
  handleChangeValue,
  handleChangeCart,
  handleDeleteItem,
  isSubmitting,
  handleSubmit,
}: CartItemListProps) {
  return (
    <>
      {itemList.map((item, i) => (
        <div key={i} className="flex items-center gap-x-2">
          <ItemInCart
            item={item}
            handleChangeCart={handleChangeCart}
            handleChangeValue={handleChangeValue}
            isSubmitting={isSubmitting}
            handleDeleteItem={handleDeleteItem}
          />
        </div>
      ))}
      <Button
        className="w-1/2 mx-auto bg-accent"
        onClick={() => {
          handleSubmit(itemList);
        }}
        disabled={isSubmitting}
      >
        Update
      </Button>
    </>
  );
}
