import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Roberto Marins - Desenvolvedor Full Stack',
  description: 'Portfólio de Roberto Marins, desenvolvedor full stack',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex bg-gray-100 scroll-smooth overflow-x-hidden antialiased">
        <Header />
        <main className="flex-1 flex flex-col md:ml-64 pt-16 md:pt-0 overflow-auto">
          {children}
        <Footer />  
        </main>
      </body>
    </html>
  );
}
