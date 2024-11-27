import CompanyInfoForm from "./company-info-form";

export default function Anamnese() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Antes de tudo...
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Precisamos de alguns dados sobre sua empresa, isso tornará melhor e
            mais personalizada a sua experiência ao usar nossas ferramentas.
          </p>
        </header>

        <CompanyInfoForm />
      </main>
    </div>
  );
}
