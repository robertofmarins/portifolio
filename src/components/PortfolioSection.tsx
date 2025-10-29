"use client";

import Image from "next/image";
import { ExternalLink, Github, Calendar, Tag, ArrowRight } from "lucide-react";

const projetos = [
  {
    id: 1,
    titulo: "TMS Engenharia",
    descricao:
      "Landing page responsiva moderna com design profissional e otimizada para conversão.",
    imagem: "/construção.jpg",
    link: "https://tms.robertomarins.com.br/",
    github: "#",
    tecnologias: ["React", "TypeScript", "Tailwind CSS"],
    status: "Concluído",
    ano: "2025",
  },
  {
    id: 2,
    titulo: "Sistema de Cadastro e Login CRUD",
    descricao:
      "Sistema completo de autenticação com cadastro, login, listagem e exclusão de usuários. Inclui hash seguro de senhas, autenticação por token e controle de acesso para segurança. Interface moderna, responsiva e fácil de usar, com operações CRUD básicas para usuários.",
    imagem: "/login.png",
    link: "https://login.robertomarins.com.br/",
    github: "#",
    tecnologias: ["Next.js", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    status: "Concluído",
    ano: "2025",
  },
  {
    id: 3,
    titulo: "Portfólio Interativo",
    descricao:
      "Portfólio pessoal com animações avançadas, tema dark/light e performance otimizada.",
    imagem: "/construção.jpg",
    link: "https://chamai.vercel.app",
    github: "#",
    tecnologias: ["React", "Next.js", "Tailwind"],
    status: "Em desenvolvimento",
    ano: "2024",
  },
  {
  id: 4,
  titulo: "Paraiso Design — Loja de Móveis",
  descricao:
    "Website profissional desenvolvido para a loja de móveis Paraiso Design. Apresenta o catálogo completo de produtos com layout moderno, responsivo e otimizado para desempenho e SEO. Desenvolvido com Next.js, TypeScript e Tailwind CSS, garantindo alta performance e fácil manutenção.",
  imagem: "/construção.jpg",
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
      className="border-t border-[#35356b]/50 pt-8 min-h-screen w-full bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white px-4 py-10 flex flex-col items-center relative overflow-hidden"
    >
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Header da Seção */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Meus Projetos
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Uma seleção dos meus trabalhos mais recentes, desde landing pages
            até aplicações full-stack complexas
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {projetos.map((projeto) => (
            <div
              key={projeto.id}
              className="group flex flex-col justify-between h-[520px] bg-gradient-to-br from-[#23243a]/90 to-[#1a1b2e]/90
  backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20
  hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20"
            >
              {/* Cabeçalho */}
              <div className="relative h-10 flex justify-between items-center px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    projeto.status === "Concluído"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : projeto.status === "Em desenvolvimento"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {projeto.status}
                </span>
                <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs text-gray-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {projeto.ano}
                </span>
              </div>

              {/* Imagem fixa */}
              <div className="relative w-full h-[180px] flex-shrink-0 overflow-hidden bg-black">
                {projeto.link !== "#" ? (
                  <iframe
                    src={projeto.link}
                    className="absolute top-1/2 left-1/2 w-[1920px] h-[1080px]
        -translate-x-1/2 -translate-y-1/2 scale-[0.25] origin-center"
                    style={{ pointerEvents: "none" }}
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts allow-popups"
                  />
                ) : (
                  <Image
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Conteúdo flexível */}
              <div className="flex flex-col flex-1 justify-between p-4">
                <div>
                  <h2
  className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300
  line-clamp-2 leading-tight min-h-[3rem]"
>
  {projeto.titulo}
</h2>



                  <div
                    className="mb-3 overflow-y-auto max-h-[4.5rem] pr-1
        [scrollbar-width:thin] [scrollbar-color:#7e22ce_#1e1e2f]
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-[#1e1e2f]
        [&::-webkit-scrollbar-thumb]:bg-gradient-to-b from-purple-600 to-indigo-600
        [&::-webkit-scrollbar-thumb]:rounded-full"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {projeto.descricao}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30 flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões no final fixo */}
                <div className="flex gap-3 mt-4 justify-end">
                  {projeto.link !== "#" ? (
                    <a
                      href={projeto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 group/btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Projeto
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <div className="flex-1 bg-gray-600/50 text-gray-400 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                      <ExternalLink className="w-4 h-4" />
                      Em breve
                    </div>
                  )}

                  {projeto.github !== "#" && (
                    <a
                      href={projeto.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
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
