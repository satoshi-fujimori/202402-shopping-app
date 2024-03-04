import { Badge } from "./ui/badge";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Item, CartItemListProps, ItemCardProps } from "@/type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CartItemList from "./CartItemList";

export default function ShoppingCart({
  itemList,
  handleChangeCart,
  handleChangeValue,
  handleDeleteItem,
  isSubmitting,
  handleSubmit,
}: CartItemListProps) {
  return (
    <div className="w-full m-1 flex justify-end">
      {itemList.length !== 0 && (
        <Badge className="text-xs w-fit h-fit bg-accent">
          {itemList.length}
        </Badge>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <button className="block ">
            <ShoppingCartIcon className="w-6 justify-self-center" fill="none" />
          </button>
        </DialogTrigger>
        <DialogContent className="bottom-0 overflow-scroll">
          <DialogHeader>
            <DialogTitle className="flex">
              ItemList in Cart
              <ShoppingCartIcon
                className="w-4 justify-self-center"
                fill="none"
              />
            </DialogTitle>
            <DialogDescription className="text-left">
              your itemlist in shopping cart
            </DialogDescription>
          </DialogHeader>
          <CartItemList
            itemList={itemList}
            handleChangeCart={handleChangeCart}
            handleChangeValue={handleChangeValue}
            handleDeleteItem={handleDeleteItem}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
