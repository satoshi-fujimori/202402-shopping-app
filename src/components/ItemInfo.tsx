import { Item } from "@/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";

export default function ItemInfo({
  item,
  handleDeleteItem,
  isSubmitting,
}: {
  item: Item;
  handleDeleteItem: (id: string) => void;
  isSubmitting: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Informtion</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Current Price:￥{item.currentPrice}</p>
        <p>
          Purchased:
          {new Date(item.currentPurchasedDate).toDateString()}
        </p>
        <button
          onClick={() => handleDeleteItem(item.id)}
          disabled={isSubmitting}
        >
          <TrashIcon className={classNames("w-4 my-2", isSubmitting && "")} />
        </button>
      </CardContent>
    </Card>
  );
}
