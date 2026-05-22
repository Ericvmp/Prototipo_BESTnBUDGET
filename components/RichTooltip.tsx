
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LOOT_DATA, MATERIALS_DATA, WEAPONS_DATA, MODS_DATA, THROWABLES_DATA } from '../data';
import { parseMaterialString, getItemRarity, getRarityStyles, getRarityBorderColor, getRarityIconColor } from '../utils';
import SmartItemIcon from './SmartItemIcon';
import { useLanguage } from './LanguageContext';

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
  const { t, translateItemName, translateItemDesc, translateItemPerks } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const style = item?.rarity ? RARITY_STYLES[item.rarity] || RARITY_STYLES.COMMON : RARITY_STYLES.COMMON;
  const itemDesc = item ? translateItemDesc(item.name, item.description) : '';

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

  useEffect(() => {
    if (isShiftDown && visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isShiftDown, visible]);

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
          const rarity = getItemRarity(r.name);
          const mat = MATERIALS_DATA.find(m => m.name === r.name);
          const borderStyle = getRarityBorderColor(rarity);
          const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');
          
          return (
            <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
              <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                <SmartItemIcon itemName={r.name} icon={mat?.icon || 'category'} rarity={rarity} imageClassName="w-full h-full object-contain opacity-90" iconClassName={`text-[20px] ${getRarityIconColor(rarity)}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-slate-100 font-bold truncate tracking-wide">{translateItemName(r.name)}</span>
                <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                  {t(`rarity.${rarity.toLowerCase()}`)}
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
        <span className="text-[12px] font-black tracking-[0.3em] uppercase text-violet-400">{t('tooltip.source')}</span>
      </div>
      <div className="space-y-2">
        {sources.map((s, i) => {
          const rarity = getItemRarity(s.name);
          const borderStyle = getRarityBorderColor(rarity);
          const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');
          
          return (
            <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
              <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                <SmartItemIcon itemName={s.name} icon="inventory_2" rarity={rarity} imageClassName="w-full h-full object-contain opacity-80" iconClassName={`text-[20px] ${getRarityIconColor(rarity)}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-slate-100 font-bold truncate tracking-wide">{translateItemName(s.name)}</span>
                <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                  {t(`rarity.${rarity.toLowerCase()}`)}
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
                 <span>{t('tooltip.press_shift')}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
            </div>
          ) : (
             <div className="flex items-center gap-2 w-full justify-center">
                 <span className="animate-bounce">{t('tooltip.inspection_locked')}</span>
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
        {item.weaponType ? (
          <div className="p-6 flex flex-col items-center gap-4 border-b border-white/5 bg-white/[0.03] shrink-0 relative text-center">
            <div className={`w-48 h-48 rounded-3xl bg-slate-800 flex items-center justify-center border-2 ${rs.border} shadow-2xl p-4`}>
              <SmartItemIcon itemName={item.name} icon={item.icon || 'military_tech'} rarity={item.rarity} imageClassName="w-full h-full object-contain drop-shadow-glow" iconClassName={`text-6xl ${rs.text}`} />
            </div>
            <div className="flex flex-col items-center mt-2">
              <p className="text-[26px] font-black text-white leading-tight tracking-wider mb-3">{translateItemName(item.name)}</p>
              <div className="flex gap-2 flex-wrap justify-center">
                <span className={`text-[11px] font-black tracking-widest uppercase border-2 px-3 py-1 rounded-full leading-none ${rs.text} ${rs.border} bg-black/40 shadow-inner`}>
                  {t(`rarity.${rarity.toLowerCase()}`)}
                </span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full leading-none">
                  {t(`weapon_type.${item.weaponType?.toLowerCase()}`) || item.weaponType}
                </span>
                {item.purchasableFromCeleste && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <img src="https://arcraiders.wiki/w/images/5/54/Icon_Nature.png" alt="Seeds" className="w-3.5 h-3.5 object-contain drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                    <span className="text-white font-black font-mono text-[13px]">{item.celesteSeedCost}</span>
                    <span className="w-px h-3 bg-emerald-500/20 mx-1" />
                    <span className="material-symbols-outlined text-[14px] text-emerald-400">storefront</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 flex items-center gap-5 border-b border-white/5 bg-white/[0.03] shrink-0 relative">
            <div className={`w-16 h-16 rounded-2xl bg-slate-800 ${item?.imageUrl ? 'p-3' : ''} flex items-center justify-center border-2 ${rs.border} shadow-2xl`}>
              <SmartItemIcon itemName={item.name} icon={item.icon || 'category'} rarity={item.rarity} imageClassName="w-full h-full object-contain drop-shadow-glow" iconClassName={`text-4xl ${rs.text}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[22px] font-black text-white leading-tight tracking-wider mb-2">{translateItemName(item.name)}</p>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-[11px] font-black tracking-widest uppercase border-2 px-3 py-1 rounded-full leading-none ${rs.text} ${rs.border} bg-black/40 shadow-inner`}>
                  {t(`rarity.${rarity.toLowerCase()}`)}
                </span>
                {item.purchasableFromCeleste && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <img src="https://arcraiders.wiki/w/images/5/54/Icon_Nature.png" alt="Seeds" className="w-3.5 h-3.5 object-contain drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                    <span className="text-white font-black font-mono text-[13px]">{item.celesteSeedCost}</span>
                    <span className="w-px h-3 bg-emerald-500/20 mx-1" />
                    <span className="material-symbols-outlined text-[14px] text-emerald-400">storefront</span>
                  </div>
                )}
                {item.category && (
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest border border-slate-700 bg-slate-800/50 px-3 py-1 rounded-full leading-none">
                    {t(`category.${item.category.toLowerCase()}`) || item.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

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
          {(itemDesc && !item.weaponType && (item.category || item.weaponType) && item.category !== 'AUGMENT' && !['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK', 'OPTICS'].includes(item.category)) && (
            <p className="text-[14px] text-slate-300 leading-relaxed font-bold italic border-l-4 border-white/10 pl-5 py-1 mb-5 opacity-80">
              "{itemDesc}"
            </p>
          )}

          {/* MODS SPECIFIC */}
          {item.category && ['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK', 'OPTICS'].includes(item.category) && itemDesc && (
            <div className="mb-6 space-y-4">
              <div className="bg-black/20 border border-white/5 p-4 rounded-2xl shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">auto_awesome</span>
                  <span className="text-[12px] font-black tracking-[0.3em] uppercase text-emerald-400">{t('tooltip.bonus_stats')}</span>
                </div>
                <ul className="space-y-2">
                  {itemDesc.split(', ').map((stat: string, i: number) => {
                    const isNegative =
                      (stat.includes('Increased') && (stat.includes('Recoil') || stat.includes('Durability') || stat.includes('Equip') || stat.includes('Unequip') || stat.includes('Recovery Time'))) ||
                      stat.includes('Reduced ADS Speed') || stat.includes('Reduced Bullet Velocity');
                    return (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-1 material-symbols-outlined text-[14px] ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                          {isNegative ? 'remove' : 'add'}
                        </span>
                        <span className={`text-[12px] font-black uppercase tracking-widest ${isNegative ? 'text-red-300' : 'text-emerald-100'}`}>
                          {stat}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* COMPATIBLE WEAPONS */}
              <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-slate-400 text-[18px]">military_tech</span>
                  <span className="text-[12px] font-black tracking-[0.3em] uppercase text-slate-400">{t('tooltip.compatible_weapons')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {WEAPONS_DATA.filter(w => {
                    if (item.ammoCompatibility) return w.ammoType === item.ammoCompatibility;
                    if (item.weaponTypeCompatibility) return item.weaponTypeCompatibility.includes(w.weaponType);
                    return true;
                  }).map(w => (
                    <span key={w.id} className="text-[10px] font-bold px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 uppercase tracking-widest">
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AUGMENT STATS GRID */}
          {item.category === 'AUGMENT' && (item.maxWeight || item.backpackSlots) && (
            <div className="mb-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'https://arcraiders.wiki/w/images/thumb/e/e8/Icon_Weight.png/22px-Icon_Weight.png.webp', label: t('tooltip.weight'), val: `${item.maxWeight} KG` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/7/7f/Icon_AllItems.png/30px-Icon_AllItems.png.webp', label: t('tooltip.backpack'), val: `${item.backpackSlots} SLOTS` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/7/71/Icon_QuickUse.png/30px-Icon_QuickUse.png.webp', label: t('tooltip.quick_use'), val: `${item.quickUseSlots} SLOTS` },
                  { icon: 'https://arcraiders.wiki/w/images/thumb/6/67/Icon_SafePocket.png/30px-Icon_SafePocket.png.webp', label: t('tooltip.safe_pocket'), val: `${item.safePocketSlots} SLOTS` },
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
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">{t('tooltip.shield_compat')}</span>
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
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-amber-400">{t('tooltip.perks')}</span>
              </div>
              <p className="text-[14px] text-white font-black leading-relaxed">{translateItemPerks(item.name, item.perks)}</p>
            </div>
          )}

          {/* ── USED IN (TOP PRIORITY) ── */}
          {item.requiredFor && item.requiredFor.length > 0 && (
            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 rounded bg-black/40 border border-white/5">
                  <span className="material-symbols-outlined text-[18px] block text-primary">assignment_late</span>
                </div>
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-primary">{t('tooltip.used_in')}</span>
              </div>
              <div className="space-y-2">
                {item.requiredFor.map((itemStr: string, i: number) => {
                  const { name, quantity } = parseMaterialString(itemStr);
                  const rarity = getItemRarity(name);
                  const borderStyle = getRarityBorderColor(rarity);
                  const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');

                  return (
                    <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
                      <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                        <SmartItemIcon itemName={name} icon="category" rarity={rarity} imageClassName="w-full h-full object-contain opacity-80" iconClassName={`text-[20px] ${getRarityIconColor(rarity)}`} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] text-slate-100 font-bold truncate tracking-wide">{translateItemName(name)}</span>
                        <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                          {t(`rarity.${rarity.toLowerCase()}`)}
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
                <span className="text-[12px] font-black tracking-[0.3em] uppercase text-violet-400">{t('tooltip.source')}</span>
              </div>
              <div className="space-y-2">
                {(item.obtainedFrom || lootSources).map((srcItem: any, i: number) => {
                  const { name, quantity } = typeof srcItem === 'string' ? parseMaterialString(srcItem) : srcItem;
                  const rarity = getItemRarity(name);
                  const borderStyle = getRarityBorderColor(rarity);
                  const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');

                  return (
                    <div key={i} className={`flex items-center gap-4 p-2.5 rounded-xl bg-white/[0.04] ${borderStyle} transition-colors hover:bg-white/[0.08]`}>
                      <div className={`w-10 h-10 rounded bg-slate-800 p-1.5 ${imgBorderColor} shrink-0 flex items-center justify-center shadow-inner`}>
                        <SmartItemIcon itemName={name} icon="inventory_2" rarity={rarity} imageClassName="w-full h-full object-contain opacity-80" iconClassName={`text-[20px] ${getRarityIconColor(rarity)}`} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] text-slate-100 font-bold truncate tracking-wide">{translateItemName(name)}</span>
                        <span className={`text-[9px] uppercase font-black leading-none ${getRarityIconColor(rarity)}`}>
                          {t(`rarity.${rarity.toLowerCase()}`)}
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
            <Section icon="precision_manufacturing" label={t('tooltip.crafting')} color="text-sky-400" rows={craftingReqs} />
          )}
          {recycleReqs.length > 0 && (
            <Section icon="recycling" label={t('tooltip.recycling')} color="text-emerald-400" rows={recycleReqs} />
          )}
          {salvageReqs.length > 0 && (
            <Section icon="build_circle" label={t('tooltip.salvaging')} color="text-amber-400" rows={salvageReqs} />
          )}
          
        </div>
        
        <div className={`p-4 text-center text-[11px] font-black tracking-[0.4em] uppercase bg-white/5 border-t border-white/5 shrink-0 ${isShiftDown ? rs.text : 'text-slate-500'}`}>
          {isShiftDown ? t('tooltip.scroll_more') : t('tooltip.move_mouse')}
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
