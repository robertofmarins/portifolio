import fs from "fs";
import path from "path";
import CurriculoHeader from "@/components/CurriculoHeader";

export default function CurriculoPage() {
  // Ler o arquivo curriculo.md dinamicamente
  const filePath = path.join(process.cwd(), "curriculo.md");
  const mdContent = fs.readFileSync(filePath, "utf-8");

  // Parser customizado e robusto de Markdown para React
  const parseMarkdownToJSX = (md: string) => {
    const lines = md.split("\n");
    const elements: React.ReactNode[] = [];

    // Helper para converter tags inline (**bold**, *italic*, [link](url))
    const parseInline = (text: string) => {
      let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Negrito: **texto**
      html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

      // Itálico: *texto*
      html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

      // Links: [texto](url)
      html = html.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline print:text-black font-semibold">$1</a>'
      );

      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    };

    let inList = false;
    let listItems: string[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${key}`}
            className="list-disc list-outside pl-4 space-y-1 text-slate-300 text-sm print:text-black print:text-xs print:space-y-0.5 mb-4 print:mb-1.5"
          >
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Ignorar linhas vazias no processamento de listas, mas fechar lista se necessário
      if (line === "") {
        if (inList) {
          inList = false;
          flushList(i);
        }
        continue;
      }

      // Detectar Listas
      if (line.startsWith("* ")) {
        inList = true;
        listItems.push(line.substring(2));
        continue;
      } else {
        if (inList) {
          inList = false;
          flushList(i);
        }
      }

      // Divisor (---)
      if (line === "---") {
        elements.push(
          <hr
            key={i}
            className="border-slate-800 my-5 print:border-slate-300 print:my-1.5"
          />
        );
        continue;
      }

      // Título H1 (# Nome)
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={i}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent print:text-black print:bg-none print:text-2xl print:font-bold print:mb-0"
          >
            {line.substring(2)}
          </h1>
        );
        continue;
      }

      // Subtítulo em Negrito (**Cargo**) na linha inicial
      if (line.startsWith("**") && line.endsWith("**") && i < 3) {
        elements.push(
          <p
            key={i}
            className="text-lg sm:text-xl font-semibold text-cyan-400 mt-1 print:text-black print:text-[13px] print:font-medium print:mt-0"
          >
            {line.replace(/\*\*/g, "")}
          </p>
        );
        continue;
      }

      // Seção H2 (## Nome Seção)
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-lg font-bold text-white mb-2.5 mt-4 print:text-black print:text-xs print:font-bold print:mb-1 print:mt-2 uppercase tracking-wider"
          >
            {line.substring(3)}
          </h2>
        );
        continue;
      }

      // Subseção H3 (### Cargo | Data)
      if (line.startsWith("### ")) {
        const content = line.substring(4);
        const lastPipeIndex = content.lastIndexOf("|");
        let title = "";
        let date = "";

        if (lastPipeIndex !== -1) {
          title = content.substring(0, lastPipeIndex).trim();
          date = content.substring(lastPipeIndex + 1).trim();
        } else {
          title = content.trim();
        }

        elements.push(
          <div
            key={i}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 mt-3 print:flex-row print:justify-between print:mb-0 print:mt-1"
          >
            <h3 className="text-base font-bold text-slate-200 print:text-black print:text-xs">
              {parseInline(title)}
            </h3>
            {date && (
              <span className="text-xs text-cyan-400 print:text-black print:text-xs print:font-semibold">
                {parseInline(date)}
              </span>
            )}
          </div>
        );
        continue;
      }

      // Blocos de Informações de Contato nas primeiras linhas
      if (i < 8 && line.includes("|")) {
        const parts = line.split("|");
        elements.push(
          <div
            key={i}
            className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-slate-400 text-sm print:text-black print:text-[11px] print:mt-0 print:gap-x-2.5 mt-1.5"
          >
            {parts.map((part, index) => (
              <div key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-slate-700 print:text-slate-400 no-print">|</span>
                )}
                {parseInline(part.trim())}
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Parágrafos Normais (como o Resumo Profissional)
      elements.push(
        <p
          key={i}
          className="text-slate-300 text-sm leading-relaxed text-justify mb-3 print:text-black print:text-xs print:leading-normal print:mb-1.5"
        >
          {parseInline(line)}
        </p>
      );
    }

    // Fechar qualquer lista pendente ao fim do arquivo
    if (inList) {
      flushList(lines.length);
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0 print:min-h-0">
      {/* Estilos CSS para Impressão Fina A4 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Esconder elementos que não devem ser impressos */
          .no-print {
            display: none !important;
          }

          /* Forçar cores pretas e fundo branco */
          body {
            background-color: white !important;
            color: black !important;
            font-family: ui-sans-serif, system-ui, sans-serif !important;
          }

          /* Resetar container do currículo */
          .print-container {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            color: black !important;
          }

          /* Cor dos links e divisores na impressão */
          h1,
          h2,
          h3,
          p,
          span,
          li,
          a,
          strong,
          em {
            color: black !important;
          }

          hr {
            border-color: #e5e7eb !important;
            margin-top: 0.4rem !important;
            margin-bottom: 0.4rem !important;
          }

          /* Margens da página A4 */
          @page {
            size: A4;
            margin: 0.6cm 1cm;
          }
        }
      `}} />

      {/* Barra de Ações (Escondida na Impressão) */}
      <CurriculoHeader />

      {/* Corpo do Currículo (Renderizado Dinamicamente do MD) */}
      <main className="print-container max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-2xl rounded-2xl p-8 sm:p-12 print:border-none print:shadow-none print:bg-transparent print:p-0">
        {parseMarkdownToJSX(mdContent)}
      </main>
    </div>
  );
}
