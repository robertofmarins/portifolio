'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faPython,
  faGitAlt,
  faReact,
  faNode,
  faDocker,
} from '@fortawesome/free-brands-svg-icons';
import React, { useState, ReactElement } from 'react';
import { Code, Database, Globe, Server, Zap, Star } from 'lucide-react';

const habilidadesData = [
  {
    icon: faHtml5,
    title: 'HTML5',
    categoria: 'Frontend',
    nivel: 95,
    descricao: 'HTML5 é a linguagem de marcação moderna usada para estruturar páginas web com elementos semânticos e recursos avançados.',
    cor: '#E34F26'
  },
  {
    icon: faCss3Alt,
    title: 'CSS3',
    categoria: 'Frontend',
    nivel: 90,
    descricao: 'CSS3 com Flexbox, Grid, animações e responsive design para criar interfaces modernas e atrativas.',
    cor: '#1572B6'
  },
  {
    icon: faJs,
    title: 'JavaScript',
    categoria: 'Frontend',
    nivel: 88,
    descricao: 'JavaScript ES6+ para criar interações dinâmicas, manipular DOM e desenvolver aplicações web modernas.',
    cor: '#F7DF1E'
  },
  {
    icon: faReact,
    title: 'React',
    categoria: 'Frontend',
    nivel: 85,
    descricao: 'React com Hooks, Context API e Next.js para construir interfaces de usuário reativas e performáticas.',
    cor: '#61DAFB'
  },
  {
    icon: faNode,
    title: 'Node.js',
    categoria: 'Backend',
    nivel: 80,
    descricao: 'Node.js para desenvolvimento de APIs REST, servidores web e aplicações backend escaláveis.',
    cor: '#339933'
  },
  {
    icon: faPython,
    title: 'Python',
    categoria: 'Backend',
    nivel: 82,
    descricao: 'Python para desenvolvimento web, automação, análise de dados e integração com bancos de dados.',
    cor: '#3776AB'
  },
  {
    icon: faGitAlt,
    title: 'Git',
    categoria: 'Ferramentas',
    nivel: 90,
    descricao: 'Git e GitHub para controle de versão, colaboração em equipe e deploy automatizado de projetos.',
    cor: '#F05032'
  },
  {
    icon: faDocker,
    title: 'Docker',
    categoria: 'DevOps',
    nivel: 75,
    descricao: 'Docker para containerização de aplicações, criação de ambientes isolados e deploy em produção.',
    cor: '#2496ED'
  },
];

const categorias = ['Todas', 'Frontend', 'Backend', 'Ferramentas', 'DevOps'];

const getCategoriaIcon = (categoria: string): ReactElement => {
  switch (categoria) {
    case "Frontend":
      return <Globe className="w-4 h-4" />;
    case "Backend":
      return <Server className="w-4 h-4" />;
    case "Ferramentas":
      return <Code className="w-4 h-4" />;
    case "DevOps":
      return <Database className="w-4 h-4" />;
    default:
      return <Star className="w-4 h-4" />;
  }
};

export default function HabilidadesSection() {
  const [descricao, setDescricao] = useState('Clique em uma habilidade para ver detalhes e nível de proficiência.');
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const habilidadesFiltradas = categoriaAtiva === 'Todas' 
    ? habilidadesData 
    : habilidadesData.filter(h => h.categoria === categoriaAtiva);

  return (
    <section
      id="habilidades"
      className="border-t border-[#35356b]/50 pt-8 min-h-screen bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] px-4 py-20 flex flex-col items-center justify-center relative"
    >
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 max-w-7xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Habilidades
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tecnologias e ferramentas que domino para criar soluções completas e eficientes
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaAtiva(categoria)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                categoriaAtiva === categoria
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-[#23243a]/70 text-gray-300 hover:bg-purple-600/20 hover:text-purple-300'
              }`}
            >
              {getCategoriaIcon(categoria)}
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de Habilidades */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {habilidadesFiltradas.map((habilidade) => (
            <button
              key={habilidade.title}
              onClick={() => {
                setDescricao(habilidade.descricao);
                setSelecionada(habilidade.title);
              }}
              className={`group flex flex-col items-center justify-center space-y-4 rounded-2xl py-8 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 relative overflow-hidden ${
                selecionada === habilidade.title
                  ? 'bg-gradient-to-br from-purple-700/40 to-indigo-700/30 shadow-xl scale-105 text-purple-300 border border-purple-400/50'
                  : 'bg-[#23243a]/70 hover:bg-purple-800/20 hover:scale-105 text-gray-300 hover:text-purple-300 border border-transparent hover:border-purple-500/30'
              }`}
              aria-label={`Mostrar descrição de ${habilidade.title}`}
            >
              {/* Barra de Progresso de Fundo */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
                  style={{ 
                    width: selecionada === habilidade.title ? `${habilidade.nivel}%` : '0%',
                  }}
                />
              </div>

              <FontAwesomeIcon
                icon={habilidade.icon}
                className={`text-5xl md:text-6xl transition-all duration-300 ${
                  selecionada === habilidade.title
                    ? 'drop-shadow-lg scale-110'
                    : 'group-hover:scale-110'
                }`}
                style={{ 
                  color: selecionada === habilidade.title ? habilidade.cor : undefined 
                }}
              />
              
              <div className="text-center">
                <span className="text-lg md:text-xl font-semibold tracking-wide block">
                  {habilidade.title}
                </span>
                <span className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                  {getCategoriaIcon(habilidade.categoria)}
                  {habilidade.categoria}
                </span>
              </div>

              {/* Indicador de Nível */}
              {selecionada === habilidade.title && (
                <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {habilidade.nivel}%
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Área de Descrição Melhorada */}
        <div className="bg-gradient-to-br from-[#23243a]/90 to-[#1a1b2e]/90 backdrop-blur-sm max-w-4xl w-full mx-auto rounded-2xl p-8 md:p-10 shadow-2xl text-center border border-purple-500/20 min-h-[140px] flex items-center justify-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-400 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Detalhes da Tecnologia</span>
            </div>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
              {descricao}
            </p>
            {selecionada && (
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Nível: {habilidadesData.find(h => h.title === selecionada)?.nivel}%
                </span>
                <span className="flex items-center gap-1">
                  {getCategoriaIcon(habilidadesData.find(h => h.title === selecionada)?.categoria ?? '')}
                  {habilidadesData.find(h => h.title === selecionada)?.categoria}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
