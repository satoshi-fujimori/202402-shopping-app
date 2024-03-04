import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { categories } from "../ItemList";
import { LineChartItem } from "./ItemLineChart";
import ItemSelectionBox from "./ItemSelectionBox";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

export default function CategoryTabList({
  selectedCategory,
  handleSelectItem,
  selectedItem,
  addedList,
  handleSelectCategory,
}: {
  selectedCategory: string;
  handleSelectItem: (value: string) => void;
  selectedItem: string;
  addedList: LineChartItem[];
  handleSelectCategory: (value: string) => void;
}) {
  //selectionとして描画するリストを生成する
  const generateRenderList = (
    addedList: LineChartItem[],
    category?: string
  ) => {
    let renderList: LineChartItem[] = [];
    for (let item of addedList) {
      let flag: boolean = false;
      for (let renderItem of renderList) {
        if (item.itemId === renderItem.itemId) {
          flag = true;
          break;
        }
      }
      !flag && renderList.push(item);
    }
    return category
      ? renderList.filter((item) => item.category[0] === category)
      : renderList;
  };

  return (
    <>
      <Tabs onValueChange={(value) => handleSelectCategory(value)}>
        <TabsList className="grid gap-1 grid-cols-5 w-full h-fit">
          {categories.map((category, i) => (
            <TabsTrigger value={category} key={i}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category, i) => (
          <TabsContent value={category} key={i} className="">
            <ItemSelectionBox
              handleSelectItem={handleSelectItem}
              selectedItem={selectedItem}
              renderList={generateRenderList(addedList, category)}
            />
            <div className="flex justify-end">
              <CheckCircleIcon className="w-5" /> {selectedItem}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {!selectedCategory && (
        <>
          <ItemSelectionBox
            handleSelectItem={handleSelectItem}
            selectedItem={selectedItem}
            renderList={generateRenderList(addedList)}
          />
          <div className="flex justify-end">
            <CheckCircleIcon className="w-5" /> {selectedItem}
          </div>
        </>
      )}
    </>
  );
}
