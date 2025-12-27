"use client";
import React, { useState, useRef } from 'react';

const upgradeData = [
  { lv: 1, next: 2, stones: 5, gold: 1000, accStones: 5, accGold: 1000 },
  { lv: 2, next: 3, stones: 10, gold: 2000, accStones: 15, accGold: 3000 },
  { lv: 3, next: 4, stones: 20, gold: 4000, accStones: 35, accGold: 7000 },
  { lv: 4, next: 5, stones: 30, gold: 6000, accStones: 65, accGold: 13000 },
  { lv: 5, next: 6, stones: 50, gold: 10000, accStones: 115, accGold: 23000 },
  { lv: 6, next: 7, stones: 70, gold: 14000, accStones: 185, accGold: 37000 },
  { lv: 7, next: 8, stones: 100, gold: 20000, accStones: 285, accGold: 57000 },
  { lv: 8, next: 9, stones: 130, gold: 26000, accStones: 415, accGold: 83000 },
  { lv: 9, next: 10, stones: 170, gold: 34000, accStones: 585, accGold: 117000 },
  { lv: 10, next: 11, stones: 210, gold: 42000, accStones: 795, accGold: 159000 },
  { lv: 11, next: 12, stones: 260, gold: 52000, accStones: 1055, accGold: 211000 },
  { lv: 12, next: 13, stones: 310, gold: 62000, accStones: 1365, accGold: 273000 },
  { lv: 13, next: 14, stones: 360, gold: 72000, accStones: 1725, accGold: 345000 },
  { lv: 14, next: 15, stones: 430, gold: 86000, accStones: 2155, accGold: 431000 }
];

export default function GuardianCalculator() {
  const [currentLv, setCurrentLv] = useState(1);
  const [targetLv, setTargetLv] = useState(2);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Silently catch error if browser blocks autoplay
      });
    }
  };

  const handleCurrentLvChange = (newVal: number) => {
    setCurrentLv(newVal);
    if (newVal >= targetLv) {
      setTargetLv(newVal + 1);
      playSound();
    }
  };

  const calculateTotal = () => {
    let totalStones = 0;
    let totalGold = 0;
    upgradeData.forEach((item) => {
      if (item.lv >= currentLv && item.lv < targetLv) {
        totalStones += item.stones;
        totalGold += item.gold;
      }
    });
    return { totalStones, totalGold };
  };

  const { totalStones, totalGold } = calculateTotal();
  const specialLevels = [6, 9, 12, 15];

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans flex flex-col">
      {/* Audio Element */}
      <audio ref={audioRef} src="/select.mp3" preload="auto" />

      <div className="max-w-4xl mx-auto space-y-8 flex-grow">
        
        {/* Card Kalkulator */}
        <div className="max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-yellow-500/30 overflow-hidden">
          <div className="bg-yellow-600 p-4 text-center">
            <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900 font-black italic">What the Luck</h1>
            <p className="text-[10px] font-bold text-slate-800 opacity-90 uppercase tracking-tighter">Guardian Upgrade Calculator</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-widest">Current Level</label>
                <select 
                  value={currentLv} 
                  onChange={(e) => handleCurrentLvChange(Number(e.target.value))} 
                  className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500 cursor-pointer text-sm"
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map(lv => (
                    <option key={lv} value={lv}>Level {lv}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 uppercase font-bold tracking-widest">Target Level</label>
                <select 
                  value={targetLv} 
                  onChange={(e) => {
                    setTargetLv(Math.max(Number(e.target.value), currentLv + 1));
                    playSound();
                  }} 
                  className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500 cursor-pointer text-sm"
                >
                  {Array.from({ length: 14 }, (_, i) => i + 2).map(lv => {
                    const isSpecial = specialLevels.includes(lv);
                    return (
                      <option key={lv} value={lv}>
                        Level {lv} {isSpecial ? " ✧ Special" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-slate-700">
                <p className="text-[9px] text-slate-500 text-center uppercase tracking-[0.2em] font-bold">Total Requirements</p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-blue-500/30 text-center shadow-inner">
                        <span className="block text-[9px] text-blue-400 font-bold mb-1 uppercase tracking-tighter">Mythic Stones</span>
                        <span className="text-lg font-mono font-bold text-blue-400">{totalStones.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-yellow-500/30 text-center shadow-inner">
                        <span className="block text-[9px] text-yellow-500 font-bold mb-1 uppercase tracking-tighter">Gold Cost</span>
                        <span className="text-lg font-mono font-bold text-yellow-500">{totalGold.toLocaleString()}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Tabel Visual */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-slate-700/50 border-b border-slate-700 flex justify-between items-center text-[10px] uppercase font-bold">
            <span className="text-yellow-500 tracking-widest">Upgrade Reference</span>
            <span className="text-indigo-400 flex items-center gap-1 italic"><span className="text-lg">✧</span> Special Ability Level</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] md:text-sm">
              <thead className="bg-slate-900 text-slate-500 uppercase text-[9px]">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-700">LV Up</th>
                  <th className="px-4 py-3 text-right">Stones</th>
                  <th className="px-4 py-3 text-right border-r border-slate-700">Gold</th>
                  <th className="px-4 py-3 text-right text-blue-300">Acc. Stones</th>
                  <th className="px-4 py-3 text-right text-yellow-300">Acc. Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {upgradeData.map((item) => {
                  const isSpecial = specialLevels.includes(item.next);
                  const isSelected = item.lv >= currentLv && item.lv < targetLv;
                  return (
                    <tr key={item.lv} className={`transition-colors ${isSelected ? 'bg-yellow-500/10' : ''} ${isSpecial ? 'bg-indigo-900/30 text-indigo-100' : ''} hover:bg-slate-700/50`}>
                      <td className={`px-4 py-3 font-medium border-r border-slate-700 ${isSpecial ? 'text-indigo-300' : ''}`}>
                        {item.lv} → {item.next} {isSpecial && '✧'}
                      </td>
                      <td className="px-4 py-3 text-right text-blue-400 font-mono">{item.stones}</td>
                      <td className="px-4 py-3 text-right text-yellow-500 font-mono border-r border-slate-700">{item.gold.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-blue-300 font-mono italic opacity-80">{item.accStones.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-yellow-300 font-mono italic opacity-80">{item.accGold.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER COPYRIGHT */}
      <footer className="mt-12 py-8 border-t border-slate-800 text-center space-y-2">
        <p className="text-slate-400 text-sm font-semibold tracking-wide">
          Vicky Andhika &copy; 2025
        </p>
        <p className="text-slate-500 text-[11px] italic max-w-xs mx-auto leading-relaxed">
          projectronic.net - we all have busy minds, mine is to create.
        </p>
      </footer>
    </main>
  );
}