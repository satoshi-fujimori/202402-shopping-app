import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../ItemList";

export default function CategorySelectionBox({
  selectedCategory,
  handleSelectedCategory,
}: {
  selectedCategory: string;
  handleSelectedCategory: (value: string) => void;
}) {
  return (
    <div className="self-start">
      <Select
        value={selectedCategory}
        onValueChange={(value) => handleSelectedCategory(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="CATEGORY" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
