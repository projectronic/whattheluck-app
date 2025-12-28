import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: 'What the Luck - Library & Upgrade Calculator',
  description: 'Complete library for What The Luck game, mythic combnation, skill levels, and upgrade calculator.',
  keywords: ['What The Luck', 'Guardian Library', 'Mythic Recipe', 'Game Guide', 'Wiki'],
  openGraph: {
    title: 'Guardian Library - What The Luck',
    description: 'Cek resep kombinasi Mythic dan Immortal Guardian di sini!',
    images: ['/img/og-image.png'], // Gambar yang muncul saat link di-share
  },
}


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

        {/* Isi Halaman */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer Global */}
        <footer className="mt-auto py-10 border-t border-slate-800 text-center space-y-6 bg-slate-950/50">
          
          {/* Credit Section */}
          <div className="px-4 space-y-3">
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em]">
              Credits & Acknowledgments
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs text-slate-400">
              <p>
                Data Source:{" "}
                <a 
                  href="https://luckydefenseguides.com/" 
                  target="_blank" 
                  className="text-yellow-600 hover:text-yellow-500 transition-colors font-bold underline decoration-dotted underline-offset-4"
                >
                  luckydefenseguides.com
                </a>
              </p>
              
              {/* Separator dots (hidden on mobile) */}
              <span className="hidden md:inline text-slate-700">•</span>

              <p>
                Special thanks to <span className="text-blue-400 font-bold">@Klebermas</span> from{" "}
                <a 
                  href="https://discord.gg/luckydefense" 
                  target="_blank" 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold underline decoration-dotted underline-offset-4"
                >
                  Lucky Defense Discord
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-slate-900/50 max-w-xs mx-auto">
            <p className="text-slate-400 text-sm font-semibold tracking-wide">
              Vicky Andhika &copy; 2025
            </p>
            <p className="text-slate-600 text-[11px] italic leading-relaxed">
              projectronic.net - we all have busy minds, mine is to create.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}