"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionsCell from "./actions-cell";
import { formatDate } from "date-fns";
import { Customer } from "@/app/types/constants";

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: "Data de nascimento",
    cell: ({ row }) => (
      <div>{formatDate(row.getValue("birthDate"), "dd/MM/yyyy")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "rounded-xl px-2 py-1 text-center text-white",
          row.getValue("status") === "ACTIVE"
            ? "bg-green-500/30"
            : "bg-red-500/30",
        )}
      >
        {row.getValue("status") === "ACTIVE" ? "Ativo" : "Inativo"}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell customer={row.original} />,
  },
];
