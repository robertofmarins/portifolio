"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function CurriculoHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Portfólio
      </Link>
      
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
      >
        <Printer className="w-5 h-5" />
        Imprimir / Salvar PDF
      </button>
    </div>
  );
}
