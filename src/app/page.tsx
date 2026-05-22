import dynamic from "next/dynamic";
import HomeSection from "@/components/HomeSection";
import SobreSection from "@/components/SobreSection";

const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"), {
  loading: () => <div className="min-h-[60vh] bg-[#181824] animate-pulse flex items-center justify-center text-gray-500">Carregando projetos...</div>,
  ssr: true,
});

const HabilidadesSection = dynamic(() => import("@/components/HabilidadesSection"), {
  loading: () => <div className="min-h-[60vh] bg-[#181824] animate-pulse flex items-center justify-center text-gray-500">Carregando habilidades...</div>,
  ssr: true,
});

const ContatosSection = dynamic(() => import("@/components/ContatosSection"), {
  loading: () => <div className="min-h-[60vh] bg-[#181824] animate-pulse flex items-center justify-center text-gray-500">Carregando formulário...</div>,
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

export default function Page() {
  return (
    <>
      <HomeSection />
      <SobreSection />
      <PortfolioSection />
      <HabilidadesSection />
      <ContatosSection />
      <Footer />
    </>
  );
}
