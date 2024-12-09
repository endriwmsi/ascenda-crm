"use client";

import Modal from "@/components/admin-panel/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateCustomerForm from "./forms/create-customer-form";

const LeadsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold">Clientes</span>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Adicionar
      </Button>
      <Modal
        title="Adicionar novo cliente"
        description="Preencha os campos abaixo para adicionar um novo cliente."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <CreateCustomerForm onSave={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default LeadsComponent;
