"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Menu, X, Home, User, Briefcase, Code, Mail } from "lucide-react";

const redesSociais = [
  {
    icon: faGithub,
    link: "https://github.com/robertofmarins",
    label: "GitHub",
    color: "hover:text-gray-300"
  },
  {
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/robertofmarins/",
    label: "LinkedIn",
    color: "hover:text-blue-400"
  },
  {
    icon: faWhatsapp,
    link: "https://wa.me/+5521990034590",
    label: "WhatsApp",
    color: "hover:text-green-400"
  },
];

const navLinks = [
  { href: "#home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "#sobre", label: "Sobre", icon: <User className="w-4 h-4" /> },
  { href: "#portfolio", label: "Portfólio", icon: <Briefcase className="w-4 h-4" /> },
  { href: "#habilidades", label: "Habilidades", icon: <Code className="w-4 h-4" /> },
  { href: "#contatos", label: "Contatos", icon: <Mail className="w-4 h-4" /> },
];

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Fecha sidebar ao clicar em link ou overlay
  const closeSidebar = () => setSidebarOpen(false);

  // Detecta scroll para efeito no header mobile
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detecta seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Mobile */}
      <header className={`fixed top-0 left-0 right-0 flex items-center justify-between text-white px-5 py-4 shadow-lg md:hidden z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#23243a]/95 backdrop-blur-md border-b border-purple-500/20' 
          : 'bg-[#23243a]/80 backdrop-blur-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500/60">
            <Image
              src="/eu.png"
              alt="Roberto Marins"
              width={32}
              height={32}
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Roberto Marins
          </h1>
        </div>
        
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white p-6 flex flex-col shadow-2xl z-50 border-r border-purple-500/20
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
        style={{ minHeight: "100vh" }}
        aria-label="Menu lateral"
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4 mt-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/60 shadow-xl">
              <Image
                src="/eu.png"
                alt="Roberto Marins"
                width={96}
                height={96}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#23243a] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-tight mb-1">Roberto Marins</h2>
            <p className="text-sm text-gray-400">Full Stack Developer</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Disponível para projetos
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mb-8">
          {redesSociais.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`p-3 bg-[#23243a]/60 rounded-xl text-gray-300 ${item.color} transition-all duration-200 hover:scale-110 hover:bg-[#23243a] focus:outline-none focus:ring-2 focus:ring-purple-400`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
            </a>
          ))}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-3">
            Navegação
          </h3>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-300 hover:bg-purple-700/20 hover:text-purple-300 hover:translate-x-1'
                }`}
                onClick={closeSidebar}
              >
                <span className={`transition-colors duration-200 ${
                  isActive ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {link.icon}
                </span>
                {link.label}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer do Sidebar */}
        <div className="mt-auto pt-6 border-t border-[#35356b]/50">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Desenvolvido com</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <span>React</span>
              <span>•</span>
              <span>Next.js</span>
              <span>•</span>
              <span>Tailwind</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
