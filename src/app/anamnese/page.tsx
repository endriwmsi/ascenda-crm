"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyInfoSchema } from "../_lib/company-info-schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveCompanyInfo } from "../_actions/save-company-info";
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";
import { Button } from "../_components/ui/button";

type CompanyInfo = z.infer<typeof companyInfoSchema>;

const fields = [
  { id: "companyName", label: "Nome da Empresa", type: "text" },
  { id: "foundationYear", label: "Ano de Fundação", type: "number" },
  { id: "industry", label: "Indústria", type: "text" },
  {
    id: "numOfEmployees",
    label: "Número de Funcionários",
    type: "number",
  },
  { id: "location", label: "Localização", type: "text" },
  { id: "mission", label: "Missão", type: "text" },
  { id: "vision", label: "Visão", type: "text" },
  { id: "values", label: "Valores", type: "text" },
  {
    id: "productsOrServices",
    label: "Produtos ou Serviços",
    type: "text",
  },
  { id: "website", label: "Website", type: "text" },
];

export default function Anamnese() {
  const router = useRouter();
  const { data } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfoSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: CompanyInfo) => {
    try {
      await saveCompanyInfo({ ...values }, data?.user?.email);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar informações:", error);
    }
  };

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <h1 className="mb-6 text-6xl font-bold">Anamnese</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded bg-white p-6 shadow"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.map(({ id, label, type }) => (
            <div key={id} className="flex flex-col">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                placeholder={label}
                {...register(id as keyof CompanyInfo)}
                className="block w-full"
              />
              {errors[id as keyof CompanyInfo] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[id as keyof CompanyInfo]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Descrição
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="block w-full rounded border-gray-300 shadow-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          disabled={!isValid} // Desativa o botão se o formulário não for válido
        >
          Salvar
        </Button>
      </form>
    </main>
  );
}
