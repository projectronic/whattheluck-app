"use client";
import React, { useState } from 'react';

const upgradeData = [
  { lv: 1, next: 2, stones: 5, gold: 1000 }, { lv: 2, next: 3, stones: 10, gold: 2000 },
  { lv: 3, next: 4, stones: 20, gold: 4000 }, { lv: 4, next: 5, stones: 30, gold: 6000 },
  { lv: 5, next: 6, stones: 50, gold: 10000 }, { lv: 6, next: 7, stones: 70, gold: 14000 },
  { lv: 7, next: 8, stones: 100, gold: 20000 }, { lv: 8, next: 9, stones: 130, gold: 26000 },
  { lv: 9, next: 10, stones: 170, gold: 34000 }, { lv: 10, next: 11, stones: 210, gold: 42000 },
  { lv: 11, next: 12, stones: 260, gold: 52000 }, { lv: 12, next: 13, stones: 310, gold: 62000 },
  { lv: 13, next: 14, stones: 360, gold: 72000 }, { lv: 14, next: 15, stones: 430, gold: 86000 }
];

export default function GuardianCalculator() {
  const [currentLv, setCurrentLv] = useState(1);
  const [targetLv, setTargetLv] = useState(2);

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

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Card Kalkulator */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-yellow-500/30 overflow-hidden">
          <div className="bg-yellow-600 p-4 text-center">
            <h1 className="text-xl font-bold uppercase tracking-wider">What the Luck</h1>
            <p className="text-xs opacity-80">Guardian Upgrade Calculator</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-2 uppercase font-bold">Current Level</label>
                <select 
                  value={currentLv}
                  onChange={(e) => setCurrentLv(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500 cursor-pointer"
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map(lv => (
                    <option key={lv} value={lv}>Level {lv}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2 uppercase font-bold">Target Level</label>
                <select 
                  value={targetLv}
                  onChange={(e) => setTargetLv(Math.max(Number(e.target.value), currentLv + 1))}
                  className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500 cursor-pointer"
                >
                  {Array.from({ length: 14 }, (_, i) => i + 2).map(lv => (
                    <option key={lv} value={lv}>Level {lv}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-slate-300 font-medium">Total Mythic Stones</span>
                <span className="text-xl font-mono font-bold text-blue-400">{totalStones.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-slate-300 font-medium">Total Gold Needed</span>
                <span className="text-xl font-mono font-bold text-yellow-500">{totalGold.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Visual Data */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
          <div className="p-4 bg-slate-700/50 border-b border-slate-700">
            <h2 className="text-sm font-bold uppercase text-yellow-500 tracking-tight">Upgrade Reference Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Level Upgrade</th>
                  <th className="px-4 py-3 text-right">Mythic Stones</th>
                  <th className="px-4 py-3 text-right">Gold Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {upgradeData.map((item) => (
                  <tr 
                    key={item.lv} 
                    className={`hover:bg-slate-700/30 transition-colors ${item.lv >= currentLv && item.lv < targetLv ? 'bg-yellow-500/10' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium">{item.lv} → {item.next}</td>
                    <td className="px-4 py-3 text-right text-blue-400 font-mono">{item.stones}</td>
                    <td className="px-4 py-3 text-right text-yellow-500 font-mono">{item.gold.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-500 italic">
          Data based on What the Luck - Guardian Upgrade CSV
        </p>
      </div>
    </main>
  );
}