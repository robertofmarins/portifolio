"use client";

import React, { useEffect, useState } from "react";
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin,
  ExternalLink,
  Code2,
  Sparkles
} from "lucide-react";

const messages = [
  "Olá, sou desenvolvedor Full Stack",
  "Hi, I'm a Full Stack Developer",
  "Criando experiências digitais incríveis",
  "Building amazing digital experiences",
  "Especialista em React e Node.js",
  "Transformando ideias em código"
];

export default function HomeSection() {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
  let timeout: number;
  const currentMessage = messages[msgIndex];

  if (!deleting && charIndex < currentMessage.length) {
    timeout = window.setTimeout(() => {
      setCharIndex((prev) => prev + 1);
      setText(currentMessage.substring(0, charIndex + 1));
    }, 80);
  } else if (deleting && charIndex > 0) {
    timeout = window.setTimeout(() => {
      setCharIndex((prev) => prev - 1);
      setText(currentMessage.substring(0, charIndex - 1));
    }, 40);
  } else if (!deleting && charIndex === currentMessage.length) {
    timeout = window.setTimeout(() => setDeleting(true), 2000);
  } else if (deleting && charIndex === 0) {
    timeout = window.setTimeout(() => {
      setDeleting(false);
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 500);
  }

  return () => clearTimeout(timeout);
}, [charIndex, deleting, msgIndex]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#sobre, #portfolio, #habilidades, #contatos');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      {/* Background Overlay Melhorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#1E293B]/85 to-[#0F172A]/95" />
      
      {/* Elementos Decorativos Modernos */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#38BDF8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#22D3EE]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#38BDF8]/10 to-[#22D3EE]/10 rounded-full blur-3xl" />
      </div>

      {/* Padrão de Pontos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #38BDF8 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge de Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Disponível para projetos
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Título Principal Melhorado */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Roberto Marins
          </span>
        </h1>

        {/* Typewriter Melhorado */}
        <div className="mb-8 h-16 sm:h-20 flex items-center justify-center">
          <p className="text-lg sm:text-xl lg:text-2xl text-[#94A3B8] font-mono">
            <span className="border-r-2 border-[#22D3EE] pr-1 animate-pulse">
              {text}
            </span>
          </p>
        </div>

        {/* Descrição Adicional */}
        <p className="text-[#94A3B8] text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Desenvolvedor apaixonado por criar soluções digitais inovadoras e experiências de usuário excepcionais
        </p>

        {/* Botões de Ação Melhorados */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#contatos"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-[#0F172A] font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-[#38BDF8]/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
          >
            <Mail className="w-5 h-5" />
            Fale comigo
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 bg-[#23243a]/50 backdrop-blur-sm border border-[#38BDF8]/30 text-[#94A3B8] font-bold px-8 py-4 rounded-xl hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
          >
            <Code2 className="w-5 h-5" />
            Ver projetos
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Links Sociais */}
        <div className="lg:hidden flex justify-center gap-6 mb-12">
          <a
            href="https://github.com/robertofmarins"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#23243a]/50 backdrop-blur-sm border border-[#38BDF8]/30 rounded-xl text-[#94A3B8] hover:text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/robertofmarins/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#23243a]/50 backdrop-blur-sm border border-[#38BDF8]/30 rounded-xl text-[#94A3B8] hover:text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:contato@robertomarins.com.br"
            className="p-3 bg-[#23243a]/50 backdrop-blur-sm border border-[#38BDF8]/30 rounded-xl text-[#94A3B8] hover:text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Localização */}
        <div className="flex items-center justify-center gap-2 text-[#94A3B8] mb-8">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Rio de Janeiro, Brasil</span>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 md:bottom-20 left-1/2 transform -translate-x-1/2 p-2 text-[#94A3B8] hover:text-white transition-colors duration-300 animate-bounce focus:outline-none focus:ring-2 focus:ring-[#38BDF8] rounded-full"
        aria-label="Rolar para próxima seção"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}