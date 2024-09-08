import { useState, useEffect } from "react";

const Loader = () => {
  const tips = [
    "Did you know? Using keyboard shortcuts can save you tons of time!",
    "Tip: Always backup your important data.",
    "Fun fact: You can undo almost anything with Ctrl+Z!",
    "Remember: Regular breaks improve productivity.",
    "Pro Tip: Use strong passwords to protect your accounts.",
  ];

  const [currentTip, setCurrentTip] = useState("");

  useEffect(() => {
    // Escolhe uma dica aleatória do array sempre que o loader for montado
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-card">
      <div className="mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-white"></div>
      <p className="mt-4 text-center text-white">{currentTip}</p>
    </div>
  );
};

export default Loader;
