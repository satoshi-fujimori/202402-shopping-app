import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ItemFormCard, { ItemForm } from "./ItemFormCard";

export default function ItemAddButton({
  defaultCategory,
  handleAddItem,
  isSubmitting,
}: {
  defaultCategory: string;
  handleAddItem: (item: ItemForm) => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="w-fit ml-auto mr-0">
      <Dialog>
        <DialogTrigger asChild>
          <PlusCircleIcon className="w-6" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item Add Form</DialogTitle>
          </DialogHeader>
          <ItemFormCard
            defaultCategory={defaultCategory}
            handleAddItem={handleAddItem}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
