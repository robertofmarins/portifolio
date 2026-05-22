import './globals.css'
import Header from '@/components/Header'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${plusJakartaSans.className} bg-[#0F172A] text-slate-100 antialiased`}>
        <Header />
        <main className="flex flex-col 
            min-h-screen 
            pt-16 md:pt-0 
            md:ml-[18rem]
            print:ml-0 print:pt-0
            overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
