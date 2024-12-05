"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditCustomerModalProps = {
  title: string;
  description: string;
  isOpen?: boolean;
  setIsOpen?: any;
  children?: React.ReactNode;
};

const EditCustomerModal = ({
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: EditCustomerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerModal;
