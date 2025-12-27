import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

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
        <footer className="mt-auto py-10 border-t border-slate-800 text-center space-y-4 bg-slate-950/50">
          {/* Credit Section */}
          <div className="px-4">
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">
              Data Source & Reference
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Big shout out and credit to{" "}
              <a 
                href="https://luckydefenseguides.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-500 transition-colors font-bold underline decoration-dotted underline-offset-4"
              >
                luckydefenseguides.com
              </a>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-slate-400 text-sm font-semibold tracking-wide">
              Vicky Andhika &copy; 2025
            </p>
            <p className="text-slate-600 text-[11px] italic max-w-xs mx-auto leading-relaxed">
              projectronic.net - we all have busy minds, mine is to create.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}