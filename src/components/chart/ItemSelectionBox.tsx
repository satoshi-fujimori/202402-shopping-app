import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChartItem } from "./ItemLineChart";

export default function ItemSelectionBox({
  handleSelectItem,
  selectedItem,
  renderList,
}: {
  handleSelectItem: (value: string) => void;
  selectedItem: string;
  renderList: LineChartItem[];
}) {
  return (
    <div className="self-start">
      <Select
        value={selectedItem}
        onValueChange={(value) => handleSelectItem(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Item" />
        </SelectTrigger>
        <SelectContent>
          {renderList.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
