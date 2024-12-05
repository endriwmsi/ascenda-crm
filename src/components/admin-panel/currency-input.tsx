import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps
  extends Omit<NumericFormatProps, "customInput" | "onValueChange"> {
  className?: string;
  onValueChange?: (value: number | undefined) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onValueChange, value, ...props }, ref) => {
    return (
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        customInput={Input}
        getInputRef={ref}
        value={value}
        onValueChange={({ floatValue }) => {
          if (onValueChange) {
            onValueChange(floatValue || 0);
          }
        }}
        {...props}
      />
    );
  },
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };