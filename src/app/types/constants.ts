import {
  CustomerStatus,
  TaskPriority,
  TaskStatus,
  TransactionType,
} from "@prisma/client";

export type Customer = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  status: CustomerStatus;
  birthDate: Date;
};

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  description?: string | null;
  type: TransactionType;
  date: Date;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string | null;
  dueDate: Date | null;
};
