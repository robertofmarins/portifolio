"use client";

import React, { useEffect, useState } from "react";

const messages = [
  "Olá, sou desenvolvedor Full Stack",
  "Hi, I'm a Full Stack Developer",
];

export default function HomeSection() {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentMessage = messages[msgIndex];

    if (!deleting && charIndex < currentMessage.length) {
      // Escrevendo texto
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
        setText(currentMessage.substring(0, charIndex + 1));
      }, 50);
    } else if (deleting && charIndex > 0) {
      // Apagando texto
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
        setText(currentMessage.substring(0, charIndex - 1));
      }, 50);
    } else if (!deleting && charIndex === currentMessage.length) {
      // Pausa depois de escrever toda a frase antes de apagar
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex === 0) {
      // Troca de mensagem e começa a digitar de novo
      timeout = setTimeout(() => {
        setDeleting(false);
        setMsgIndex((prev) => (prev + 1) % messages.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, msgIndex]);

  return (
    <section
      id="home"
      className="w-full h-screen flex flex-col justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      <div className="pb-50 md:pb-0">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white ml-3">Roberto Marins</h1>
        <p className="text-xl md:text-2xl typewriter-text text-white ml-3 min-h-[2.5rem]">{text}</p>
      </div>
    </section>
  );
}
