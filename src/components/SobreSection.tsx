import Image from "next/image";
import { useMemo } from "react";

export default function SobreSection() {
  const idade = useMemo(() => {
    const nascimento = new Date("1988-09-07"); // coloque sua data de nascimento
    const hoje = new Date();
    let idadeCalc = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeCalc--;
    }
    return idadeCalc;
  }, []);

  return (
    <section
  id="sobre"
  className="min-h-screen w-full flex flex-col bg-gray-300 p-6 md:p-10 overflow-hidden pt-16"
>
  <div className="mb-4 max-w-4xl mx-auto text-center">
    <h1 className="text-5xl font-bold text-gray-800">Sobre Mim</h1>
    <div className="h-0.5 bg-blue-600 rounded mt-2 w-2/3 mx-auto"></div>
  </div>

  <div className="flex flex-col md:flex-row items-center md:items-center gap-8 max-w-6xl mx-auto">
    <div className="w-56 h-56 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg flex-shrink-0 relative">
      <Image
        src="/eu.png"
        alt="Minha Foto"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>

    <div className="max-w-xl text-gray-800 space-y-5 text-lg">
      <p>
        Sou <strong>Roberto Marins</strong>, <strong>desenvolvedor Full Stack</strong> apaixonado por <strong>tecnologia</strong>, <strong>programação</strong> e <strong>design de interfaces</strong>. Desde criança sempre fui fascinado por entender como as coisas funcionam, o que me levou a descobrir o mundo da programação e, desde então, isso se tornou parte essencial da minha vida.
      </p>
      <p>
        Tenho <span>{idade ?? "..."}</span> anos e moro no <strong>Rio de Janeiro - RJ</strong>. Minha trajetória começou de forma autodidata, montando computadores, criando sites e experimentando linguagens de programação. Ao longo do tempo, fui me aprofundando em <strong>desenvolvimento web</strong>, trabalhando com <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, <strong>React</strong> e outras tecnologias que me permitem criar soluções modernas e funcionais.
      </p>
      <p>
        Busco diariamente evoluir, estudando novas <strong>linguagens</strong>, <strong>frameworks</strong> e conceitos de <strong>UX/UI</strong>, sempre com o objetivo de entregar <strong>projetos criativos</strong>, <strong>eficientes</strong> e com <strong>impacto real</strong>. Acredito no poder da <strong>tecnologia</strong> para transformar ideias em soluções que facilitam e melhoram o dia a dia das pessoas.
      </p>
    </div>
  </div>
</section>

  );
}
