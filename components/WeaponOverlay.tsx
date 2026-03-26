
import React, { useEffect } from 'react';
import { Weapon, Modification, Material } from '../types';
import { WEAPONS_DATA, MATERIALS_DATA } from '../data';

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

const MaterialBadge: React.FC<{
  name: string;
  quantity: number;
  onClick?: () => void;
}> = ({ name, quantity, onClick }) => {
  const mat = MATERIALS_DATA.find(m => m.name === name);
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="group/mat flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all text-left"
    >
      <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
         {mat?.imageUrl ? (
            <img src={mat.imageUrl} alt={name} className="w-full h-full object-contain" />
         ) : (
            <span className="material-symbols-outlined text-[14px] text-slate-500">inventory_2</span>
         )}
      </div>
      <span className="text-[11px] font-bold text-slate-300 group-hover/mat:text-primary transition-colors truncate max-w-[80px] md:max-w-none">{name}</span>
      <span className="text-[12px] font-black text-primary ml-auto">×{quantity}</span>
    </button>
  );
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

  const handleMatNav = (name: string) => {
    const mat = MATERIALS_DATA.find(m => m.name === name);
    if (mat) onNavigateMaterial(mat);
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
      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full pointer-events-none">
        {/* Header */}
        <header className="pointer-events-auto flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-background-dark/95 to-transparent shrink-0">
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-300 border border-white/5"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>

          <div className="text-center">
            <div className={`text-[10px] font-black tracking-[0.5em] uppercase mb-1 ${rarity.text}`} style={{ textShadow: `0 0 12px ${rarity.hex}` }}>
              WEAPON SYSTEM · {weapon.rarity}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-[0.3em] uppercase text-white drop-shadow-lg leading-tight">{weapon.name}</h2>
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
            className={`w-full bg-slate-900/90 backdrop-blur-3xl border rounded-3xl shadow-2xl relative overflow-hidden ${rarity.border}`}
            style={{ boxShadow: `0 0 50px ${rarity.shadow}` }}
          >
            {/* Top rarity bar */}
            <div className={`absolute top-0 left-0 w-full h-1.5 ${rarity.topBar}`} />

            <div className="p-6 md:p-10">
              {/* Hero Image Section */}
              <div className="flex flex-col items-center mb-10">
                 <div className="relative group/img">
                    <div className={`absolute inset-0 bg-gradient-to-br ${rarity.hex}20 to-transparent blur-3xl opacity-50 group-hover/img:opacity-80 transition-opacity rounded-full animate-pulse`} />
                    <img 
                      src={weapon.imageUrl} 
                      alt={weapon.name} 
                      className="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter transition-transform duration-700 group-hover/img:scale-105 group-hover/img:rotate-1"
                    />
                 </div>
                 <div className="mt-4 flex gap-3">
                   <span className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] border ${rarity.border} ${rarity.text}`} style={{ background: `${rarity.hex}15` }}>
                      {weapon.rarity}
                   </span>
                   <span className="px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] border border-white/10 bg-white/5 text-slate-300">
                      FOUNDRY ID: {weapon.id.split('-')[1]?.toUpperCase()}
                   </span>
                 </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ── CRAFT SECTION ── */}
                {weapon.craftInfo && (
                  <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors relative group h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40 rounded-l-2xl group-hover:bg-emerald-500 transition-colors" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-emerald-400">precision_manufacturing</span>
                      <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">CRAFT</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {weapon.craftInfo.materials.map((m, i) => (
                         <MaterialBadge key={i} name={m.name} quantity={m.quantity} onClick={() => handleMatNav(m.name)} />
                       ))}
                    </div>
                    {weapon.craftInfo.station && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px] text-slate-500">location_on</span>
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{weapon.craftInfo.station}</span>
                      </div>
                    )}
                  </section>
                )}

                {/* ── REPAIR SECTION ── */}
                {weapon.repairInfo && (
                  <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors relative group h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40 rounded-l-2xl group-hover:bg-amber-500 transition-colors" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-amber-400">build</span>
                      <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">REPAIR</h3>
                    </div>
                    <div className="space-y-2">
                      {weapon.repairInfo.map((info, i) => (
                        <div key={i} className="flex flex-col gap-1.5 p-2 rounded-xl bg-black/20 border border-white/5">
                           <div className="flex items-center justify-between px-1">
                             <span className="text-[10px] font-black text-amber-400 tracking-widest">TIER {info.tier}</span>
                             <span className="text-[10px] font-bold text-emerald-400">{info.durability} DURABILITY</span>
                           </div>
                           <div className="flex flex-wrap gap-1.5">
                             {info.materials.map((m, j) => (
                               <MaterialBadge key={j} name={m.name} quantity={m.quantity} onClick={() => handleMatNav(m.name)} />
                             ))}
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── UPGRADE SECTION ── */}
                {weapon.upgradeInfo && (
                  <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors relative group h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/40 rounded-l-2xl group-hover:bg-blue-500 transition-colors" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-blue-400">upgrade</span>
                      <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">UPGRADE</h3>
                    </div>
                    <div className="space-y-3">
                      {weapon.upgradeInfo.map((info, i) => (
                        <div key={i} className="flex flex-col gap-2 p-2 rounded-xl bg-black/20 border border-white/5">
                           <div className="flex items-center gap-2 px-1">
                             <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">TO TIER {info.tier}</span>
                           </div>
                           <div className="flex flex-wrap gap-1.5">
                             {info.materials.map((m, j) => (
                               <MaterialBadge key={j} name={m.name} quantity={m.quantity} onClick={() => handleMatNav(m.name)} />
                             ))}
                           </div>
                           <div className="flex flex-wrap gap-1 mt-1">
                              {info.perks.split(', ').map((perk, k) => (
                                <span key={k} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                                  {perk}
                                </span>
                              ))}
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── RECYCLE SECTION ── */}
                {weapon.recycleInfo && (
                  <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors relative group h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500/40 rounded-l-2xl group-hover:bg-red-500 transition-colors" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-red-400">recycling</span>
                      <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">RECYCLE</h3>
                    </div>
                    <div className="space-y-2">
                       {weapon.recycleInfo.map((info, i) => (
                         <div key={i} className="flex flex-col gap-1.5 p-2 rounded-xl bg-black/20 border border-white/5">
                            <span className="text-[10px] font-black text-red-400 tracking-widest px-1">FROM TIER {info.tier}</span>
                            <div className="flex flex-wrap gap-1.5">
                               {info.materials.map((m, j) => (
                                 <MaterialBadge key={j} name={m.name} quantity={m.quantity} onClick={() => handleMatNav(m.name)} />
                               ))}
                            </div>
                         </div>
                       ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Bottom Decorative Uplink */}
              <div className="mt-12 flex flex-col items-center gap-4 opacity-40">
                <div className="flex items-center gap-10">
                  <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap text-slate-300">DATA UPLINK SECURE</span>
                  </div>
                  <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeaponOverlay;
