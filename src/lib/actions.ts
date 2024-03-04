import type {
  AddItem,
  FetchedHistory,
  FetchedItem,
  Item,
  Histosy,
} from "@/type";
import { client } from "@/lib/client";

//取得したitemの形式を変換
function formatItem(item: FetchedItem): Item {
  const {
    id,
    name,
    currentAmount,
    currentPrice,
    status,
    inCart,
    unit,
    currentPurchasedDate,
    category,
  } = item;
  const formattedItem: Item = {
    id,
    name,
    currentAmount,
    currentPrice,
    status,
    inCart,
    unit,
    currentPurchasedDate,
    category,
  };
  return formattedItem;
}

//全itemの取得
export async function getAllItem(): Promise<Item[]> {
  try {
    const fetchedItemList: FetchedItem[] = await client.getAllContents({
      endpoint: "shopping",
    });
    const ItemList: Item[] = fetchedItemList.map((elem) => {
      return formatItem(elem);
    });
    return ItemList;
  } catch (e) {
    throw e;
  }
}

//idでitemを取得
export async function getItem(itemId: string): Promise<Item> {
  try {
    const fetchedItem: FetchedItem = await client.get({
      endpoint: "shopping",
      contentId: itemId,
    });
    return formatItem(fetchedItem);
  } catch (e) {
    throw e;
  }
}

//itemを更新
export async function updateItemList(itemList: Item[]): Promise<void> {
  for (let item of itemList) {
    let setItem: Item;
    if (item.inCart && item.status) {
      await recordHistory(item);
      setItem = { ...item, inCart: false, status: false };
    } else {
      setItem = { ...item };
    }

    try {
      const res = await client.update({
        endpoint: "shopping",
        contentId: item.id,
        content: { ...setItem },
      });
    } catch (e) {
      throw `item「${item.name}」の更新でエラーが発生`;
    }
  }
}

//itemを追加
export async function addItem(item: AddItem): Promise<string> {
  try {
    const res = await client.create({
      endpoint: "shopping",
      content: { ...item },
    });
    return res.id;
  } catch (e) {
    throw e;
  }
}

//itemを削除
export async function deleteItem(id: string) {
  try {
    await client.delete({
      endpoint: "shopping",
      contentId: id,
    });
    console.log("完了");
  } catch (e) {
    throw e;
  }
}

//取得したhistoryを変換
function formatHistory(history: FetchedHistory): Histosy {
  const {
    id,
    amount,
    price,
    purchasedDate,
    item: { id: itemId, name, category },
  } = history;
  const formattedHistory: Histosy = {
    id,
    amount,
    price,
    purchasedDate,
    name,
    category,
    itemId,
  };

  return formattedHistory;
}

//historyを取得
export async function getAllHistory(): Promise<Histosy[]> {
  try {
    const historyList: FetchedHistory[] = await client.getAllContents({
      endpoint: "history",
    });
    const formattedHistoryList: Histosy[] = historyList.map((history) => {
      return formatHistory(history);
    });
    formattedHistoryList.sort(
      (a, b) =>
        new Date(a.purchasedDate).getTime() -
        new Date(b.purchasedDate).getTime()
    );
    return formattedHistoryList;
  } catch (e) {
    throw e;
  }
}

//historyを作成
export async function recordHistory(elem: Item) {
  const { currentAmount: amount, currentPrice: price } = elem;
  const formattedHistory = {
    item: elem.id,
    amount,
    price,
    purchasedDate: new Date(),
  };
  client.create({
    endpoint: "history",
    content: { ...formattedHistory },
  });
}
