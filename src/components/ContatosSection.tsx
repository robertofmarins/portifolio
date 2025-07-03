"use client";

import React, { useState } from "react";

export default function ContatosSection() {
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // transforma em objeto

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // envia JSON
      });

      if (response.ok) {
        const resData = await response.json();
        setResponseMessage(resData.message || "Dados enviados com sucesso!");
        form.reset();
      } else {
        const errorRes = await response.json();
        setResponseMessage(errorRes.error || "Erro ao enviar os dados.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage(`Erro: ${error.message}`);
      } else {
        setResponseMessage("Erro inesperado.");
      }
    }
  }

  return (
    <section
      id="contatos"
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-700 text-white p-8 space-y-6 overflow-auto scroll-mt-14 md:scroll-mt-0"
    >
      <h1 className="text-5xl font-bold">Contatos</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="w-full p-2 rounded text-black bg-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded text-black bg-white"
          required
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          className="w-full p-2 rounded text-black bg-white"
        />
        <textarea
          name="mensagem"
          placeholder="Mensagem"
          className="w-full p-2 rounded text-black bg-white"
          rows={4}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Enviar
        </button>
      </form>
      <div
        id="response-message"
        className="mt-2 text-amber-600 text-xs text-center"
      >
        {responseMessage}
      </div>
      <div className="text-lg space-y-2">
        <p>
          <strong>Telefone:</strong> (21) 99003-4590
        </p>
        <p>
          <strong>Email:</strong> contato@robertomarins.com.br
        </p>
      </div>
    </section>
  );
}
