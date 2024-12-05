"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/admin-panel/currency-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { financeSchema } from "@/lib/constants";
import { Transaction } from "../table/columns";
import { updateTransaction } from "@/actions/transactions/update-transaction";

type UpdateTransactionsFormProps = {
  transaction: Transaction;
  onSave: () => void;
};

const UpdateTransactionsForm = ({
  onSave,
  transaction,
}: UpdateTransactionsFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof financeSchema>>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      name: transaction.name,
      description: transaction.description ?? undefined,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
    },
  });

  const onSubmit = async (values: z.infer<typeof financeSchema>) => {
    setIsLoading(true);
    try {
      await updateTransaction(values, transaction.id);
    } catch (error) {
      toast({
        description: `Erro ao alterar informações:, ${error}`,
      });
    } finally {
      setIsLoading(false);
      toast({
        description: "Transação alterada com sucesso!",
      });
      onSave();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormControl>
              <FormItem>
                <FormLabel>Nome da transação*</FormLabel>
                <Input
                  placeholder="Ex: Computador novo..."
                  className="p-3 text-lg"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor da transação*</FormLabel>
              <FormControl>
                <CurrencyInput
                  placeholder="Ex: R$1.000,00"
                  className="p-3 text-lg"
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo*</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME">Receita</SelectItem>
                    <SelectItem value="OUTCOME">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data da transação*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(!field.value && "text-muted-foreground")}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: ptBR })
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormControl>
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <Input
                  placeholder="Ex: Para trabalho..."
                  className="p-3 text-lg"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            </FormControl>
          )}
        />
        <Button type="submit" className="w-full py-6 text-lg">
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            <span>Salvar</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateTransactionsForm;
