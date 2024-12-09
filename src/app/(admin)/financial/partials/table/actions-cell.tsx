"use client";

import { Button } from "@/components/ui/button";
import { PenBoxIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/actions/transactions/delete-transaction";
import UpdateTransactionsForm from "../forms/update-transactions-form";
import Modal from "@/components/ui/modal";
import { Transaction } from "@/app/types/constants";

type ActionsCellProps = {
  transaction: Transaction;
};

const ActionsCell = ({ transaction }: ActionsCellProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={() => setIsEditModalOpen(true)}
      >
        <PenBoxIcon size={18} />
      </Button>

      <Button
        className="bg-red-200 text-red-500 hover:bg-red-500 hover:text-white"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <XIcon size={18} />
      </Button>

      <Modal
        title="Editar Transação"
        description="Modifique os campos abaixo para alterar uma transação."
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      >
        <UpdateTransactionsForm
          onSave={() => setIsEditModalOpen(false)}
          transaction={transaction}
        />
      </Modal>

      <Modal
        title="Deletar Transação"
        description="Você tem certeza que deseja deletar esta transação?"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteTransaction(transaction.id);
              toast({
                description: "Transação deletada com sucesso!",
              });
              setIsDeleteModalOpen(false);
            }}
          >
            Deletar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ActionsCell;
