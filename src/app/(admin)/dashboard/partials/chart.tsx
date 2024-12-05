"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn, formatCurrency } from "@/lib/utils";

type ChartProps = {
  data: { month: string; sellsCount: number; sellsValue: number }[];
  title: string;
  period: string;
  className?: string;
};

const chartConfig = {
  sellsCount: {
    label: "Vendas: ",
    color: "hsl(var(--chart-1))",
  },
  sellsValue: {
    label: "Total: ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = ({ data, title, period, className }: ChartProps) => {
  const formattedData = data.map((item) => ({
    ...item,
    formattedSellsValue: formatCurrency(item.sellsValue),
  }));

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Último ano</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formattedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sellsCount"
              type="monotone"
              stroke={chartConfig.sellsCount.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sellsValue"
              type="monotone"
              stroke={chartConfig.sellsValue.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales and revenue for the current year
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chart;
