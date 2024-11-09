"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { saveCompanyInfo } from "../_actions/save-company-info";
import { toast } from "../_hooks/use-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  companyInfo: z
    .string()
    .min(10, "As informações da empresa devem ter pelo menos 10 caracteres.")
    .max(2000, "As informações da empresa não podem exceder 2000 caracteres."),
});

type AnamnesisFormData = z.infer<typeof schema>;

export default function Anamnese() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnamnesisFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AnamnesisFormData) => {
    if (!userEmail) {
      alert("Usuário não encontrado.");
      return;
    }

    try {
      await saveCompanyInfo(userEmail, data.companyInfo);
      toast({
        title: "Informações salvas com sucesso!",
        description: "As informações da sua empresa foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar informações da empresa:", error);
      toast({
        title: "Oops! Algo deu errado.",
        description:
          "Houve algum problema ao salvar as informações da empresa.",
      });
    } finally {
      router.push("/dashboard");
    }
  };

  return (
    <main className="h-screen w-full p-4">
      <h1 className="mb-4 text-2xl font-bold">Anamnese</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label htmlFor="companyInfo" className="text-lg font-medium">
          Informações da Empresa
        </label>

        <textarea
          id="companyInfo"
          rows={5}
          {...register("companyInfo")}
          className="rounded border p-2"
          placeholder="Insira informações detalhadas sobre a empresa"
        />
        {errors.companyInfo && (
          <p className="text-red-500">{errors.companyInfo.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </main>
  );
}
