
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LOOT_DATA, MATERIALS_DATA } from '../data';

interface RichTooltipProps {
  item: any;
  children: React.ReactNode;
}

const RARITY_STYLES: Record<string, { border: string; text: string; glow: string }> = {
  LEGENDARY: { border: 'border-amber-400',   text: 'text-amber-300',   glow: 'rgba(251,191,36,0.25)' },
  EPIC:      { border: 'border-fuchsia-400', text: 'text-fuchsia-300', glow: 'rgba(232,121,249,0.25)' },
  RARE:      { border: 'border-blue-400',    text: 'text-blue-300',    glow: 'rgba(96,165,250,0.25)' },
  UNCOMMON:  { border: 'border-emerald-400', text: 'text-emerald-300', glow: 'rgba(52,211,153,0.25)' },
  COMMON:    { border: 'border-slate-500',   text: 'text-slate-300',   glow: 'rgba(148,163,184,0.15)' },
};

const RichTooltip: React.FC<RichTooltipProps> = ({ item, children }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => setVisible(false);

  // Adjust position to stay in viewport
  const [adjustedPos, setAdjustedPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!visible || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const rect = el.getBoundingClientRect();
    let x = pos.x + 18;
    let y = pos.y + 18;
    if (x + rect.width > window.innerWidth - 12) x = pos.x - rect.width - 12;
    if (y + rect.height > window.innerHeight - 12) y = pos.y - rect.height - 12;
    setAdjustedPos({ x, y });
  }, [pos, visible]);

  if (!item) return <>{children}</>;

  const rarity = item.rarity || 'COMMON';
  const rs = RARITY_STYLES[rarity] || RARITY_STYLES.COMMON;

  // Crafting reqs
  const craftingReqs: { name: string; quantity: number }[] =
    item.craftInfo?.materials ||
    item.craftInfo?.requirements ||
    item.materials ||
    [];

  // Recycling / Salvaging
  let recycleReqs: { name: string; quantity: number }[] = item.recycleInfo || [];
  let salvageReqs: { name: string; quantity: number }[] = item.salvageInfo || [];

  // If we have specialized tiered info (like in Weapons), pick the first tier (Tier I) materials
  if (Array.isArray(item.recycleInfo) && item.recycleInfo.length > 0 && 'materials' in item.recycleInfo[0]) {
    recycleReqs = item.recycleInfo[0].materials || [];
  }
  if (Array.isArray(item.salvageInfo) && item.salvageInfo.length > 0 && 'materials' in item.salvageInfo[0]) {
    salvageReqs = item.salvageInfo[0].materials || [];
  }

  // Looting sources
  const lootEntry = LOOT_DATA.find(l => l.material === item.name);
  const lootSources = lootEntry?.sources || [];

  const Section = ({ icon, label, color, rows }: {
    icon: string; label: string; color: string;
    rows: { name: string; quantity: number }[];
  }) => (
    <div className="mt-4 first:mt-1">
      <div className={`flex items-center gap-2 mb-2`}>
        <div className={`p-1 rounded bg-black/40 border border-white/5`}>
          <span className={`material-symbols-outlined text-[16px] block ${color}`}>{icon}</span>
        </div>
        <span className={`text-[11px] font-black tracking-[0.25em] uppercase ${color}`}>{label}</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => {
          const mat = MATERIALS_DATA.find(m => m.name === r.name);
          return (
            <div key={i} className="flex items-center gap-3 p-1.5 rounded-lg bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.05]">
              {mat?.imageUrl ? (
                <div className="w-6 h-6 rounded bg-black/40 p-1 border border-white/5 shrink-0 flex items-center justify-center">
                  <img src={mat.imageUrl} alt={r.name} className="w-full h-full object-contain opacity-90" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded bg-black/40 border border-white/5 shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-slate-500">{mat?.icon || 'category'}</span>
                </div>
              )}
              <span className="text-[13px] text-slate-100 font-bold truncate">{r.name}</span>
              <span className={`ml-auto text-[13px] font-black ${color} shrink-0 bg-black/30 px-1.5 py-0.5 rounded border border-white/10`}>×{r.quantity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const LootSection = ({ sources }: { sources: { name: string; quantity: number; imageUrl?: string }[] }) => (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1 rounded bg-black/40 border border-white/5">
          <span className="material-symbols-outlined text-[16px] block text-violet-400">travel_explore</span>
        </div>
        <span className="text-[11px] font-black tracking-[0.25em] uppercase text-violet-400">OBTAINED FROM</span>
      </div>
      <div className="space-y-1.5">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-1.5 rounded-lg bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.05]">
            {s.imageUrl ? (
              <div className="w-6 h-6 rounded bg-black/40 p-1 border border-white/5 shrink-0 flex items-center justify-center">
                <img src={s.imageUrl} alt={s.name} className="w-full h-full object-contain opacity-80" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded bg-black/40 border border-white/5 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-slate-500">inventory_2</span>
              </div>
            )}
            <span className="text-[13px] text-slate-100 font-bold truncate">{s.name}</span>
            <span className="ml-auto text-[13px] font-black text-violet-300 shrink-0 bg-black/30 px-1.5 py-0.5 rounded border border-white/10">×{s.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const hasInfo =
    craftingReqs.length > 0 ||
    recycleReqs.length > 0 ||
    salvageReqs.length > 0 ||
    lootSources.length > 0;

  const tooltip = visible ? ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: adjustedPos.x || pos.x + 18,
        top: adjustedPos.y || pos.y + 18,
        zIndex: 999999,
        pointerEvents: 'none',
        width: 300,
        boxShadow: `0 0 30px ${rs.glow}, 0 8px 32px rgba(0,0,0,0.7)`,
      }}
      className={`bg-[#0d1117] border ${rs.border} rounded-xl overflow-hidden`}
    >
      {/* Header */}
      <div className="p-3 flex items-center gap-3 border-b border-white/5 bg-white/3">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain shrink-0 drop-shadow-md" />
        ) : (
          <span className={`material-symbols-outlined text-2xl shrink-0 ${rs.text}`}>{item.icon || 'category'}</span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-black text-white leading-tight truncate">{item.name}</p>
          <div className="flex gap-1.5 mt-1 flex-wrap">
            <span className={`text-[10px] font-black tracking-widest uppercase border px-1.5 py-0.5 rounded leading-none ${rs.text} ${rs.border} bg-black/30`}>
              {rarity}
            </span>
            {item.category && (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter border border-slate-700 px-1.5 py-0.5 rounded leading-none">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {(item.description && (item.category || item.weaponType) && item.category !== 'AUGMENT') && (
          <p className="text-[12px] text-slate-400 leading-relaxed mb-1">{item.description}</p>
        )}

        {/* AUGMENT STATS GRID */}
        {item.category === 'AUGMENT' && (item.maxWeight || item.backpackSlots) && (
          <div className="mb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2 rounded-lg">
                <img src="https://arcraiders.wiki/w/images/thumb/e/e8/Icon_Weight.png/22px-Icon_Weight.png.webp" className="w-5 h-5 object-contain opacity-70" alt="Weight" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">WEIGHT</span>
                  <span className="text-[13px] text-white font-black leading-none mt-1">{item.maxWeight} KG</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2 rounded-lg">
                <img src="https://arcraiders.wiki/w/images/thumb/7/7f/Icon_AllItems.png/30px-Icon_AllItems.png.webp" className="w-5 h-5 object-contain opacity-70" alt="Backpack" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">BACKPACK</span>
                  <span className="text-[13px] text-white font-black leading-none mt-1">{item.backpackSlots} SLOTS</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2 rounded-lg">
                <img src="https://arcraiders.wiki/w/images/thumb/7/71/Icon_QuickUse.png/30px-Icon_QuickUse.png.webp" className="w-5 h-5 object-contain opacity-70" alt="Quick Use" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">QUICK USE</span>
                  <span className="text-[13px] text-white font-black leading-none mt-1">{item.quickUseSlots} SLOTS</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/5 p-2 rounded-lg">
                <img src="https://arcraiders.wiki/w/images/thumb/6/67/Icon_SafePocket.png/30px-Icon_SafePocket.png.webp" className="w-5 h-5 object-contain opacity-70" alt="Safe Pocket" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">SAFE POCKET</span>
                  <span className="text-[13px] text-white font-black leading-none mt-1">{item.safePocketSlots} SLOTS</span>
                </div>
              </div>
            </div>
            {item.shieldCompat && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-2 rounded-lg">
                <img src="https://arcraiders.wiki/w/images/thumb/6/61/Icon_Shield_I.png/25px-Icon_Shield_I.png.webp" className="w-5 h-5 object-contain opacity-70" alt="Shields" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">SHIELD COMPATIBILITY</span>
                  <span className="text-[11px] text-violet-300 font-black uppercase tracking-widest mt-1">{item.shieldCompat}</span>
                </div>
              </div>
            )}
          </div>
        )}


        {item.perks && (
          <div className="mt-3 first:mt-1">
            <div className={`flex items-center gap-2 mb-2`}>
              <div className={`p-1 rounded bg-black/40 border border-white/5`}>
                <span className={`material-symbols-outlined text-[16px] block text-amber-400`}>bolt</span>
              </div>
              <span className={`text-[11px] font-black tracking-[0.25em] uppercase text-amber-400`}>PERKS</span>
            </div>
            <p className="text-[12px] text-slate-100 font-bold leading-relaxed">{item.perks}</p>
          </div>
        )}

        {(hasInfo && (item.description && (item.category || item.weaponType))) && <div className="h-px w-full bg-white/5 my-2" />}

        {craftingReqs.length > 0 && (
          <Section icon="precision_manufacturing" label="CRAFTING" color="text-sky-400" rows={craftingReqs} />
        )}
        {recycleReqs.length > 0 && (
          <Section icon="recycling" label="RECYCLING" color="text-emerald-400" rows={recycleReqs} />
        )}
        {salvageReqs.length > 0 && (
          <Section icon="build_circle" label="SALVAGING" color="text-amber-400" rows={salvageReqs} />
        )}
        {lootSources.length > 0 && (
          <LootSection sources={lootSources} />
        )}
        {item.obtainedFrom && item.obtainedFrom.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-black/40 border border-white/5">
                <span className="material-symbols-outlined text-[16px] block text-sky-400">explore</span>
              </div>
              <span className="text-[11px] font-black tracking-[0.25em] uppercase text-sky-400">SOURCES</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-2 bg-white/5 border border-white/5 rounded-lg">
              {item.obtainedFrom.map((src: string, i: number) => (
                <span key={i} className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter bg-slate-800 px-1.5 py-0.5 rounded border border-white/5">
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div
      style={{ display: 'contents' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {tooltip}
    </div>
  );
};

export default RichTooltip;
