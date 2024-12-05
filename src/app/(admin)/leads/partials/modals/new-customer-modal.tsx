"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NewCustomerModalProps = {
  title: string;
  description: string;
  isOpen?: boolean;
  setIsOpen?: any;
  children?: React.ReactNode;
};

const NewCustomerModal = ({
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: NewCustomerModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewCustomerModal;
