
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LOOT_DATA, MATERIALS_DATA, WEAPONS_DATA, MODS_DATA, THROWABLES_DATA } from '../data';
import { parseMaterialString, getItemRarity, getSourceImageUrl, getRarityStyles, getRarityBorderColor, getRarityIconColor } from '../utils';

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
  const [isShiftDown, setIsShiftDown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const style = item?.rarity ? RARITY_STYLES[item.rarity] || RARITY_STYLES.COMMON : RARITY_STYLES.COMMON;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === 'Shift' && visible) {
        setIsShiftDown(prev => !prev); 
      }
      if (e.key === 'Escape') {
        setIsShiftDown(false);
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  const closeTooltip = () => {
    setIsShiftDown(false);
    setVisible(false);
  };

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => { if (!isShiftDown) setVisible(false); };

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

  if (Array.isArray(item.recycleInfo) && item.recycleInfo.length > 0 && 'materials' in item.recycleInfo[0]) {
    recycleReqs = item.recycleInfo[0].materials || [];
  }
  if (Array.isArray(item.salvageInfo) && item.salvageInfo.length > 0 && 'materials' in item.salvageInfo[0]) {
    salvageReqs = item.salvageInfo[0].materials || [];
  }

  const lootEntry = LOOT_DATA.find(l => l.material === item.name);
  const lootSources = lootEntry?.sources || [];

  const Section = ({ icon, label, color, rows }: {
    icon: string; label: string; color: string;
    rows: { name: string; quantity: number }[];
  }) => (
    <div className="mt-5 first:mt-1">
      <div className={`flex items-center gap-3 mb-3`}>
        <div className={`p-1.5 rounded bg-black/40 border border-white/5 shadow-inner`}>
          <span className={`material-symbols-outlined text-[18px] block ${color}`}>{icon}</span>
        </div>
        <span className={`text-[12px] font-black tracking-[0.3em] uppercase ${color}`}>{label}</span>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => {
          const imageUrl = getSourceImageUrl(r.name);
          const rarity = getItemRarity(r.name);
          const mat = MATERIALS_DATA.find(m => m.name === r.name);
          const borderStyle = getRarityBorderColor(rarity);
          const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');
          
          return (
            <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
              <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                {imageUrl ? (
                  <img src={imageUrl} alt={r.name} className="w-full h-full object-contain opacity-90" />
                ) : (
                  <span className={`material-symbols-outlined text-[20px] ${getRarityIconColor(rarity)}`}>{mat?.icon || 'category'}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-slate-100 font-bold truncate tracking-wide">{r.name}</span>
                <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                  {rarity}
                </span>
              </div>
              <span className={`ml-auto text-[14px] font-black ${color} shrink-0 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner`}>×{r.quantity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const LootSection = ({ sources }: { sources: { name: string; quantity: number; imageUrl?: string }[] }) => (
    <div className="mt-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 rounded bg-black/40 border border-white/5">
          <span className="material-symbols-outlined text-[18px] block text-violet-400">travel_explore</span>
        </div>
        <span className="text-[12px] font-black tracking-[0.3em] uppercase text-violet-400">SOURCE</span>
      </div>
      <div className="space-y-2">
        {sources.map((s, i) => {
          const rarity = getItemRarity(s.name);
          const borderStyle = getRarityBorderColor(rarity);
          const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');
          
          return (
            <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
              <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.name} className="w-full h-full object-contain opacity-80" />
                ) : (
                  <div className={`w-10 h-10 rounded bg-slate-800 ${imgBorderColor} shrink-0 flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-[20px] ${getRarityIconColor(rarity)}`}>inventory_2</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-slate-100 font-bold truncate tracking-wide">{s.name}</span>
                <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                  {rarity}
                </span>
              </div>
              <span className="ml-auto text-[14px] font-black text-violet-300 shrink-0 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner">×{s.quantity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const hasInfo =
    craftingReqs.length > 0 ||
    recycleReqs.length > 0 ||
    salvageReqs.length > 0 ||
    (item.obtainedFrom && item.obtainedFrom.length > 0) ||
    lootSources.length > 0 ||
    (item.requiredFor && item.requiredFor.length > 0);

  const tooltip = visible ? ReactDOM.createPortal(
    <div 
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-6 ${isShiftDown ? 'pointer-events-auto bg-black/40' : 'pointer-events-none'}`}
      onClick={closeTooltip}
    >
      <div
        ref={tooltipRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 440,
          maxHeight: '85vh',
          boxShadow: isShiftDown ? `0 0 100px ${rs.glow.replace('0.25', '0.5')}, 0 24px 64px rgba(0,0,0,0.9)` : `0 0 40px ${rs.glow}, 0 12px 32px rgba(0,0,0,0.7)`,
          pointerEvents: isShiftDown ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={`bg-[#0d1117]/95 backdrop-blur-2xl border-2 ${rs.border} rounded-[2rem] overflow-hidden animate-fade-in flex flex-col ${!isShiftDown ? 'scale-95 opacity-80' : ''}`}
      >
        {/* Top Status Bar */}
        <div className={`p-4 text-center text-[10px] font-black tracking-[0.4em] uppercase bg-white/5 border-b border-white/5 shrink-0 flex items-center justify-center relative ${isShiftDown ? rs.text : 'text-slate-500'}`}>
          {!isShiftDown ? (
            <div className="flex items-center gap-2">
                 <span>Press [SHIFT] to Lock & Inspect</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
            </div>
          ) : (
             <div className="flex items-center gap-2 w-full justify-center">
                 <span className="animate-bounce">Inspection Locked</span>
                 <button 
                  onClick={(e) => { e.stopPropagation(); closeTooltip(); }}
                  className="absolute right-4 w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:text-white rounded-full transition-colors text-slate-300"
                 >
                   <span className="material-symbols-outlined text-[14px]">close</span>
                 </button>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="p-6 flex items-center gap-5 border-b border-white/5 bg-white/[0.03] shrink-0 relative">
          {item?.imageUrl ? (
            <div className={`w-16 h-16 rounded-2xl bg-slate-800 p-3 flex items-center justify-center border-2 ${rs.border} shadow-2xl`}>
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-glow" />
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border-2 ${rs.border} shadow-2xl`}>
              <span className={`material-symbols-outlined text-4xl ${rs.text}`}>{item.icon || 'category'}</span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[22px] font-black text-white leading-tight tracking-wider mb-2">{item.name}</p>
            <div className="flex gap-2 flex-wrap">
              <span className={`text-[11px] font-black tracking-widest uppercase border-2 px-3 py-1 rounded-full leading-none ${rs.text} ${rs.border} bg-black/40 shadow-inner`}>
                {rarity}
              </span>
              {item.category && (
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full leading-none">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div 
          className="p-6 overflow-y-auto flex-1 custom-scrollbar" 
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${rs.glow} transparent` }}
          onWheel={(e) => {
            if (isShiftDown) {
              const container = e.currentTarget;
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                container.scrollTop += e.deltaX;
              }
            }
          }}
        >
          {(item.description && (item.category || item.weaponType) && item.category !== 'AUGMENT') && (
            <p className="text-[14px] text-slate-300 leading-relaxed font-bold italic border-l-4 border-white/10 pl-5 py-1 mb-5 opacity-80">
              "{item.description}"
            </p>
          )}

          {/* AUGMENT STATS GRID */}
          {item.category === 'AUGMENT' && (item.maxWeight || item.backpackSlots) && (
            <div className="mb-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'https://arcraiders.wiki/w/images/thumb/e/e8/Icon_Weight.png/22px-Icon_Weight.png.webp', label: 'WEIGHT', val: `${item.maxWeight} KG` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/7/7f/Icon_AllItems.png/30px-Icon_AllItems.png.webp', label: 'BACKPACK', val: `${item.backpackSlots} SLOTS` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/7/71/Icon_QuickUse.png/30px-Icon_QuickUse.png.webp', label: 'QUICK USE', val: `${item.quickUseSlots} SLOTS` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/6/67/Icon_SafePocket.png/30px-Icon_SafePocket.png.webp', label: 'SAFE POCKET', val: `${item.safePocketSlots} SLOTS` },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/[0.04] border border-white/5 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/[0.06] transition-colors">
                    <img src={stat.icon} className="w-7 h-7 object-contain opacity-70 group-hover/stat:opacity-100 transition-opacity" alt={stat.label} />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                      <span className="text-15px text-white font-black leading-none">{stat.val}</span>
                    </div>
                  </div>
                ))}
              </div>
              {item.shieldCompat && (
                <div className="flex items-center gap-4 bg-white/[0.04] border border-white/5 p-3 rounded-2xl shadow-inner group/stat hover:bg-white/[0.06] transition-colors">
                  <img src="https://arcraiders.wiki/w/images/thumb/6/61/Icon_Shield_I.png/25px-Icon_Shield_I.png.webp" className="w-8 h-8 object-contain opacity-70" alt="Shields" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">SHIELD COMPATIBILITY</span>
                    <span className="text-[12px] text-violet-300 font-black uppercase tracking-widest">{item.shieldCompat}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {item.perks && (
            <div className="mt-5 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-amber-400 text-[22px]">bolt</span>
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-amber-400">PERKS</span>
              </div>
              <p className="text-[14px] text-white font-black leading-relaxed">{item.perks}</p>
            </div>
          )}

          {/* ── USED IN (TOP PRIORITY) ── */}
          {item.requiredFor && item.requiredFor.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 rounded bg-black/40 border border-white/5">
                  <span className="material-symbols-outlined text-[18px] block text-primary">assignment_late</span>
                </div>
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-primary">USED IN</span>
              </div>
              <div className="space-y-2">
                {item.requiredFor.map((itemStr: string, i: number) => {
                  const { name, quantity } = parseMaterialString(itemStr);
                  const rarity = getItemRarity(name);
                  const imageUrl = getSourceImageUrl(name);
                  const borderStyle = getRarityBorderColor(rarity);
                  const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');

                  return (
                    <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
                      <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                        {imageUrl ? (
                          <img src={imageUrl} alt={name} className="w-full h-full object-contain opacity-80" />
                        ) : (
                          <span className={`material-symbols-outlined text-[20px] ${getRarityIconColor(rarity)}`}>category</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] text-slate-100 font-bold truncate tracking-wide">{name}</span>
                        <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                          {rarity}
                        </span>
                      </div>
                      <span className="ml-auto text-[14px] font-black text-primary shrink-0 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner">×{quantity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SOURCE ── */}
          {((item.obtainedFrom && item.obtainedFrom.length > 0) || lootSources.length > 0) && (
            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 rounded bg-black/40 border border-white/5">
                  <span className="material-symbols-outlined text-[18px] block text-violet-400">travel_explore</span>
                </div>
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-violet-400">SOURCE</span>
              </div>
              <div className="space-y-2">
                {(item.obtainedFrom || lootSources).map((srcItem: any, i: number) => {
                  const { name, quantity } = typeof srcItem === 'string' ? parseMaterialString(srcItem) : srcItem;
                  const imageUrl = getSourceImageUrl(name);
                  const rarity = getItemRarity(name);
                  const borderStyle = getRarityBorderColor(rarity);
                  const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');

                  return (
                    <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
                      <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                        {imageUrl ? (
                          <img src={imageUrl} alt={name} className="w-full h-full object-contain opacity-80" />
                        ) : (
                          <span className={`material-symbols-outlined text-[20px] ${getRarityIconColor(rarity)}`}>inventory_2</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] text-slate-100 font-bold truncate tracking-wide">{name}</span>
                        <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                          {rarity}
                        </span>
                      </div>
                      <span className="ml-auto text-[14px] font-black text-violet-300 shrink-0 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner">×{quantity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {craftingReqs.length > 0 && (
            <Section icon="precision_manufacturing" label="CRAFTING" color="text-sky-400" rows={craftingReqs} />
          )}
          {recycleReqs.length > 0 && (
            <Section icon="recycling" label="RECYCLING" color="text-emerald-400" rows={recycleReqs} />
          )}
          {salvageReqs.length > 0 && (
            <Section icon="build_circle" label="SALVAGING" color="text-amber-400" rows={salvageReqs} />
          )}
          
        </div>
        
        <div className={`p-4 text-center text-[11px] font-black tracking-[0.4em] uppercase bg-white/5 border-t border-white/5 shrink-0 ${isShiftDown ? rs.text : 'text-slate-500'}`}>
          {isShiftDown ? 'Scroll to view more details' : 'Move mouse away to close'}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div
      className="inline-block w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {tooltip}
    </div>
  );
};

export default RichTooltip;
