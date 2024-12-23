"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveCompanyInfo } from "@/actions/company/save-company-info";
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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import { companySchema } from "@/lib/schemas";

const CompanyInfoForm = () => {
  const router = useRouter();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      foundationYear: 2024,
      niche: "",
      location: "",
      mission: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    setIsLoading(true);
    try {
      if (!data?.user?.email) {
        throw new Error("Usuário não autenticado ou e-mail não disponível.");
      }
      await saveCompanyInfo(values, data.user.email);
    } catch (error) {
      console.error("Erro ao salvar informações:", error);
    } finally {
      setIsLoading(false);
      router.push("/dashboard");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Cadastro de Empresa
        </CardTitle>
        <CardDescription>
          Preencha os detalhes da sua empresa abaixo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: ACME Inc."
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
              name="foundationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano de Fundação</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 2024"
                      className="p-3 text-lg"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nicho</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Farmácia"
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: São Paulo - SP"
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
              name="mission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobre</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Com suas palavras, fale um pouco sobre a missão da sua empresa."
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
                <>
                  <span>Salvar</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoForm;
