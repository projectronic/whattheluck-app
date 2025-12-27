"use client";
import React from 'react';

const PET_DATA = {
  Common: [
    { name: "MonoCell", special: "Increase MP Regen" },
    { name: "Chili", special: "Increase Basic Attack DMG" },
    { name: "Sproutfish", special: "Increase ULT DMG" },
    { name: "Clawsy", special: "Increase DMG upon attacking Boss units" },
    { name: "Squibbly", special: "Increase MOV SPD" },
    { name: "Doughie", special: "Reduce enemy MOV SPD" },
  ],
  Rare: [
    { name: "Jelly", special: "Increase MP Regen" },
    { name: "Tube", special: "Increase Basic Attack DMG" },
    { name: "Dandan", special: "Reduce enemy DEF" },
    { name: "Handsome", special: "Increase DMG upon attacking Boss units" },
    { name: "Coolie", special: "Reduce enemy MOV SPD" },
    { name: "Leafish", special: "Stun nearby enemies every 30s" },
  ],
  Epic: [
    { name: "Sticky", special: "Increase ULT DMG" },
    { name: "Helmster", special: "Reduce enemy DEF" },
    { name: "Grassfish", special: "Summon random Common unit at start" },
    { name: "Anthony", special: "Reduce CD" },
    { name: "Ballfish", special: "Deals % HP DMG to nearby enemies" },
  ],
  Legendary: [
    { name: "Salamander", special: "Free Summon" },
    { name: "Braveheart", special: "Increase Physical DMG" },
    { name: "Blander", special: "Increase Magic DMG" },
    { name: "ShrimpKun", special: "Increase CRIT DMG" },
    { name: "Rockfish", special: "Gain Coins at the start" },
  ],
  Mythic: [
    { name: "WhaleKing", special: "Increase ATK SPD" },
    { name: "Wooroo", special: "Chance to obtain luck stone each wave" },
    { name: "Drago", special: "Increase CRIT Rate" },
    { name: "Ghostboogie", special: "Bonus Coins on sell" },

  ],
  Immortal: [
    { name: "Poseidon", special: "Increase DMG upon attacking Boss units" },
    { name: "PartyCat", special: "Increase Final DMG & CRIT DMG" },
  ]

};

const PET_THEMES: any = {
  Common: { color: "text-slate-400", border: "border-slate-500/30", bg: "bg-slate-500/5", glow: "shadow-slate-500/10" },
  Rare: { color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5", glow: "shadow-blue-500/10" },
  Epic: { color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5", glow: "shadow-purple-500/10" },
  Legendary: { color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/5", glow: "shadow-orange-500/10" },
  Mythic: { color: "text-yellow-500", border: "border-yellow-500/30", bg: "bg-yellow-500/5", glow: "shadow-yellow-500/10" },
  Immortal: { color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/5", glow: "shadow-red-500/10" },
};

export default function PetLibrary() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 py-6">
          <h1 className="text-4xl font-black text-yellow-500 uppercase tracking-tighter">
            Pet Library
          </h1>
          
          {/* Global Note for Basic Ability */}
          <div className="inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
            <p className="text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Note: All pets basic ability is to Increase Attack, differs by rarity
            </p>
          </div>
        </div>

        {/* Rarity Sections */}
        {Object.entries(PET_DATA).map(([rarity, pets]) => (
          <div key={rarity} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className={`text-xl font-black uppercase tracking-widest ${PET_THEMES[rarity].color}`}>
                {rarity}
              </h2>
              <div className={`h-[1px] flex-grow border-b border-dashed ${PET_THEMES[rarity].border}`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div 
                  key={pet.name} 
                  className={`group flex items-center bg-slate-950/40 rounded-3xl border ${PET_THEMES[rarity].border} p-4 hover:bg-slate-800/40 transition-all duration-300 shadow-xl ${PET_THEMES[rarity].glow}`}
                >
                  {/* Pet Image Container */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-slate-900 rounded-2xl p-2 border border-white/5 relative group-hover:scale-105 transition-transform">
                    <img 
                      src={`/img/pets/${pet.name}.png`} 
                      alt={pet.name}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/img/placeholder.png"; }}
                    />
                  </div>

                  {/* Pet Ability Info */}
                  <div className="ml-5 flex-grow">
                    <h3 className={`text-xs font-black uppercase tracking-widest mb-2 ${PET_THEMES[rarity].color}`}>
                      {pet.name}
                    </h3>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <p className="text-[10px] md:text-[11px] text-slate-300 leading-relaxed font-medium">
                        {pet.special}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}