"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateTransactionsForm from "./forms/create-transactions-form";
import Modal from "@/components/ui/modal";

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

      <Modal
        title="Adicionar nova transação"
        description="Preencha os campos abaixo para adicionar uma nova transação."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <CreateTransactionsForm onSave={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default FinanceComponent;
