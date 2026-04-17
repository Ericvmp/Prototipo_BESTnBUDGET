
import React, { useEffect } from 'react';
import { Material, Weapon, Modification } from '../types';
import { MATERIALS_DATA, WEAPONS_DATA, MODS_DATA, THROWABLES_DATA, LOOT_DATA } from '../data';
import { generateItemTooltip } from './tooltipHelper';
import { getSourceImageUrl, getItemRarity, getRarityStyles, getRarityGlowStyles, getRarityHoverStyles, getRarityBorderColor, parseMaterialString } from '../utils';
import RichTooltip from './RichTooltip';

interface MaterialOverlayProps {
  material: Material;
  onClose: () => void;
  onNavigateWeapon: (w: Weapon) => void;
  onNavigateMod: (m: Modification) => void;
  onNavigateMaterial: (mat: Material) => void;
  onNavigateTactical?: (t: import('../types').Throwable | import('../types').Augment) => void;
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

const MaterialOverlay: React.FC<MaterialOverlayProps> = ({
  material, onClose, onNavigateWeapon, onNavigateMod, onNavigateMaterial, onNavigateTactical
}) => {
  const rarityColor = getRarityColor(material.rarity);

  // Lock background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Navigation between materials
  const currentIndex = MATERIALS_DATA.findIndex(m => m.id === material.id);
  const prevMaterial = currentIndex > 0 ? MATERIALS_DATA[currentIndex - 1] : null;
  const nextMaterial = currentIndex < MATERIALS_DATA.length - 1 ? MATERIALS_DATA[currentIndex + 1] : null;

  // Loot data for this material (recycling sources)
  const materialLootData = LOOT_DATA.find(l => l.material === material.name);

  // Materials produced on recycling / salvaging
  const getRequirements = (reqs: import('../types').ModRequirement[] = []) =>
    reqs.map(req => {
      const matInfo = MATERIALS_DATA.find(m => m.name === req.name);
      return matInfo ? { ...matInfo, quantity: req.quantity } : null;
    }).filter(Boolean) as (Material & { quantity: number })[];

  const recycleResults = getRequirements(material.recycleInfo);
  const salvageResults = getRequirements(material.salvageInfo);

  // Row component for a material
  const MatRow = ({ mat, onClick }: { mat: Material & { quantity: number }; onClick: () => void }) => (
    <RichTooltip item={mat}>
      <button
        onClick={onClick}
        className={`flex items-center justify-between p-3 bg-white/5 rounded-xl border ${getRarityBorderColor(mat.rarity)} hover:border-white/20 hover:bg-white/10 transition-all group/mat text-left w-full`}
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
      {prevMaterial && (
        <button
          onClick={() => onNavigateMaterial(prevMaterial)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Anterior: ${prevMaterial.name}`}
        >
          <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">chevron_left</span>
        </button>
      )}
      {nextMaterial && (
        <button
          onClick={() => onNavigateMaterial(nextMaterial)}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-800 transition-all shadow-2xl backdrop-blur-md group"
          title={`Próximo: ${nextMaterial.name}`}
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
            <div
              className={`text-[11px] font-black tracking-[0.5em] uppercase mb-1 ${rarityColor.text}`}
              style={{ textShadow: `0 0 12px ${rarityColor.hex}` }}
            >
              MATERIAL ARCHIVE · {material.rarity}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-white drop-shadow-lg">
              {material.name}
            </h2>
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
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${rarityColor.hex}40 transparent` }}
        >
          {/* Main card */}
          <div
            className={`w-full bg-slate-900/80 backdrop-blur-xl border rounded-3xl shadow-2xl relative overflow-hidden ${rarityColor.border}`}
            style={{ boxShadow: `0 0 40px ${rarityColor.shadow}` }}
          >
            {/* Top rarity bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${rarityColor.topBar}`} />

            <div className="absolute top-4 right-4 z-20">
              <span className="flex items-center gap-1.5 text-[16px] font-black px-3 py-1 rounded border border-slate-600 bg-slate-800 text-slate-300 uppercase tracking-widest shadow-inner shadow-black/50" title="Stack Size">
                <span className="material-symbols-outlined text-[18px] text-slate-400">layers</span>
                {material.stackSize || 1}
              </span>
            </div>

            <div className="p-6 md:p-8">
              {/* Image + info */}
              {/* Centered Image + info */}
              <div className="flex flex-col items-center gap-6 mb-10">
                <div
                  className={`w-44 h-44 rounded-3xl bg-slate-800/80 border flex items-center justify-center shadow-inner overflow-hidden p-6 shrink-0 ${rarityColor.border}`}
                  style={{ boxShadow: `inset 0 0 40px ${rarityColor.shadow}` }}
                >
                  {material.imageUrl ? (
                    <img src={material.imageUrl} alt={material.name} className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]" />
                  ) : (
                    <span className="material-symbols-outlined text-7xl" style={{ color: rarityColor.hex }}>{material.icon}</span>
                  )}
                </div>

                <div className="space-y-3 text-center">
                  {materialLootData?.craftingStation && (
                    <div className="flex items-center gap-3 justify-center">
                      <span className="material-symbols-outlined text-lg" style={{ color: rarityColor.hex }}>precision_manufacturing</span>
                      <span className="text-[14px] font-black uppercase tracking-[0.3em] text-slate-400">
                        {materialLootData.craftingStation}
                      </span>
                    </div>
                  )}
                  {material.purchasableFromCeleste && (
                    <div className="flex items-center gap-3 justify-center">
                      <span className="material-symbols-outlined text-lg text-cyan-400">storefront</span>
                      <span className="text-[14px] font-black uppercase tracking-[0.3em] text-cyan-500 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                        Trader Celeste
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full mb-8"
                style={{ background: `linear-gradient(to right, transparent, ${rarityColor.hex}60, transparent)` }}
              />

              {/* ── USED IN (TOP PRIORITY) ── */}
              {material.requiredFor && material.requiredFor.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="material-symbols-outlined text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]">assignment_late</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white/70">USED IN</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {material.requiredFor.map((itemStr, idx) => {
                      const { name, quantity } = parseMaterialString(itemStr);
                      const targetWeapon = WEAPONS_DATA.find(w => w.name === name);
                      const targetMod = MODS_DATA.find(m => m.name === name);
                      const targetMat = MATERIALS_DATA.find(m => m.name === name);
                      const targetThrowable = THROWABLES_DATA.find(t => t.name === name);
                      const targetItem = targetWeapon || targetMod || targetMat || targetThrowable;

                      const handleClick = () => {
                        if (targetWeapon) onNavigateWeapon(targetWeapon);
                        else if (targetMod) onNavigateMod(targetMod);
                        else if (targetMat) onNavigateMaterial(targetMat);
                        else if (targetThrowable && onNavigateTactical) onNavigateTactical(targetThrowable);
                      };

                      const imageUrl = targetItem?.imageUrl || getSourceImageUrl(name);
                      const rarity = targetItem?.rarity || getItemRarity(name);
                      const icon = targetItem && 'icon' in targetItem ? (targetItem as any).icon : (targetWeapon ? 'swords' : targetMod ? 'settings_input_component' : 'inventory_2');

                      return (
                        <RichTooltip key={idx} item={targetItem || { name, rarity }}>
                          <button
                            onClick={targetItem ? handleClick : undefined}
                            className={`flex items-center justify-between p-3 bg-white/5 rounded-xl border ${getRarityBorderColor(rarity)} hover:border-white/20 hover:bg-white/10 transition-all group/req-item text-left w-full ${!targetItem ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/5 shadow-inner transition-transform group-hover/req-item:scale-110">
                                {imageUrl ? (
                                  <img src={imageUrl} alt={name} className="w-full h-full object-contain drop-shadow-md" />
                                ) : (
                                  <span className="material-symbols-outlined text-xl text-slate-400 group-hover/req-item:text-primary transition-colors">{icon}</span>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-white group-hover/req-item:text-primary transition-colors">
                                  {name}
                                </span>
                                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">{rarity}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-2.5 py-1 rounded-lg">
                                <span className="text-[13px] font-black text-primary">×{quantity}</span>
                              </div>
                              {targetItem && (
                                <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover/req-item:opacity-100 transition-all mr-1">chevron_right</span>
                              )}
                            </div>
                          </button>
                        </RichTooltip>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ── SOURCE ── */}
              {((material.obtainedFrom && material.obtainedFrom.length > 0) || (materialLootData && materialLootData.sources.length > 0)) && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-yellow-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]">recycling</span>
                    <h3 className="text-xs font-black tracking-[0.4em] uppercase text-yellow-400">SOURCE</h3>
                  </div>
                  <div className="space-y-2">
                    {(material.obtainedFrom || materialLootData?.sources || []).map((sourceItem, idx) => {
                      const { name, quantity } = typeof sourceItem === 'string' ? parseMaterialString(sourceItem) : sourceItem;
                      const sourceImage = getSourceImageUrl(name);
                      const srcRarity = getItemRarity(name);
                      const srcRarityStyles = getRarityStyles(srcRarity);
                      const srcGlow = getRarityGlowStyles(srcRarity);
                      
                      const targetWeapon = WEAPONS_DATA.find(w => w.name === name);
                      const targetMod = MODS_DATA.find(m => m.name === name);
                      const targetMat = MATERIALS_DATA.find(m => m.name === name);
                      const targetItem = targetWeapon || targetMod || targetMat;

                      const handleClick = () => {
                        if (targetWeapon) onNavigateWeapon(targetWeapon);
                        else if (targetMod) onNavigateMod(targetMod);
                        else if (targetMat) onNavigateMaterial(targetMat);
                      };

                      return (
                        <RichTooltip key={idx} item={targetItem || { name, rarity: srcRarity }}>
                           <button
                              onClick={targetItem ? handleClick : undefined}
                              className={`relative w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border transition-all group/src ${srcRarityStyles} ${targetItem ? 'hover:bg-slate-700/60 cursor-pointer' : 'cursor-default'}`}
                           >
                              <div className={`absolute inset-0 opacity-0 group-hover/src:opacity-20 bg-gradient-to-r ${srcGlow} to-transparent transition-opacity rounded-xl`} />
                              <div className="flex items-center gap-3 relative z-10">
                                 <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center p-1.5 border border-white/5 transition-transform group-hover/src:scale-110 shrink-0">
                                 {sourceImage ? (
                                    <img src={sourceImage} alt={name} className="w-full h-full object-contain drop-shadow-md" />
                                 ) : (
                                    <span className="material-symbols-outlined text-lg text-slate-500">inventory_2</span>
                                 )}
                                 </div>
                                 <div className="flex flex-col text-left">
                                 <span className="text-[12px] font-black text-slate-100 tracking-wider">
                                    {name}
                                 </span>
                                 <span className={`text-[9px] font-bold mt-0.5 px-1.5 py-0.5 rounded border-[0.5px] uppercase tracking-[0.15em] self-start ${srcRarityStyles}`}>
                                    {srcRarity}
                                 </span>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2 relative z-10">
                                 <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-2.5 py-1 rounded-lg">
                                    <span className="text-[13px] font-black text-primary">×{quantity}</span>
                                 </div>
                                 {targetItem && (
                                   <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover/src:opacity-100 transition-all">chevron_right</span>
                                 )}
                              </div>
                           </button>
                        </RichTooltip>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ── CRAFT SECTION ── */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined" style={{ color: rarityColor.hex }}>precision_manufacturing</span>
                  <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">CRAFTING COST</h3>
                </div>
                {!material.craftInfo?.isCraftable ? (
                  <div className="flex justify-center py-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl py-3 px-8 text-red-400 font-black tracking-[0.3em] text-sm uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      NOT CRAFTABLE
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {material.craftInfo?.location && (
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-xl border border-white/5 mb-3">
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Station</span>
                        <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: rarityColor.hex }}>
                          {material.craftInfo.location}
                        </span>
                      </div>
                    )}
                    <div className="space-y-2">
                      {material.craftInfo?.requirements?.map((req, i) => {
                        const targetMat = MATERIALS_DATA.find(m => m.name === req.name);
                        return (
                          <div key={i}>
                            <RichTooltip item={targetMat}>
                              <button
                                onClick={() => targetMat && onNavigateMaterial(targetMat)}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group/req text-left w-full"
                              >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                                  {targetMat?.imageUrl ? (
                                    <img src={targetMat.imageUrl} alt={req.name} className="w-full h-full object-contain" />
                                  ) : (
                                    <span className="material-symbols-outlined text-xl text-slate-400 group-hover/req:text-primary transition-colors">{targetMat?.icon || 'inventory_2'}</span>
                                  )}
                                </div>
                                <span className="text-sm font-bold text-white group-hover/req:text-primary transition-colors">
                                  {req.name}
                                </span>
                              </div>
                              <span className="text-lg font-black text-primary">×{req.quantity}</span>
                            </button>
                            </RichTooltip>
                          </div>
                        );
                      })}
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
                <section className="mb-8">
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

export default MaterialOverlay;
