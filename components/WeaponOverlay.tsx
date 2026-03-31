
import React, { useEffect } from 'react';
import { Weapon, Modification, Material } from '../types';
import { WEAPONS_DATA, MATERIALS_DATA } from '../data';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';
import { getRarityBorderColor } from '../utils';

interface WeaponOverlayProps {
  weapon: Weapon;
  onClose: () => void;
  onNavigateWeapon: (w: Weapon) => void;
  onNavigateMod: (m: Modification) => void;
  onNavigateMaterial: (mat: Material) => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'COMMON':    return { hex: '#94a3b8', shadow: 'rgba(148,163,184,0.4)', border: 'border-slate-400', text: 'text-slate-300', topBar: 'bg-slate-400' };
    case 'UNCOMMON':  return { hex: '#34d399', shadow: 'rgba(52,211,153,0.4)', border: 'border-emerald-400', text: 'text-emerald-300', topBar: 'bg-emerald-400' };
    case 'RARE':      return { hex: '#60a5fa', shadow: 'rgba(96,165,250,0.4)', border: 'border-blue-400', text: 'text-blue-300', topBar: 'bg-blue-400' };
    case 'EPIC':      return { hex: '#e879f9', shadow: 'rgba(232,121,249,0.4)', border: 'border-fuchsia-400', text: 'text-fuchsia-300', topBar: 'bg-fuchsia-400' };
    case 'LEGENDARY': return { hex: '#fbbf24', shadow: 'rgba(251,191,36,0.4)', border: 'border-amber-400', text: 'text-amber-300', topBar: 'bg-amber-400' };
    default:          return { hex: '#94a3b8', shadow: 'rgba(148,163,184,0.4)', border: 'border-slate-400', text: 'text-slate-300', topBar: 'bg-slate-400' };
  }
};

const WeaponOverlay: React.FC<WeaponOverlayProps> = ({ weapon, onClose, onNavigateWeapon, onNavigateMod, onNavigateMaterial }) => {
  const rarity = getRarityColor(weapon.rarity);

  // Lock background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const currentIndex = WEAPONS_DATA.findIndex(w => w.id === weapon.id);
  const prevWeapon = currentIndex > 0 ? WEAPONS_DATA[currentIndex - 1] : null;
  const nextWeapon = currentIndex < WEAPONS_DATA.length - 1 ? WEAPONS_DATA[currentIndex + 1] : null;

  const MatRow: React.FC<{ matName: string; quantity: number; onClick: () => void }> = ({ matName, quantity, onClick }) => {
    const mat = MATERIALS_DATA.find(m => m.name === matName);
    if (!mat) return null;
    return (
      <RichTooltip item={mat}>
        <button
          onClick={onClick}
          className={`flex items-center justify-between p-3 bg-white/5 rounded-xl border ${getRarityBorderColor(mat.rarity)} hover:border-white/20 transition-all hover:bg-white/10 group/mat text-left w-full mb-2`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
              {mat.imageUrl ? (
                <img src={mat.imageUrl} alt={mat.name} className="w-full h-full object-contain" />
              ) : (
                <span className="material-symbols-outlined text-xl text-slate-400">{mat.icon}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white group-hover/mat:text-primary transition-colors">{mat.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{mat.rarity}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-primary">×{quantity}</span>
            <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover/mat:opacity-100 transition-opacity">chevron_right</span>
          </div>
        </button>
      </RichTooltip>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background-dark/85 backdrop-blur-sm backdrop-grayscale-[0.2]"
        onClick={onClose}
      />

      {/* Navigation arrows */}
      {prevWeapon && (
        <button
          onClick={() => onNavigateWeapon(prevWeapon)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Previous: ${prevWeapon.name}`}
        >
          <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
        </button>
      )}
      {nextWeapon && (
        <button
          onClick={() => onNavigateWeapon(nextWeapon)}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Next: ${nextWeapon.name}`}
        >
          <span className="material-symbols-outlined text-3xl group-hover:translate-x-1 transition-transform">chevron_right</span>
        </button>
      )}

      {/* Panel */}
      <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full pointer-events-none">
        {/* Header */}
        <header className="pointer-events-auto flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-background-dark/95 to-transparent shrink-0">
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-300 border border-white/5"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>

          <div className="text-center">
            <div className={`text-[11px] font-black tracking-[0.5em] uppercase mb-1 ${rarity.text}`} style={{ textShadow: `0 0 12px ${rarity.hex}` }}>
              WEAPON SYSTEM · 1.0
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-white drop-shadow-lg leading-tight">{weapon.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-slate-300 border border-white/5"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </header>

        {/* Scrollable body */}
        <main
          className="pointer-events-auto flex-1 overflow-y-auto no-scrollbar pb-16 px-4 md:px-6"
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${rarity.hex}40 transparent` }}
        >
          {/* Main card */}
          <div
            className={`w-full bg-slate-900/80 backdrop-blur-xl border rounded-3xl shadow-2xl relative overflow-hidden ${rarity.border}`}
            style={{ boxShadow: `0 0 40px ${rarity.shadow}` }}
          >
            {/* Top rarity bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${rarity.topBar}`} />



            <div className="p-6 md:p-8">
              {/* Image + info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div
                  className={`w-36 h-36 rounded-2xl bg-slate-800/80 border flex items-center justify-center shadow-inner overflow-hidden p-4 shrink-0 ${rarity.border}`}
                  style={{ boxShadow: `inset 0 0 20px ${rarity.shadow}` }}
                >
                  {weapon.imageUrl ? (
                    <img src={weapon.imageUrl} alt={weapon.name} className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
                  ) : (
                    <span className="material-symbols-outlined text-6xl" style={{ color: rarity.hex }}>{weapon.icon || 'military_tech'}</span>
                  )}
                </div>

                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border ${rarity.border} ${rarity.text}`}
                      style={{ background: `${rarity.hex}18` }}
                    >
                      {weapon.rarity}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-slate-300">
                      TIER SYSTEM
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full mb-8"
                style={{ background: `linear-gradient(to right, transparent, ${rarity.hex}60, transparent)` }}
              />

              {/* ── CRAFT SECTION ── */}
              {weapon.craftInfo && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined" style={{ color: rarity.hex }}>precision_manufacturing</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">CRAFTING COST</h3>
                  </div>
                  <div className="space-y-2">
                    {weapon.craftInfo.materials.map((m, i) => (
                      <MatRow key={i} matName={m.name} quantity={m.quantity} onClick={() => {
                        const mat = MATERIALS_DATA.find(mat => mat.name === m.name);
                        if (mat) onNavigateMaterial(mat);
                      }} />
                    ))}
                  </div>
                </section>
              )}



              {/* ── RECYCLING RESULTS ── */}
              {weapon.recycleInfo && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-emerald-400">recycling</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-emerald-400">RECYCLING</h3>
                  </div>
                  <div className="space-y-4">
                    {weapon.recycleInfo.map((info, i) => (
                      <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-[10px] font-black text-emerald-400 tracking-[.2em]">FROM TIER {info.tier}</span>
                        </div>
                        {info.materials.map((m, j) => (
                          <MatRow key={j} matName={m.name} quantity={m.quantity} onClick={() => {
                            const mat = MATERIALS_DATA.find(mat => mat.name === m.name);
                            if (mat) onNavigateMaterial(mat);
                          }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── SALVAGING RESULTS ── */}
              {weapon.salvageInfo && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-amber-400">build_circle</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-amber-400">SALVAGING</h3>
                  </div>
                  <div className="space-y-4">
                    {weapon.salvageInfo.map((info, i) => (
                      <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-[10px] font-black text-amber-400 tracking-[.2em]">FROM TIER {info.tier}</span>
                        </div>
                        {info.materials.map((m, j) => (
                          <MatRow key={j} matName={m.name} quantity={m.quantity} onClick={() => {
                            const mat = MATERIALS_DATA.find(mat => mat.name === m.name);
                            if (mat) onNavigateMaterial(mat);
                          }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── REPAIR SECTION ── */}
              {weapon.repairInfo && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-amber-400">build</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-amber-400">REPAIR TIERS</h3>
                  </div>
                  <div className="space-y-4">
                    {weapon.repairInfo.map((info, i) => (
                      <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-[10px] font-black text-amber-400 tracking-[.2em]">TIER {info.tier}</span>
                          <span className="text-[10px] font-bold text-emerald-400">{info.durability} DURABILITY</span>
                        </div>
                        {info.materials.map((m, j) => (
                          <MatRow key={j} matName={m.name} quantity={m.quantity} onClick={() => {
                            const mat = MATERIALS_DATA.find(mat => mat.name === m.name);
                            if (mat) onNavigateMaterial(mat);
                          }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── UPGRADE SECTION ── */}
              {weapon.upgradeInfo && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-blue-400">upgrade</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">UPGRADES</h3>
                  </div>
                  <div className="space-y-4">
                    {weapon.upgradeInfo.map((info, i) => (
                      <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5">
                         <div className="flex items-center justify-between mb-3 px-1">
                           <span className="text-[10px] font-black text-blue-400 tracking-[.2em]">TO TIER {info.tier}</span>
                         </div>
                         {info.materials.map((m, j) => (
                           <MatRow key={j} matName={m.name} quantity={m.quantity} onClick={() => {
                             const mat = MATERIALS_DATA.find(mat => mat.name === m.name);
                             if (mat) onNavigateMaterial(mat);
                           }} />
                         ))}
                         <div className="flex flex-wrap gap-1 mt-3">
                           {info.perks?.split(', ').map((perk, k) => (
                             <span key={k} className="text-[9px] font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase tracking-widest">
                               {perk}
                             </span>
                           ))}
                         </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeaponOverlay;
