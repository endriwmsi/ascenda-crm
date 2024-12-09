// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { cn, formatCurrency } from "@/lib/utils";
// import { formatDate } from "date-fns";
// import ActionsCell from "./actions-cell";
// import { Transaction } from "@/app/types/constants";

// export const columns: ColumnDef<Transaction>[] = [
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return <div className="flex items-center justify-start gap-2">Nome</div>;
//     },
//     cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "description",
//     header: "Descrição",
//     cell: ({ row }) => <div>{row.getValue("description") ?? "-"}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: "Valor",
//     cell: ({ row }) => (
//       <div className="text-center">
//         {formatCurrency(row.getValue("amount"))}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "date",
//     header: "Data da transação",
//     cell: ({ row }) => (
//       <div className="text-center">
//         {formatDate(row.getValue("date"), "dd/MM/yyyy")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "type",
//     header: "Tipo",
//     cell: ({ row }) => (
//       <div
//         className={cn(
//           "flex max-w-[80px] justify-center rounded-xl px-2 py-1 text-center text-white",
//           row.getValue("type") === "INCOME"
//             ? "bg-green-500/30"
//             : "bg-red-500/30",
//         )}
//       >
//         {row.getValue("status") === "ACTIVE" ? "Ativo" : "Inativo"}
//       </div>
//     ),
//   },
//   {
//     id: "actions",
//     header: "Ações",
//     enableHiding: false,
//     cell: ({ row }) => <ActionsCell transaction={row.original} />,
//   },
// ];

"use client";

import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionsCell from "./actions-cell";
import { formatDate } from "date-fns";
import { Transaction } from "@prisma/client";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          Nome
          <Button
            className="p-2"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={16} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="text-start">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => (
      <div className="text-center">
        {formatCurrency(row.getValue("amount"))}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Data da transação",
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
          "justify-center rounded-xl px-2 py-1 text-center text-white",
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
