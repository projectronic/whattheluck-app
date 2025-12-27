"use client";
import React, { useState } from 'react';

const upgradeData = [
  { lv: 1, stones: 5, gold: 1000 }, { lv: 2, stones: 10, gold: 2000 },
  { lv: 3, stones: 20, gold: 4000 }, { lv: 4, stones: 30, gold: 6000 },
  { lv: 5, stones: 50, gold: 10000 }, { lv: 6, stones: 70, gold: 14000 },
  { lv: 7, stones: 100, gold: 20000 }, { lv: 8, stones: 130, gold: 26000 },
  { lv: 9, stones: 170, gold: 34000 }, { lv: 10, stones: 210, gold: 42000 },
  { lv: 11, stones: 260, gold: 52000 }, { lv: 12, stones: 310, gold: 62000 },
  { lv: 13, stones: 360, gold: 72000 }, { lv: 14, stones: 430, gold: 86000 }
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
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-yellow-500/30 overflow-hidden">
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
                className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500"
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
                className="w-full bg-slate-700 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-yellow-500"
              >
                {Array.from({ length: 14 }, (_, i) => i + 2).map(lv => (
                  <option key={lv} value={lv}>Level {lv}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Mythic Stones</span>
              <span className="text-xl font-mono font-bold text-blue-400">{totalStones.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Gold Needed</span>
              <span className="text-xl font-mono font-bold text-yellow-500">{totalGold.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 text-center border-t border-slate-700">
          <p className="text-[10px] text-slate-500">Projectronic.net - Guardian Library Coming Soon</p>
        </div>
      </div>
    </main>
  );
}