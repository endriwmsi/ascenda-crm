"use client";

import { Button } from "@/components/ui/button";
import { PenIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Transaction } from "./columns";
import { toast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/actions/transactions/delete-transaction";
import DeleteTransactionModal from "../modals/delete-transaction-modal";
import EditTransactionModal from "../modals/edit-transaction-modal";
import UpdateTransactionsForm from "../forms/update-transactions-form";

type ActionsCellProps = {
  transaction: Transaction;
};

const ActionsCell = ({ transaction }: ActionsCellProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button className="bg-blue-600" onClick={() => setIsEditModalOpen(true)}>
        <PenIcon size={14} />
      </Button>

      <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
        <XIcon size={14} />
      </Button>

      {/* Modal de Edição */}
      <EditTransactionModal
        title="Editar Transação"
        description="Modifique os campos abaixo para alterar uma transação."
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      >
        <UpdateTransactionsForm
          onSave={() => setIsEditModalOpen(false)}
          transaction={transaction}
        />
      </EditTransactionModal>

      {/* Modal de Exclusão */}
      <DeleteTransactionModal
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
      </DeleteTransactionModal>
    </div>
  );
};

export default ActionsCell;
