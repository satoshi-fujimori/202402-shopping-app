import { ReactNode } from "react";
import { Card } from "../ui/card";

export default function ChartWrapper({
  children,
  titleText,
}: {
  children: ReactNode;
  titleText: string;
}) {
  return (
    <Card className="flex flex-col gap-y-2 bg-primary w-11/12 h-4/6 p-4 mx-auto my-4 sm:w-2/5 sm:grow sm:shrink-0 ">
      <p className="block w-full text-left text-lg font-bold">{titleText}</p>
      {children}
    </Card>
  );
}
