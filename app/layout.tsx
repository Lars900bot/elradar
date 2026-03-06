import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ElRadar – Sammenlign el og strømpris i Danmark",
  description: "Sammenlign strømpriser fra alle elleverandører i Danmark og find den billigste el.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <a href="/" className="text-2xl font-bold text-orange-700">ElRadar</a>
          </div>
        </header>
        <main className="min-h-screen bg-gray-50">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-8 mt-16 text-center text-sm">
          <p>© {new Date().getFullYear()} ElRadar. Upartisk sammenligning.</p>
        </footer>
      </body>
    </html>
  );
}
