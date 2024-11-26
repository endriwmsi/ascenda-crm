import { useState, useEffect, useMemo } from "react";

const Loader = () => {
  const tips = useMemo(
    () => [
      "Invista em conteúdo de qualidade para engajar sua audiência e melhorar seu SEO.",
      "Consistência é fundamental: publique regularmente em suas redes sociais.",
      "Use ferramentas de análise para acompanhar o desempenho das suas campanhas e ajustar estratégias.",
      "O e-mail marketing continua sendo eficaz! Construa e cuide da sua lista de assinantes.",
      "Um bom call-to-action (CTA) pode aumentar significativamente suas conversões.",
      "Conte histórias para tornar sua marca mais memorável e emocionalmente conectada ao público.",
      "Conheça seu público-alvo: entenda suas necessidades e preferências.",
      "Em caso de dúvidas, consulte um profissional ou utilize nosso chatbot integrado para orientações!",
    ],
    [],
  );

  const [currentTip, setCurrentTip] = useState("");

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  }, [tips]);

  return (
    <div className="inset-0 z-50 flex h-screen flex-col items-center justify-center bg-background">
      <div className="flex items-center justify-center space-x-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-white"></div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-100">{currentTip}</p>
    </div>
  );
};

export default Loader;
