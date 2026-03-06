import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ElRadar – Sammenlign strømpriser og elleverandører i Danmark',
    template: '%s | ElRadar',
  },
  description:
    'Sammenlign elleverandører og find den billigste strøm i Danmark. Gratis og upartisk sammenligning med live prisberegner.',
  keywords: ['elleverandør', 'strømpris', 'billig el', 'sammenlign el', 'skift el', 'spotpris'],
  openGraph: {
    siteName: 'ElRadar',
    locale: 'da_DK',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
