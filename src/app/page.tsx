import { ItemList } from "@/components/ItemList";
import { getAllItem } from "@/lib/actions";
import { Item } from "@/type";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data: Item[] = await getAllItem();
  return (
    <div>
      <ItemList data={data} />
    </div>
  );
}
