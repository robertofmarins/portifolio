"use client";

import { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Cada ícone agora é o objeto real importado
  const redeSocial = [
    {
      icon: faGithub,
      link: "https://github.com/robertofmarins",
    },
    {
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/robertofmarins/",
    },
    {
      icon: faWhatsapp,
      link: "https://wa.me/+5521990034590",
    },
  ];

  return (
    <>
      {/* Header sempre visível no mobile */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-900 text-white p-4 md:hidden z-40">
        <h1 className="text-xl font-semibold">Roberto Marins</h1>
        <button onClick={toggleSidebar} className="text-2xl">
          {sidebarOpen ? "×" /* ou &#x2715; */ : "☰" /* ou &#9776; */}
        </button>
      </header>

      {/* Sidebar móvel */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 space-y-6 transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Conteúdo do Sidebar */}
        <div className="flex flex-col items-center space-y-2 mt-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-600">
            <Image
              src="/eu.png"
              alt="Minha Foto"
              width={96}
              height={96}
              className="rounded-full border-4 border-gray-600 object-cover"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Roberto Marins</h2>
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          {redeSocial.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-orange-500 text-3xl mx-2"
            >
              <FontAwesomeIcon icon={item.icon} />
            </a>
          ))}
        </div>

        <nav className="mt-8 space-y-4">
          <a href="#home" className="block hover:bg-gray-700 p-2 rounded">
            Home
          </a>
          <a href="#sobre" className="block hover:bg-gray-700 p-2 rounded">
            Sobre
          </a>
          <a href="#portfolio" className="block hover:bg-gray-700 p-2 rounded">
            Portfólio
          </a>
          <a
            href="#habilidades"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Habilidades
          </a>
          <a href="#contatos" className="block hover:bg-gray-700 p-2 rounded">
            Contatos
          </a>
        </nav>
      </aside>
    </>
  );
}
