"use client";

import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { CustomerStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import ActionsCell from "./actions-cell";

export type Customer = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  notes?: string | null;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          Email
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => <div>{formatPhoneNumber(row.getValue("phone"))}</div>,
  },
  {
    accessorKey: "notes",
    header: "Notas",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell customer={row.original} />,
  },
];
