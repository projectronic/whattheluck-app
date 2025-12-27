"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 border-b-2 border-yellow-600/50 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-4xl mx-auto flex justify-around items-stretch h-16">
        {[
          { name: 'Calculator', href: '/' },
          { name: 'Guardians', href: '/guardian-library' },
          { name: 'Pets', href: '/pet-library' },
          { name: 'Artifacts', href: '/artifact-library' }
        ].map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center px-4 text-[11px] font-black uppercase tracking-tighter transition-all relative ${
              pathname === item.href ? 'text-yellow-500' : 'text-slate-500 hover:text-white'
            }`}
          >
            {item.name}
            {pathname === item.href && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 shadow-[0_0_10px_#ca8a04]" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}