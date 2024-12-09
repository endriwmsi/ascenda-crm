"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PhoneInput } from "@/components/admin-panel/phone-input";

import { createCustomer } from "@/actions/customers/create-customer";
import { customerSchema } from "@/lib/schemas";
import { Calendar } from "@/components/ui/calendar";

type CreateCustomerFormProps = {
  onSave: () => void;
};

const CreateCustomerForm = ({ onSave }: CreateCustomerFormProps) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      description: "",
      birthDate: new Date(),
      status: "ACTIVE",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    setIsLoading(true);
    try {
      if (!data?.user?.email) {
        throw new Error("Usuário não autenticado ou e-mail não disponível.");
      }

      await createCustomer(values);
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
              <FormLabel>Nome do Cliente*</FormLabel>
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
              <FormLabel>Email*</FormLabel>
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone*</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione os produtos ou serviços que o cliente comprou."
                  className="resize-none p-3 text-lg"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de nascimento*</FormLabel>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
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
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={field.value}
                    onSelect={field.onChange}
                    onDayClick={() => setIsOpen(false)}
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    defaultMonth={field.value}
                  />
                </PopoverContent>
              </Popover>
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
