"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { cn } from "@/lib/utils";

type ChartProps = {
  data: { month: string; incomeCount: number; outcomeCount: number }[];
  title: string;
  period: string;
  className?: string;
};

const chartConfig = {
  incomeCount: {
    label: "Receita: ",
    color: "hsl(var(--chart-1))",
  },
  outcomeCount: {
    label: "Despesas: ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = ({ data, title, period, className }: ChartProps) => {
  const totalIncome = data.reduce((sum, item) => sum + item.incomeCount, 0);
  const totalOutcome = data.reduce((sum, item) => sum + item.outcomeCount, 0);

  const isIncomeHigher = totalIncome > totalOutcome;
  const difference = Math.abs(totalIncome - totalOutcome);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Último ano</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {data.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <p className="text-lg font-medium">Nenhum dado disponível</p>
              <p>Faça uma transação para visualizar o gráfico.</p>
            </div>
          ) : (
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="incomeCount"
                fill={chartConfig.incomeCount.color}
                radius={4}
              />
              <Bar
                dataKey="outcomeCount"
                fill={chartConfig.outcomeCount.color}
                radius={4}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {data.length === 0 ? (
          <div className="leading-none text-muted-foreground">
            Nenhuma receita ou despesa registrada para o período.
          </div>
        ) : isIncomeHigher ? (
          <div className="flex gap-2 font-medium leading-none text-green-600">
            <TrendingUp className="h-4 w-4" />
            Você teve mais receitas do que despesas este ano. Diferença de R${" "}
            {difference.toFixed(2)}.
          </div>
        ) : (
          <div className="flex gap-2 font-medium leading-none text-red-600">
            <TrendingDown className="h-4 w-4" />
            Você teve mais despesas do que receitas este ano. Diferença de R${" "}
            {difference.toFixed(2)}.
          </div>
        )}
        {data.length > 0 && (
          <div className="leading-none text-muted-foreground">
            Mostrando o resumo de receitas e despesas do período analisado.
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Chart;
