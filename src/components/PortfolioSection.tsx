"use client";

import Image from 'next/image';
import { ExternalLink, Github, Calendar, Tag, ArrowRight } from 'lucide-react';

const projetos = [
  {
    id: 1,
    titulo: "TMS Engenharia",
    descricao: "Landing page responsiva moderna com design profissional e otimizada para conversão.",
    imagem: "/tms.png",
    link: "https://tms.robertomarins.com.br/",
    github: "#",
    tecnologias: ["React", "TypeScript", "Tailwind CSS"],
    status: "Concluído",
    ano: "2025"
  },
  {
    id: 2,
    titulo: "Sistema de Cadastro e Login CRUD",
    descricao: "Sistema completo de autenticação com Next.js que permite cadastro, login, listagem e exclusão de usuários. Utiliza Prisma para modelagem e acesso ao banco de dados PostgreSQL, bcrypt para hash seguro das senhas e JSON Web Tokens (JWT) para autenticação via token. A interface é responsiva e moderna, construída com React e estilizada com Tailwind CSS, garantindo uma ótima experiência para o usuário. O sistema também implementa controle de acesso CORS para segurança e suporta operações CRUD básicas no usuário.",
    imagem: "/login.png",
    link: "https://login.robertomarins.com.br",
    github: "#",
    tecnologias: [
  "Next.js",
  "Prisma",
  "PostgreSQL",
  "bcryptjs",
  "jsonwebtoken",
  "Tailwind CSS",
  "TypeScript"
],
    status: "Concluído",
    ano: "2025"
  },
  {
    id: 3,
    titulo: "Portfólio Interativo",
    descricao: "Portfólio pessoal com animações avançadas, tema dark/light e performance otimizada.",
    imagem: "/projeto3.jpg",
    link: "#",
    github: "#",
    tecnologias: ["React", "Next.js", "Tailwind"],
    status: "Em desenvolvimento",
    ano: "2024"
  },
  {
    id: 4,
    titulo: "E-commerce Moderno",
    descricao: "Plataforma de e-commerce completa com carrinho, pagamentos e painel administrativo.",
    imagem: "/projeto4.jpg",
    link: "#",
    github: "#",
    tecnologias: ["React", "Node.js", "MongoDB"],
    status: "Planejado",
    ano: "2024"
  }
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
            Uma seleção dos meus trabalhos mais recentes, desde landing pages até aplicações full-stack complexas
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {projetos.map((projeto) => (
            <div
              key={projeto.id}
              className="group bg-gradient-to-br from-[#23243a]/90 to-[#1a1b2e]/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20"
            >

              <div className="h-10">
                {/* Status Badge */}
                <div className="absolute top-2 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    projeto.status === 'Concluído' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : projeto.status === 'Em desenvolvimento'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {projeto.status}
                  </span>
                </div>
                {/* Ano */}
                <div className="absolute top-2 right-4">
                  <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {projeto.ano}
                  </span>
                </div>
              </div>


              {/* Imagem do Projeto */}
              <div className="relative w-full h-56 md:h-48 overflow-hidden">
                <Image
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4 flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {projeto.titulo}
                </h2>
                
                <p className="text-gray-300 mb-3 flex-grow leading-relaxed">
                  {projeto.descricao}
                </p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 mb-3">
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

                {/* Botões de Ação */}
                <div className="flex gap-3 mt-auto">
                  {projeto.link !== "#" ? (
                    <a
                      href={projeto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 group/btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                      className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      aria-label="Ver código no GitHub"
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
          <p className="text-gray-400 mb-6">Gostou do que viu? Vamos trabalhar juntos!</p>
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
