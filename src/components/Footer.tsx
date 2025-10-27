"use client";

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Heart,
  ExternalLink,
  ArrowUp,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/robertofmarins",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/robertofmarins/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:contato@robertomarins.com.br",
      label: "Email",
      color: "hover:text-cyan-400",
    },
  ];

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#sobre", label: "Sobre" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#contatos", label: "Contatos" },
  ];

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
  ];

  return (
    <footer className="border-t border-[#35356b]/50 pt-8 bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Seção Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Sobre */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Roberto Marins
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Desenvolvedor Full Stack apaixonado por criar soluções digitais
              inovadoras. Transformando ideias em código e código em
              experiências excepcionais.
            </p>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Tecnologias Principais
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#23243a]/60 border border-purple-500/30 rounded-full text-xs text-gray-300 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-3 bg-[#23243a]/60 border border-purple-500/30 rounded-xl text-gray-400 ${social.color} hover:border-purple-400/50 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-400" />
              Navegação
            </h3>
            <nav className="space-y-3">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-purple-300 hover:translate-x-2 transition-all duration-200 focus:outline-none focus:text-purple-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Telefone</p>
                  <a
                    href="tel:+5521990034590"
                    className="text-gray-300 hover:text-cyan-300 transition-colors"
                  >
                    (21) 99003-4590
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a
                    href="mailto:contato@robertomarins.com.br"
                    className="text-gray-300 hover:text-cyan-300 transition-colors break-all"
                  >
                    contato@robertomarins.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Localização</p>
                  <p className="text-gray-300">Rio de Janeiro, Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outros Serviços */}
        <div className="border-t border-[#35356b]/50 pt-12 pb-12 mt-12">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
            Outros Serviços
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-300">
            {/* Infraestrutura Digital */}
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3">
                🧩 Infraestrutura Digital
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.notion.so/Registro-de-Dom-nio-2968a6be023b80908e3af9f310fb6da9?pvs=21"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    🌐 Registro de Domínio
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Consultoria-em-Hospedagem-de-Sites-2968a6be023b80f4a690c066f29170e0?pvs=21"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    🖥️ Consultoria em Hospedagem
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Consultoria-de-E-mail-Corporativo-2968a6be023b8089b9d2e131af4a9fe3?pvs=21"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    📧 E-mail Corporativo
                  </a>
                </li>
              </ul>
            </div>

            {/* Desenvolvimento e Design */}
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">
                💻 Desenvolvimento e Design
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.notion.so/Identidade-Visual-2968a6be023b80eeb7ddfd8d635596a8?pvs=21"
                    className="hover:text-purple-300 transition-colors"
                  >
                    🎨 Identidade Visual
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Desenvolvimento-de-Sites-2968a6be023b80c3a3f9ef769c53d876?pvs=21"
                    className="hover:text-purple-300 transition-colors"
                  >
                    💻 Desenvolvimento de Sites
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Material-Gr-fico-via-gr-fica-parceira-2968a6be023b8007ac3dd04498b01a64?pvs=21"
                    className="hover:text-purple-300 transition-colors"
                  >
                    🖨️ Material Gráfico
                  </a>
                </li>
              </ul>
            </div>

            {/* Marketing Digital */}
            <div>
              <h4 className="text-pink-400 font-semibold mb-3">
                📢 Marketing Digital
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.notion.so/Gest-o-de-M-dias-Sociais-2968a6be023b80dbac56d89a9c7f06c4?pvs=21"
                    className="hover:text-pink-300 transition-colors"
                  >
                    📱 Gestão de Mídias
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Cria-o-de-An-ncios-Online-Tr-fego-Pago-2968a6be023b802e92a9d1702959737a?pvs=21"
                    className="hover:text-pink-300 transition-colors"
                  >
                    🎯 Tráfego Pago
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/Perfil-de-Empresa-Google-Meu-Neg-cio-2968a6be023b80e58246f91569a8e064?pvs=21"
                    className="hover:text-pink-300 transition-colors"
                  >
                    📍 Google Meu Negócio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-[#35356b]/50 pt-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear} Roberto Marins. Feito com</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>e muito</span>
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>

          {/* Status e Botão Voltar ao Topo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Disponível para projetos</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
