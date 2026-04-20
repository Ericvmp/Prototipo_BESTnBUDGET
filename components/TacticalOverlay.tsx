
import React, { useEffect } from 'react';
import { Throwable, Augment, Material } from '../types';
import { MATERIALS_DATA, THROWABLES_DATA, AUGMENTS_DATA } from '../data';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';

interface TacticalOverlayProps {
  item: Throwable | Augment;
  onClose: () => void;
  onNavigateMaterial: (mat: Material) => void;
  onNavigateTactical?: (item: Throwable | Augment) => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'COMMON':    return { hex: '#94a3b8', shadow: 'rgba(148,163,184,0.4)', border: 'border-[3px] border-slate-400', text: 'text-slate-300', topBar: 'bg-slate-400' };
    case 'UNCOMMON':  return { hex: '#34d399', shadow: 'rgba(52,211,153,0.4)', border: 'border-[3px] border-emerald-400', text: 'text-emerald-300', topBar: 'bg-emerald-400' };
    case 'RARE':      return { hex: '#60a5fa', shadow: 'rgba(96,165,250,0.4)', border: 'border-[3px] border-blue-400', text: 'text-blue-300', topBar: 'bg-blue-400' };
    case 'EPIC':      return { hex: '#e879f9', shadow: 'rgba(232,121,249,0.4)', border: 'border-[3px] border-fuchsia-400', text: 'text-fuchsia-300', topBar: 'bg-fuchsia-400' };
    case 'LEGENDARY': return { hex: '#fbbf24', shadow: 'rgba(251,191,36,0.4)', border: 'border-[3px] border-amber-400', text: 'text-amber-300', topBar: 'bg-amber-400' };
    default:          return { hex: '#94a3b8', shadow: 'rgba(148,163,184,0.4)', border: 'border-[3px] border-slate-400', text: 'text-slate-300', topBar: 'bg-slate-400' };
  }
};

const TacticalOverlay: React.FC<TacticalOverlayProps> = ({ item, onClose, onNavigateMaterial, onNavigateTactical }) => {
  const rarity = getRarityColor(item.rarity);

  // Lock background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Combine data for navigation
  const allTactical = [...THROWABLES_DATA, ...AUGMENTS_DATA];
  const currentIndex = allTactical.findIndex(t => t.id === item.id);
  const prevItem = currentIndex > 0 ? allTactical[currentIndex - 1] : null;
  const nextItem = currentIndex < allTactical.length - 1 ? allTactical[currentIndex + 1] : null;

  const getRequirements = (reqs: import('../types').ModRequirement[] = []) =>
    reqs.map(req => {
      const matInfo = MATERIALS_DATA.find(m => m.name === req.name);
      return matInfo ? { ...matInfo, quantity: req.quantity } : null;
    }).filter(Boolean) as (Material & { quantity: number })[];

  const craftRequirements = getRequirements(item.craftInfo?.materials || []);
  const recycleResults    = getRequirements(item.recycleInfo || []);
  const salvageResults    = getRequirements(item.salvageInfo || []);

  const MatRow = ({ mat, onClick }: { mat: Material & { quantity: number }; onClick: () => void }) => (
    <RichTooltip item={mat}>
      <button
        onClick={onClick}
        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all hover:bg-white/10 group/mat text-left w-full"
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
          <span className="text-lg font-black text-primary">×{mat.quantity}</span>
          <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover/mat:opacity-100 transition-opacity">chevron_right</span>
        </div>
      </button>
    </RichTooltip>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background-dark/85 backdrop-blur-sm backdrop-grayscale-[0.2]"
        onClick={onClose}
      />

      {/* Navigation arrows */}
      {prevItem && onNavigateTactical && (
        <button
          onClick={() => onNavigateTactical(prevItem)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Previous: ${prevItem.name}`}
        >
          <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
        </button>
      )}
      {nextItem && onNavigateTactical && (
        <button
          onClick={() => onNavigateTactical(nextItem)}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Next: ${nextItem.name}`}
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
              TACTICAL · {rarity.hex === '#fbbf24' ? 'LEGENDARY' : item.rarity}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-white drop-shadow-lg">{item.name}</h2>
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

            <div className="absolute top-4 right-4 z-20">
              <span className="flex items-center gap-1.5 text-[16px] font-black px-3 py-1 rounded border border-slate-600 bg-slate-800 text-slate-300 uppercase tracking-widest shadow-inner shadow-black/50" title="Stack Size">
                <span className="material-symbols-outlined text-[18px] text-slate-400">layers</span>
                {item.stackSize || 1}
              </span>
            </div>

            <div className="p-6 md:p-8">
              {/* Image + info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div
                  className={`w-36 h-36 rounded-2xl bg-slate-800/80 border flex items-center justify-center shadow-inner overflow-hidden p-4 shrink-0 ${rarity.border}`}
                  style={{ boxShadow: `inset 0 0 20px ${rarity.shadow}` }}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
                  ) : (
                    <span className="material-symbols-outlined text-6xl" style={{ color: rarity.hex }}>{item.icon || 'military_tech'}</span>
                  )}
                </div>

                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border ${rarity.border} ${rarity.text}`}
                      style={{ background: `${rarity.hex}18` }}
                    >
                      {item.rarity}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-slate-300">
                      {item.category || 'TACTICAL'}
                    </span>
                  </div>
                  {item.description && item.category !== 'AUGMENT' && (
                    <p className="text-sm text-slate-300 leading-relaxed italic opacity-80">
                      "{item.description}"
                    </p>
                  )}

                  {/* AUGMENT STATS GRID */}
                  {item.category === 'AUGMENT' && (item.maxWeight || item.backpackSlots) && (
                    <div className="mt-4 space-y-3 pb-2">
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/10 transition-all">
                             <img src="https://arcraiders.wiki/w/images/thumb/e/e8/Icon_Weight.png/22px-Icon_Weight.png.webp" className="w-8 h-8 object-contain drop-shadow-glow" alt="Weight" />
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">WEIGHT</span>
                                <span className="text-base font-black text-white">{item.maxWeight} KG</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/10 transition-all">
                             <img src="https://arcraiders.wiki/w/images/thumb/7/7f/Icon_AllItems.png/30px-Icon_AllItems.png.webp" className="w-8 h-8 object-contain drop-shadow-glow" alt="Backpack" />
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">BACKPACK</span>
                                <span className="text-base font-black text-white">{item.backpackSlots}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/10 transition-all">
                             <img src="https://arcraiders.wiki/w/images/thumb/7/71/Icon_QuickUse.png/30px-Icon_QuickUse.png.webp" className="w-8 h-8 object-contain drop-shadow-glow" alt="Quick Use" />
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">QUICK USE</span>
                                <span className="text-base font-black text-white">{item.quickUseSlots}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/10 transition-all">
                             <img src="https://arcraiders.wiki/w/images/thumb/6/67/Icon_SafePocket.png/30px-Icon_SafePocket.png.webp" className="w-8 h-8 object-contain drop-shadow-glow" alt="Safe Pocket" />
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">SAFE POCKET</span>
                                <span className="text-base font-black text-white">{item.safePocketSlots}</span>
                             </div>
                          </div>
                       </div>
                       
                       {item.shieldCompat && (
                          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/10 transition-all w-full">
                             <img src="https://arcraiders.wiki/w/images/thumb/6/61/Icon_Shield_I.png/25px-Icon_Shield_I.png.webp" className="w-8 h-8 object-contain drop-shadow-glow" alt="Shields" />
                             <div className="flex flex-col flex-1">
                                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">SHIELD COMPATIBILITY</span>
                                <span className="text-sm font-black text-violet-300 uppercase tracking-widest">{item.shieldCompat}</span>
                             </div>
                          </div>
                       )}
                    </div>
                  )}

                  {item.perks && (
                    <div className="mt-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-inner">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-amber-400 text-[20px]">bolt</span>
                        <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-amber-400">PERKS</h4>
                      </div>
                      <p className="text-sm text-white font-black leading-relaxed">
                        {item.perks}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full mb-8"
                style={{ background: `linear-gradient(to right, transparent, ${rarity.hex}60, transparent)` }}
              />

              {/* ── CRAFT SECTION ── */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined" style={{ color: rarity.hex }}>precision_manufacturing</span>
                  <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">CRAFTING COST</h3>
                </div>
                {craftRequirements.length > 0 ? (
                  <div className="space-y-2">
                    {craftRequirements.map((mat, idx) => (
                      <div key={`craft-${mat.id}-${idx}`}>
                        <MatRow mat={mat} onClick={() => onNavigateMaterial(mat)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center py-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl py-3 px-8 text-red-400 font-black tracking-[0.3em] text-sm uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      NOT CRAFTABLE
                    </div>
                  </div>
                )}
              </section>

              {/* ── RECYCLING RESULTS ── */}
              {recycleResults.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-emerald-400">recycling</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-emerald-400">RECYCLING</h3>
                  </div>
                  <div className="space-y-2">
                    {recycleResults.map((mat, idx) => (
                      <div key={`recycle-${mat.id}-${idx}`}>
                        <MatRow mat={mat} onClick={() => onNavigateMaterial(mat)} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── SALVAGING RESULTS ── */}
              {salvageResults.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-amber-400">build_circle</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-amber-400">SALVAGING</h3>
                  </div>
                  <div className="space-y-2">
                    {salvageResults.map((mat, idx) => (
                      <div key={`salvage-${mat.id}-${idx}`}>
                        <MatRow mat={mat} onClick={() => onNavigateMaterial(mat)} />
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

export default TacticalOverlay;
