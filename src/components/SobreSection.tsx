"use client";

import Image from "next/image";
import { useMemo } from "react";
import { 
  Code2, 
  Lightbulb, 
  Target, 
  Heart, 
  MapPin,
  Calendar,
  Sparkles,
  Award,
  Coffee,
  Rocket
} from "lucide-react";

export default function SobreSection() {
  const idade = useMemo(() => {
    const nascimento = new Date("1988-09-07");
    const hoje = new Date();
    let idadeCalc = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeCalc--;
    }
    return idadeCalc;
  }, []);

  const stats = [
    { icon: <Code2 className="w-6 h-6" />, label: "Anos de Experiência", value: "5+", color: "from-blue-500 to-cyan-500" },
    { icon: <Rocket className="w-6 h-6" />, label: "Projetos Concluídos", value: "20+", color: "from-purple-500 to-pink-500" },
    { icon: <Coffee className="w-6 h-6" />, label: "Cafés Consumidos", value: "∞", color: "from-amber-500 to-orange-500" },
    { icon: <Award className="w-6 h-6" />, label: "Tecnologias Dominadas", value: "10+", color: "from-green-500 to-emerald-500" }
  ];

  const valores = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      titulo: "Inovação",
      descricao: "Sempre buscando soluções criativas e tecnologias emergentes para resolver problemas complexos.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      titulo: "Qualidade",
      descricao: "Código limpo, performance otimizada e atenção aos detalhes em cada projeto desenvolvido.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titulo: "Paixão",
      descricao: "Desenvolvedor por vocação, sempre motivado a aprender e compartilhar conhecimento.",
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section
      id="sobre"
      className="border-t border-[#35356b]/50 pt-8 min-h-screen bg-gradient-to-br from-[#181824] via-[#23243a] to-[#181824] text-white px-4 py-20 relative overflow-hidden"
    >
      {/* Elementos Decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sobre Mim
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Desenvolvedor Full Stack apaixonado por criar experiências digitais que fazem a diferença
          </p>
        </div>

        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 mb-16">
          {/* Foto e Informações Básicas */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Foto */}
            <div className="relative group">
              <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-purple-500/60 shadow-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-sm">
                <Image
                  src="/eu.png"
                  alt="Roberto Marins"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                Disponível
              </div>
            </div>

            {/* Informações Pessoais */}
            <div className="bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 w-full max-w-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{idade} anos</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Rio de Janeiro, Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Full Stack Developer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Textual */}
          <div className="space-y-8">
            <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
              <p>
                Olá! Sou <span className="text-cyan-400 font-semibold">Roberto Marins</span>, um desenvolvedor Full Stack apaixonado por tecnologia e inovação. Desde criança, sempre fui fascinado por entender como as coisas funcionam, o que me levou naturalmente ao mundo da programação.
              </p>
              
              <p>
                Minha jornada começou de forma autodidata, montando computadores e criando meus primeiros sites. Com o tempo, me aprofundei em <span className="text-purple-400 font-semibold">desenvolvimento web moderno</span>, especializando-me em tecnologias como <span className="text-cyan-400 font-semibold">React</span>, <span className="text-cyan-400 font-semibold">Node.js</span>, <span className="text-cyan-400 font-semibold">Python</span> e <span className="text-cyan-400 font-semibold">JavaScript</span>.
              </p>
              
              <p>
                Acredito no poder da tecnologia para transformar ideias em soluções reais que impactam positivamente a vida das pessoas. Cada projeto é uma oportunidade de criar algo único, funcional e visualmente impressionante.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores e Princípios */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Meus Valores
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 text-center group hover:scale-105 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${valor.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {valor.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{valor.titulo}</h3>
                <p className="text-gray-300 leading-relaxed">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#23243a]/60 to-[#1a1b2e]/60 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Vamos trabalhar juntos?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Estou sempre em busca de novos desafios e oportunidades para criar soluções inovadoras. 
              Se você tem um projeto em mente, vamos conversar!
            </p>
            <a
              href="#contatos"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 group"
            >
              <Sparkles className="w-5 h-5" />
              Iniciar Conversa
              <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}