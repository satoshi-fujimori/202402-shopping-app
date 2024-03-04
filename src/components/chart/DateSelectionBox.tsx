import { useChart } from "@/app/hooks/useChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DateSelectionBox({
  selectedMonth,
  handleSelectMonth,
}: {
  selectedMonth: string;
  handleSelectMonth: (value: string) => void;
}) {
  const { selections } = useChart();
  return (
    <div className="self-start">
      <Select
        value={selectedMonth}
        onValueChange={(value) => handleSelectMonth(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="YM" />
        </SelectTrigger>
        <SelectContent>
          {selections.map((selection) => (
            <SelectItem key={selection} value={selection}>
              {selection}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
