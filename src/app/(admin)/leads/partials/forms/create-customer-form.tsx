"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import { createCustomer } from "@/actions/customers/add-customer";
import { customerSchema } from "@/lib/constants";

type CreateCustomerFormProps = {
  onSave: () => void;
};

const CreateCustomerForm = ({ onSave }: CreateCustomerFormProps) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    setIsLoading(true);
    try {
      if (!data?.user?.email) {
        throw new Error("Usuário não autenticado ou e-mail não disponível.");
      }

      await createCustomer(values, data?.user.email);
    } catch (error) {
      console.error("Erro ao salvar informações:", error);
    } finally {
      setIsLoading(false);
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
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: João Silva"
                  className="p-3 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ex: joao@email.com"
                  className="p-3 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: (11) 98765-4321"
                  className="p-3 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione quaisquer notas sobre o cliente"
                  className="resize-none p-3 text-lg"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
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

export default CreateCustomerForm;
