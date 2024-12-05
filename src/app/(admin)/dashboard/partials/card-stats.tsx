import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

type CardStatsProps = {
  title: string;
  value: number;
  percentage?: string;
  description: string;
  className?: string;
};

export function CardStats({
  title,
  value,
  percentage,
  description,
  className,
}: CardStatsProps) {
  return (
    <Card className={cn("max-h-[180px] border-secondary shadow-lg", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <p className="text-2xl">{formatCurrency(value)}</p>
          <div
            className={cn(
              "flex items-center justify-center rounded-lg px-2 py-0.5 text-[10px]",
              percentage?.includes("-")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600",
            )}
          >
            <p>{percentage}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm">{description}</p>
      </CardFooter>
    </Card>
  );
}
