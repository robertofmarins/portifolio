"use client";

import Image from "next/image";
import { ExternalLink, Github, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const projetos = [
  {
    id: 5,
    titulo: "ChamaKi — ERP & Vendas Multi-Tenant",
    descricao:
      "Plataforma SaaS multi-tenant completa para gestão de estoques, catalogação de produtos e vendas em tempo real. Implementa Row Level Security (RLS) para total isolamento de dados de inquilinos e integração completa com gateway de pagamento Asaas.",
    imagem: "/chamaki.webp",
    link: "https://www.chamaki.app",
    github: "#",
    tecnologias: ["Next.js", "TypeScript", "Supabase", "Drizzle ORM", "Tailwind CSS"],
    status: "Concluído",
    ano: "2026",
  },
  {
    id: 1,
    titulo: "TMS Engenharia",
    descricao:
      "Landing page responsiva moderna com design profissional e otimizada para conversão.",
    imagem: "/tms.webp",
    link: "https://site-tms.vercel.app/",
    github: "#",
    tecnologias: ["React", "TypeScript", "Tailwind CSS"],
    status: "Concluído",
    ano: "2025",
  },
  {
    id: 4,
    titulo: "Paraiso Design — Loja de Móveis",
    descricao:
      "Website profissional desenvolvido para a loja de móveis Paraiso Design. Apresenta o catálogo completo de produtos com layout moderno, responsivo e otimizado para desempenho e SEO. Desenvolvido com Next.js, TypeScript e Tailwind CSS, garantindo alta performance e fácil manutenção.",
    imagem: "/paraisodesign.webp",
    link: "https://www.paraisodesign.com.br",
    github: "#",
    tecnologias: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Concluído",
    ano: "2025",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="border-t border-[#35356b]/50 bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Meus Projetos
            </span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Uma seleção dos meus trabalhos mais recentes, desde landing pages
            até aplicações verídicas e completas
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((projeto, index) => (
            <motion.div
              key={projeto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group flex flex-col justify-between bg-gradient-to-br from-[#202136] to-[#151627] rounded-2xl shadow-xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/30 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.08)]"
            >
              {/* Cabeçalho */}
              <div className="relative h-12 flex justify-between items-center px-4 border-b border-slate-800/40">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    projeto.status === "Concluído"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : projeto.status === "Em desenvolvimento"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {projeto.status}
                </span>
                <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs text-gray-300 flex items-center gap-1.5 border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {projeto.ano}
                </span>
              </div>

              {/* Imagem proporcional 16:9 sem cortes */}
              <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden bg-black/20">
                <Image
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#181824]/20 to-transparent" />
              </div>

              {/* Conteúdo flexível */}
              <div className="flex flex-col flex-1 justify-between p-5">
                <div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight min-h-[3rem]">
                    {projeto.titulo}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {projeto.descricao}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projeto.tecnologias.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-800/40 text-slate-300 rounded-lg text-xs font-medium border border-slate-700/30 flex items-center gap-1 hover:border-cyan-500/20 hover:text-white transition-colors duration-200"
                      >
                        <Tag className="w-3 h-3 text-cyan-400" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões no final fixo */}
                <div className="flex gap-3 mt-auto pt-2">
                  {projeto.link !== "#" ? (
                    <a
                      href={projeto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 group/btn bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Projeto
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <div className="flex-1 bg-slate-800/40 text-slate-500 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-white/5">
                      <ExternalLink className="w-4 h-4" />
                      Em breve
                    </div>
                  )}

                  {projeto.github !== "#" && (
                    <a
                      href={projeto.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800/40 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl border border-slate-700/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <p className="text-gray-400 mb-6">
            Gostou do que viu? Vamos trabalhar juntos!
          </p>
          <a
            href="#contatos"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 group"
          >
            Iniciar Projeto
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
