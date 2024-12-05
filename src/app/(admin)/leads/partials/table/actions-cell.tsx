"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenIcon, XIcon } from "lucide-react";
import { Customer } from "./columns";
import { toast } from "@/hooks/use-toast";
import { deleteCustomer } from "@/actions/customers/delete-customer";
import DeleteCustomerModal from "../modals/delete-customer-modal";
import EditCustomerModal from "../modals/edit-customer-modal";
import UpdateCustomerForm from "../forms/update-customer-form";

type ActionsCellProps = {
  customer: Customer;
};

const ActionsCell = ({ customer }: ActionsCellProps) => {
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
      <EditCustomerModal
        title="Editar Transação"
        description="Modifique os campos abaixo para alterar uma transação."
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      >
        <UpdateCustomerForm
          onSave={() => setIsEditModalOpen(false)}
          customer={customer}
        />
      </EditCustomerModal>

      <DeleteCustomerModal
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
      </DeleteCustomerModal>
    </div>
  );
};

export default ActionsCell;
