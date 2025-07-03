import Image from 'next/image';

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="min-h-screen w-full flex items-center justify-center bg-gray-500 text-white p-8 overflow-auto scroll-mt-14 md:scroll-mt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="https://robertofmarins.github.io/siteTMS/" target="_blank" rel="noreferrer">
          <div className="bg-gray-700 p-4 rounded-lg transform hover:scale-105 transition duration-300">
            <Image 
            src="/tms.png"
  alt="tms engenharia"
  width={400}   // ajuste para o tamanho real da sua imagem
  height={300}  // ajuste conforme a proporção
            
            
            />
            <h2 className="text-xl font-bold mb-2">TMS Engenharia</h2>
            <p>Landing page responsiva feita com HTML e CSS.</p>
          </div>
        </a>

        <div className="bg-gray-700 p-4 rounded-lg transform hover:scale-105 transition duration-300">
          <h2 className="text-xl font-bold mb-2">Projeto 2</h2>
          <p>Aplicação CRUD com Python e Postgres.</p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg transform hover:scale-105 transition duration-300">
          <h2 className="text-xl font-bold mb-2">Projeto 3</h2>
          <p>Portfólio pessoal com animações e JavaScript.</p>
        </div>
      </div>
    </section>
  );
}
