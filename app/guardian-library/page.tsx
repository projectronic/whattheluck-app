"use client";
import React from 'react';

// Data Roster Guardian
const GUARDIAN_DATA = {
  common: [
    "Archer.png", "Bandit.png", "Barbarian.png", "Thrower.png", "Water Elemental.png"
  ],
  rare: [
    "Demon Soldier.png", "Eagle General.png", "Electro Robot.png", "Hunter.png", 
    "Paladin.png", "Ranger.png", "Sandman.png", "Shock Robot.png", "Tree.png", "Wolf Warrior.png"
  ],
  legendary: [
    "Sheriff.png", "Storm Giant.png", "Tiger Master.png", "War Machine.png"
  ],
  mythic: [
    "Bat Man.png", "Blob.png", "Bomba.png", "Coldy.png", "Dragon.png", "Frog Prince.png", 
    "Graviton.png", "Indy.png", "Iron Meow.png", "Kitty Mage.png", "Lancelot.png", 
    "Lazy Taoist.png", "Mama.png", "Master Kun.png", "Monopoly Man.png", "Ninja.png", 
    "Orc Shaman.png", "Penguin Musician.png", "Pulse Generator.png", "Rocket Chu.png", 
    "Tar.png", "Vayne.png", "Verdee.png", "Watt.png", "Zap.png",
    // Gambar yang belum ada (tanpa .png untuk logika pengecekan)
    "Hailey", "Ato", "Birdraw", "Roka"
  ],
  immortal: [
    "Awakened Hailey.png", "Chrono Ato.png", "Ghost Ninja.png", "Grand Mama.png", 
    "Primeval Bomba.png", "Reaper Dian.png", "Reaper Frog.png",
    // Gambar yang belum ada
    "Boss Bird", "I Am Meow", "Noisy Penguin Musician", "Ace Bat Man", 
    "Captain Roka", "Super Graviton", "Dark Lord Dragon", "Top Vayne", "Dr Pulse"
  ]
};

const RARITY_THEMES: any = {
  common: { label: "Common", color: "text-slate-400", border: "border-slate-500/30", bg: "bg-slate-500/5" },
  rare: { label: "Rare", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5" },
  legendary: { label: "Legendary", color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5" },
  mythic: { label: "Mythic", color: "text-yellow-500", border: "border-yellow-500/30", bg: "bg-yellow-500/5" },
  immortal: { label: "Immortal", color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/5" },
};

export default function GuardianLibrary() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-2 py-6">
          <h1 className="text-4xl font-black text-yellow-500 uppercase tracking-tighter shadow-yellow-500/20 drop-shadow-md">
            Guardian Library
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
            Database of all available guardians
          </p>
        </div>

        {/* Rarity Sections */}
        {Object.entries(GUARDIAN_DATA).map(([rarity, guardians]) => (
          <div key={rarity} className="space-y-4">
            {/* Rarity Label */}
            <div className="flex items-center gap-4">
              <h2 className={`text-xl font-black uppercase tracking-widest ${RARITY_THEMES[rarity].color}`}>
                {RARITY_THEMES[rarity].label}
              </h2>
              <div className={`h-[2px] flex-grow ${RARITY_THEMES[rarity].bg} border-b ${RARITY_THEMES[rarity].border}`}></div>
            </div>

            {/* Table / Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {guardians.map((item) => {
                const hasImage = item.endsWith(".png");
                const name = hasImage ? item.replace(".png", "") : item;
                const imagePath = `/img/${rarity}/${item}`;

                return (
                  <div 
                    key={name} 
                    className={`group relative overflow-hidden rounded-2xl border ${RARITY_THEMES[rarity].border} ${RARITY_THEMES[rarity].bg} hover:border-white/40 transition-all duration-300`}
                  >
                    {/* Image Container */}
                    <div className="aspect-square flex items-center justify-center p-4 bg-slate-950/50 relative">
                      {hasImage ? (
                        <img 
                          src={imagePath} 
                          alt={name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                           <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center">
                              <span className="text-slate-600 text-lg">?</span>
                           </div>
                           <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter italic">Image Missing</span>
                        </div>
                      )}
                    </div>

                    {/* Name Label */}
                    <div className="p-3 bg-slate-900/80 border-t border-white/5">
                      <p className="text-[11px] font-bold text-center uppercase tracking-tight truncate group-hover:text-white transition-colors">
                        {name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}