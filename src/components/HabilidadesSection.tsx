"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs, faPython } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';

// Cada ícone agora é o objeto real importado
const habilidadesData = [
  {
    icon: faHtml5,
    title: "HTML",
    descricao: "HTML é a linguagem de marcação usada para estruturar páginas na web.",
  },
  {
    icon: faCss3Alt,
    title: "CSS",
    descricao: "CSS é a linguagem de estilo usada para definir a aparência das páginas web.",
  },
  {
    icon: faJs,
    title: "JavaScript",
    descricao: "JavaScript é a linguagem de programação usada para tornar páginas web interativas.",
  },
  {
    icon: faPython,
    title: "Python",
    descricao: "Python é uma linguagem de programação versátil, usada para web, ciência de dados, automações e muito mais.",
  },
];

export default function HabilidadesSection() {
  const [descricao, setDescricao] = useState("Clique em uma habilidade para ver a descrição.");

  return (
    <section
      id="habilidades"
      className="min-h-screen w-full flex flex-col items-center justify-around bg-gray-600 text-white overflow-hidden scroll-mt-14 md:scroll-mt-0"
    >
      <h1 className="text-5xl font-bold mt-3 md:mt-0">Habilidades</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {habilidadesData.map(({ icon, title, descricao: desc }) => (
          <div
            key={title}
            className="flex flex-col justify-center items-center w-28 h-28 transition-colors duration-300 hover:text-amber-400 cursor-pointer"
            onClick={() => setDescricao(desc)}
          >
            <FontAwesomeIcon icon={icon} className="text-5xl" />
            <span className="mt-2 text-xl">{title}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 w-70 h-25 p-3 flex items-center justify-center text-center rounded-lg mt-6">
        <p>{descricao}</p>
      </div>
    </section>
  );
}
