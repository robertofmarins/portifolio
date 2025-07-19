'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  MessageSquare,
  User,
  Clock
} from 'lucide-react';

export default function ContatosSection() {
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setMessageType('');
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();
        setResponseMessage(resData.message || 'Mensagem enviada com sucesso! Retornarei em breve.');
        setMessageType('success');
        form.reset();
      } else {
        const errData = await response.json();
        setResponseMessage(errData.error || 'Erro ao enviar a mensagem. Tente novamente.');
        setMessageType('error');
      }
    } catch (err) {
  console.error(err);
  setResponseMessage('Erro inesperado. Verifique sua conexão e tente novamente.');
  setMessageType('error');
} finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contatos"
      className="border-t border-[#35356b]/50 pt-8 min-h-screen bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white px-4 relative overflow-hidden"
    >
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header da Seção */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Vamos Conversar
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tem um projeto em mente? Quer trocar uma ideia? Estou sempre aberto para novas oportunidades e parcerias!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
          {/* Informações de Contato */}
          <aside className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <ContactCard
                icon={<Phone className="w-6 h-6" />}
                title="Telefone"
                subtitle="Disponível das 9h às 18h"
                value="(21) 99003-4590"
                href="tel:+5521990034590"
                color="from-green-500 to-emerald-500"
              />
              
              <ContactCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                subtitle="Respondo em até 24h"
                value="contato@robertomarins.com.br"
                href="mailto:contato@robertomarins.com.br"
                color="from-blue-500 to-cyan-500"
              />
              
              <ContactCard
                icon={<MapPin className="w-6 h-6" />}
                title="Localização"
                subtitle="Trabalho remoto e presencial"
                value="Rio de Janeiro, Brasil"
                color="from-purple-500 to-pink-500"
              />
            </div>

            {/* Tempo de Resposta */}
            <div className="bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold text-cyan-400">Tempo de Resposta</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Normalmente respondo emails em até <span className="text-cyan-400 font-semibold">24 horas</span> e 
                mensagens via WhatsApp em algumas horas durante horário comercial.
              </p>
            </div>
          </aside>

          {/* Formulário de Contato */}
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#23243a]/90 to-[#1a1b2e]/90 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-cyan-500/20"
            noValidate
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
                Envie sua Mensagem
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <Input 
                label="Nome Completo" 
                name="nome" 
                type="text" 
                placeholder="Seu nome completo" 
                required 
                autoComplete="name"
                icon={<User className="w-4 h-4" />}
              />
              <Input 
                label="Email" 
                name="email" 
                type="email" 
                placeholder="seu@email.com" 
                required 
                autoComplete="email"
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div className="mb-4">
              <Input 
                label="Telefone (Opcional)" 
                name="telefone" 
                type="tel" 
                placeholder="(00) 00000-0000" 
                autoComplete="tel"
                icon={<Phone className="w-4 h-4" />}
              />
            </div>

            <div className="mb-6">
              <Textarea 
                label="Mensagem" 
                name="mensagem" 
                placeholder="Conte-me sobre seu projeto, ideia ou como posso te ajudar..." 
                required 
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#23243a] flex items-center justify-center gap-3 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </>
              )}
            </button>

            {/* Mensagem de Resposta */}
            {responseMessage && (
              <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-fadeIn ${
                messageType === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="font-medium">{responseMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// Componente ContactCard
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
  href?: string;  // <-- Coloque a interrogação aqui para dizer que é opcional
  color: string;
}

function ContactCard({ icon, title, subtitle, value, href, color }: ContactCardProps) {
  const content = (
    <div className="group bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-6 rounded-2xl border border-transparent hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
      <div className="flex items-start gap-4">
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
          <p className="text-gray-300 font-medium group-hover:text-cyan-400 transition-colors">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-2xl">
      {content}
    </a>
  ) : content;
}

// Input Melhorado

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

function Input({ label, icon, ...props }: InputProps) {
  return (
    <label className="flex flex-col text-sm font-medium">
      <span className="mb-2 text-gray-300 flex items-center gap-2">
        {icon}
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-[#1a1b2e]/80 border border-[#35356b]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-[#35356b]"
      />
    </label>
  );
}


// Textarea Melhorado
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}


function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className="flex flex-col text-sm font-medium">
      <span className="mb-2 text-gray-300 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        {label}
      </span>
      <textarea
        {...props}
        rows={6}
        className="w-full bg-[#1a1b2e]/80 border border-[#35356b]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none hover:border-[#35356b]"
      />
    </label>
  );
}
