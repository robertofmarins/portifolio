import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Roberto Marins - Desenvolvedor Full Stack',
  description: 'Portfólio de Roberto Marins, desenvolvedor full stack',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0F172A]">
        <Header />
        <main className="flex flex-col 
            min-h-screen 
            pt-16 md:pt-0 
            md:ml-[18rem]
            overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
