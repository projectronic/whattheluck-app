"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- 1. KOMPONEN COUNTING EFFECT ---
const Counter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    let start = previousValue.current;
    const end = value;
    const duration = 1000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        previousValue.current = end;
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// --- 2. DATA MASTER ---
const GUARDIAN_IMAGES = {
  common: ["Archer.png", "Bandit.png", "Barbarian.png", "Thrower.png", "Water Elemental.png"],
  rare: ["Wolf Warrior.png", "Demon Soldier.png", "Eagle General.png", "Electro Robot.png", "Hunter.png", "Paladin.png", "Ranger.png", "Sandman.png", "Shock Robot.png", "Tree.png"],
  legendary: ["War Machine.png", "Sheriff.png", "Storm Giant.png", "Tiger Master.png"],
  mythic: ["Zap.png", "Bat Man.png", "Blob.png", "Bomba.png", "Coldy.png", "Dragon.png", "Frog Prince.png", "Graviton.png", "Indy.png", "Iron Meow.png", "Kitty Mage.png", "Lancelot.png", "Lazy Taoist.png", "Mama.png", "Master Kun.png", "Monopoly Man.png", "Ninja.png", "Orc Shaman.png", "Penguin Musician.png", "Pulse Generator.png", "Rocket Chu.png", "Tar.png", "Vayne.png", "Verdee.png", "Watt.png"],
  immortal: ["Reaper Frog.png", "Awakened Hailey.png", "Chrono Ato.png", "Ghost Ninja.png", "Grand Mama.png", "Primeval Bomba.png", "Reaper Dian.png"]
};

const UPGRADE_DATA_MAP = {
  common: [
    { lv: 1, next: 2, item: 5, gold: 500 }, { lv: 2, next: 3, item: 10, gold: 1000 },
    { lv: 3, next: 4, item: 20, gold: 2000 }, { lv: 4, next: 5, item: 30, gold: 3000 },
    { lv: 5, next: 6, item: 50, gold: 5000 }, { lv: 6, next: 7, item: 70, gold: 7000 },
    { lv: 7, next: 8, item: 100, gold: 10000 }, { lv: 8, next: 9, item: 130, gold: 13000 },
    { lv: 9, next: 10, item: 170, gold: 17000 }, { lv: 10, next: 11, item: 210, gold: 21000 },
    { lv: 11, next: 12, item: 260, gold: 26000 }, { lv: 12, next: 13, item: 310, gold: 31000 },
    { lv: 13, next: 14, item: 360, gold: 36000 }, { lv: 14, next: 15, item: 430, gold: 43000 }
  ],
  rare: [
    { lv: 1, next: 2, item: 3, gold: 1000 }, { lv: 2, next: 3, item: 6, gold: 2000 },
    { lv: 3, next: 4, item: 10, gold: 3000 }, { lv: 4, next: 5, item: 20, gold: 5000 },
    { lv: 5, next: 6, item: 30, gold: 8000 }, { lv: 6, next: 7, item: 40, gold: 12000 },
    { lv: 7, next: 8, item: 60, gold: 17000 }, { lv: 8, next: 9, item: 80, gold: 22000 },
    { lv: 9, next: 10, item: 100, gold: 28000 }, { lv: 10, next: 11, item: 130, gold: 35000 },
    { lv: 11, next: 12, item: 160, gold: 43000 }, { lv: 12, next: 13, item: 190, gold: 52000 },
    { lv: 13, next: 14, item: 220, gold: 60000 }, { lv: 14, next: 15, item: 260, gold: 72000 }
  ],
  legendary: [
    { lv: 1, next: 2, item: 2, gold: 1000 }, { lv: 2, next: 3, item: 3, gold: 2000 },
    { lv: 3, next: 4, item: 4, gold: 4000 }, { lv: 4, next: 5, item: 10, gold: 6000 },
    { lv: 5, next: 6, item: 15, gold: 10000 }, { lv: 6, next: 7, item: 20, gold: 14000 },
    { lv: 7, next: 8, item: 30, gold: 20000 }, { lv: 8, next: 9, item: 40, gold: 26000 },
    { lv: 9, next: 10, item: 50, gold: 34000 }, { lv: 10, next: 11, item: 65, gold: 42000 },
    { lv: 11, next: 12, item: 80, gold: 52000 }, { lv: 12, next: 13, item: 95, gold: 62000 },
    { lv: 13, next: 14, item: 110, gold: 72000 }, { lv: 14, next: 15, item: 130, gold: 86000 }
  ],
  mythic: [
    { lv: 1, next: 2, item: 5, gold: 1000 }, { lv: 2, next: 3, item: 10, gold: 2000 },
    { lv: 3, next: 4, item: 20, gold: 4000 }, { lv: 4, next: 5, item: 30, gold: 6000 },
    { lv: 5, next: 6, item: 50, gold: 10000 }, { lv: 6, next: 7, item: 70, gold: 14000 },
    { lv: 7, next: 8, item: 100, gold: 20000 }, { lv: 8, next: 9, item: 130, gold: 26000 },
    { lv: 9, next: 10, item: 170, gold: 34000 }, { lv: 10, next: 11, item: 210, gold: 42000 },
    { lv: 11, next: 12, item: 260, gold: 52000 }, { lv: 12, next: 13, item: 310, gold: 62000 },
    { lv: 13, next: 14, item: 360, gold: 72000 }, { lv: 14, next: 15, item: 430, gold: 86000 }
  ],
  immortal: [
    { lv: 1, next: 2, item: 5, gold: 2000 }, { lv: 2, next: 3, item: 10, gold: 4000 },
    { lv: 3, next: 4, item: 20, gold: 8000 }, { lv: 4, next: 5, item: 30, gold: 12000 },
    { lv: 5, next: 6, item: 50, gold: 20000 }, { lv: 6, next: 7, item: 70, gold: 28000 },
    { lv: 7, next: 8, item: 100, gold: 40000 }, { lv: 8, next: 9, item: 130, gold: 52000 },
    { lv: 9, next: 10, item: 170, gold: 68000 }, { lv: 10, next: 11, item: 210, gold: 84000 },
    { lv: 11, next: 12, item: 260, gold: 104000 }, { lv: 12, next: 13, item: 310, gold: 124000 },
    { lv: 13, next: 14, item: 360, gold: 144000 }, { lv: 14, next: 15, item: 430, gold: 172000 }
  ]
};

const RARITY_CONFIG: any = {
  common: { name: 'Common', currency: 'Card', color: 'text-slate-400', border: 'border-slate-500', bg: 'bg-slate-500/10' },
  rare: { name: 'Rare', currency: 'Card', color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' },
  legendary: { name: 'Legendary', currency: 'Card', color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/10' },
  mythic: { name: 'Mythic', currency: 'Mythic Stones', color: 'text-yellow-500', border: 'border-yellow-500', bg: 'bg-yellow-500/10' },
  immortal: { name: 'Immortal', currency: 'Immortal Stones', color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500/10' }
};

export default function GuardianCalculator() {
  const [rarity, setRarity] = useState<keyof typeof UPGRADE_DATA_MAP>('common');
  const [currentLv, setCurrentLv] = useState(1);
  const [targetLv, setTargetLv] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [rarity]);

  const getCalculatedData = () => {
    let totalItem = 0, totalGold = 0, accItem = 0, accGold = 0;
    const tableData = UPGRADE_DATA_MAP[rarity].map((d) => {
      const isSelected = d.lv >= currentLv && d.lv < targetLv;
      if (isSelected) { totalItem += d.item; totalGold += d.gold; }
      accItem += d.item; accGold += d.gold;
      return { ...d, isSelected, accItem, accGold };
    });
    return { totalItem, totalGold, tableData };
  };

  const { totalItem, totalGold, tableData } = getCalculatedData();

  // Helper untuk Ikon Target Level
  const getLevelIcon = (lv: number) => {
    if ([6, 9, 12, 15].includes(lv)) return "⭐";
    return null;
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8 flex flex-col items-center">
      <audio ref={audioRef} src="/sounds/click.mp3" preload="auto" />
      
      {/* Rarity Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.keys(RARITY_CONFIG).map((key) => (
          <button
            key={key}
            onClick={() => { setRarity(key as any); playSound(); if(targetLv <= currentLv) setTargetLv(currentLv + 1); }}
            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase border-2 transition-all ${
              rarity === key ? `bg-slate-800 ${RARITY_CONFIG[key].border} ${RARITY_CONFIG[key].color}` : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {RARITY_CONFIG[key].name}
          </button>
        ))}
      </div>

      <div className="max-w-5xl w-full space-y-6">
        {/* Gallery */}
        <div className="bg-slate-800/40 rounded-[2.5rem] p-6 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
          <div 
            ref={scrollRef} 
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2"
          >
            <style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {GUARDIAN_IMAGES[rarity].map((img) => (
              <div key={img} className="flex-shrink-0 snap-center w-32 md:w-40 group cursor-pointer" onClick={playSound}>
                <div className="aspect-square bg-slate-950 rounded-[2rem] border border-slate-800 p-4 flex items-center justify-center transition-all duration-500 group-hover:border-yellow-500/50 group-hover:scale-105 shadow-2xl">
                  <img src={`/img/${rarity}/${img}`} alt={img} className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inputs & Display Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-8 rounded-[2.5rem] border border-slate-700 space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Current Level</label>
              <select value={currentLv} onChange={(e) => { setCurrentLv(Number(e.target.value)); playSound(); }} className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-700 text-yellow-500 font-bold">
                {UPGRADE_DATA_MAP[rarity].map((d) => <option key={d.lv} value={d.lv}>LV. {d.lv}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Target Level</label>
              <select value={targetLv} onChange={(e) => { setTargetLv(Number(e.target.value)); playSound(); }} className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-700 text-yellow-500 font-bold">
                {Array.from({length: 14}, (_, i) => i + 2).map(lv => (
                  <option key={lv} value={lv} disabled={lv <= currentLv}>
                    LV. {lv} {getLevelIcon(lv)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`bg-slate-800/80 p-8 rounded-[2.5rem] border-b-[10px] ${RARITY_CONFIG[rarity].border} shadow-2xl`}>
             <p className="text-[11px] font-black text-slate-500 uppercase mb-2">Total {RARITY_CONFIG[rarity].currency}</p>
             <h2 className={`text-5xl font-black font-mono ${RARITY_CONFIG[rarity].color}`}><Counter value={totalItem} /></h2>
          </div>

          <div className="bg-slate-800/80 p-8 rounded-[2.5rem] border-b-[10px] border-yellow-600 shadow-2xl">
             <p className="text-[11px] font-black text-slate-500 uppercase mb-2">Total Gold</p>
             <h2 className="text-5xl font-black font-mono text-yellow-500"><Counter value={totalGold} /></h2>
          </div>
        </div>

        {/* Upgrade Table */}
        <div className="bg-slate-800/40 rounded-[2.5rem] overflow-hidden border border-slate-700/50 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="p-6">Transition</th>
                  <th className="p-6 text-right">{RARITY_CONFIG[rarity].currency}</th>
                  <th className="p-6 text-right">Gold</th>
                  <th className="p-6 text-right bg-slate-900/30">Accum. {RARITY_CONFIG[rarity].currency}</th>
                  <th className="p-6 text-right bg-slate-900/30">Accum. Gold</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono divide-y divide-slate-700/30">
                {tableData.map((d) => (
                  <tr 
                    key={d.lv} 
                    className={`
                      ${d.isSelected ? 'bg-yellow-500/10' : 'hover:bg-white/5'} 
                      ${[6, 9, 12, 15].includes(d.next) ? 'border-b-2 border-yellow-500/50' : ''}
                    `}
                  >
                    <td className="p-6 font-bold text-slate-300">Level {d.lv} → {d.next}</td>
                    <td className={`p-6 text-right font-black ${RARITY_CONFIG[rarity].color}`}>{d.item.toLocaleString()}</td>
                    <td className="p-6 text-right font-black text-yellow-600">{d.gold.toLocaleString()}</td>
                    <td className="p-6 text-right text-slate-500 bg-slate-900/10 italic">{d.accItem.toLocaleString()}</td>
                    <td className="p-6 text-right text-slate-500 bg-slate-900/10 italic">{d.accGold.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}