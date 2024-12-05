"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { formatDate } from "date-fns";
import { TransactionType } from "@prisma/client";
import ActionsCell from "./actions-cell";

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  description?: string | null;
  type: TransactionType;
  date: Date;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("description") ?? "-"}</div>,
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => <div>{formatCurrency(row.getValue("amount"))}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Data da transação
          <Button
            className="h-5 w-5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("date"), "dd/MM/yyyy")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
      <div
        className={cn(
          "max-w-[80px] rounded-xl px-2 py-1 text-center text-white",
          row.getValue("type") === "INCOME"
            ? "bg-green-500/30"
            : "bg-red-500/30",
        )}
      >
        {row.getValue("type") === "INCOME" ? "Receita" : "Despesa"}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell transaction={row.original} />,
  },
];
