"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBoxIcon, XIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { deleteCustomer } from "@/actions/customers/delete-customer";
import UpdateCustomerForm from "../forms/update-customer-form";
import Modal from "@/components/ui/modal";
import { Customer } from "@/app/types/constants";

type ActionsCellProps = {
  customer: Customer;
};

const ActionsCell = ({ customer }: ActionsCellProps) => {
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

      {/* Modal de Edição */}
      <Modal
        title="Editar cliente"
        description="Modifique os campos abaixo para alterar um cliente."
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      >
        <UpdateCustomerForm
          onSave={() => setIsEditModalOpen(false)}
          customer={customer}
        />
      </Modal>

      <Modal
        title="Deletar cliente"
        description="Você tem certeza que deseja deletar este cliente?"
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
              await deleteCustomer(customer.id);
              toast({
                description: "Cliente deletado com sucesso!",
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
