"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewTransactionModal from "./modals/new-transaction-modal";
import CreateTransactionsForm from "./forms/create-transactions-form";

const FinanceComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <span className="mt-4 text-3xl font-bold">Financeiro</span>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Nova Transação
      </Button>

      <NewTransactionModal
        title="Adicionar nova transação"
        description="Preencha os campos abaixo para adicionar uma nova transação."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <CreateTransactionsForm onSave={() => setIsOpen(false)} />
      </NewTransactionModal>
    </div>
  );
};

export default FinanceComponent;
