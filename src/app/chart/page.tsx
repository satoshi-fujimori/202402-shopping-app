import CategoryPieChart from "@/components/chart/CategoryPieChart";
import ChartWrapper from "@/components/chart/ChartWrapper";
import ItemBarChart from "@/components/chart/ItemBarChart";
import ItemLineChart from "@/components/chart/ItemLineChart";

export const dynamic = "force-dynamic";

export default function ChartPage() {
  return (
    <div className="h-full w-full mx-auto sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:w-8/12">
      <ChartWrapper titleText="Amount of Item Barchart">
        <ItemBarChart />
      </ChartWrapper>
      <ChartWrapper titleText="Amount of Item Piechart by Category">
        <CategoryPieChart />
      </ChartWrapper>
      <ChartWrapper titleText="UnitPrice of Item Linechart">
        <ItemLineChart />
      </ChartWrapper>
    </div>
  );
}
