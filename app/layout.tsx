import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // Pastikan path-nya benar

export const metadata: Metadata = {
  title: "What the Luck - Guardian Calculator",
  description: "Calculate your Guardian upgrade costs in What the Luck game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-900 text-white min-h-screen flex flex-col">
        {/* Navbar Global */}
        <Navbar />

        {/* Isi Halaman (Calculator, Library, dll) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer Global */}
        <footer className="mt-auto py-8 border-t border-slate-800 text-center space-y-2 bg-slate-900">
          <p className="text-slate-400 text-sm font-semibold tracking-wide">
            Vicky Andhika &copy; 2025
          </p>
          <p className="text-slate-500 text-[11px] italic max-w-xs mx-auto leading-relaxed">
            projectronic.net - we all have busy minds, mine is to create.
          </p>
        </footer>
      </body>
    </html>
  );
}