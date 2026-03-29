import React, { useState, useEffect } from 'react';
import { MATERIALS_DATA, LOOT_DATA, MODS_DATA, THROWABLES_DATA, AUGMENTS_DATA, WEAPONS_DATA } from '../data';

const GlobalMaterialTooltip: React.FC = () => {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Compatibilidade retroativa para 'data-material' e novo 'data-tooltip'
      const tooltipEl = target.closest('[data-material], [data-tooltip]');
      if (tooltipEl) {
        const name = tooltipEl.getAttribute('data-material') || tooltipEl.getAttribute('data-tooltip');
        
        let bx = e.clientX + 15;
        let by = e.clientY + 15;
        if (bx + 260 > window.innerWidth) bx = e.clientX - 275;
        if (by + 300 > window.innerHeight) by = e.clientY - 315;
        
        setPos({ x: bx, y: by });
        setHoveredName(name);
      } else {
        setHoveredName(null);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove, { capture: true });
  }, []);

  if (!hoveredName) return null;

  const itemInfo = 
    MATERIALS_DATA.find(m => m.name === hoveredName) ||
    MODS_DATA.find(m => m.name === hoveredName) ||
    THROWABLES_DATA.find(m => m.name === hoveredName) ||
    AUGMENTS_DATA.find(m => m.name === hoveredName) ||
    WEAPONS_DATA.find(m => m.name === hoveredName);

  if (!itemInfo) return null;

  const isWeapon = 'upgradeInfo' in itemInfo;
  
  const getRequirements = (reqs: any = []) => {
    // Se for um array de Tiers (como em Weapons), pegamos o Tier I por padrão para a miniatura
    let materialsList: any[] = [];
    if (Array.isArray(reqs) && reqs.length > 0 && 'tier' in reqs[0]) {
      materialsList = reqs[0].materials || [];
    } else if (Array.isArray(reqs)) {
      materialsList = reqs;
    }

    return materialsList.map(req => {
      const matInfo = MATERIALS_DATA.find(m => m.name === req.name) || 
                     MODS_DATA.find(m => m.name === req.name) ||
                     THROWABLES_DATA.find(m => m.name === req.name);
      return matInfo ? { ...matInfo, quantity: req.quantity } : null;
    }).filter(Boolean);
  };

  const materialLootData = LOOT_DATA.find(l => l.material === hoveredName);
  const sources = materialLootData?.sources || [];
  
  const recycleResults = getRequirements(itemInfo.recycleInfo) || [];
  const salvageResults = getRequirements('salvageInfo' in itemInfo ? itemInfo.salvageInfo : []) || [];

  return (
    <div 
      className="fixed z-[99999] pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in flex flex-col">
        {/* Top: Header w/ Stack Size */}
        <div className="bg-slate-800 border-b border-slate-700/50 flex items-center justify-between p-3 px-4">
            <span className="text-base font-black text-slate-200 truncate pr-2">{itemInfo.name}</span>
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded border border-white/5 shadow-inner">
                <span className="material-symbols-outlined text-base text-slate-400">layers</span>
                <span className="text-base font-black tracking-wider text-slate-300">{itemInfo.stackSize || 1}</span>
            </div>
        </div>

        {/* CRAFTING COST */}
        {('craftInfo' in itemInfo && itemInfo.craftInfo && (itemInfo.craftInfo as any).materials && (itemInfo.craftInfo as any).materials.length > 0) && (
          <div className="bg-slate-800/80 p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
               <span className="material-symbols-outlined text-blue-400 text-lg">precision_manufacturing</span>
               <h3 className="text-base font-black tracking-widest uppercase text-blue-400">CRAFTING COST</h3>
            </div>
            <div className="space-y-2">
              {getRequirements((itemInfo.craftInfo as any).materials).map((mat: any, i: number) => (
                 <div key={i} className="flex items-center gap-3 bg-black/30 rounded p-2 border-l-2 border-blue-500/50">
                   <div className="w-8 h-8 rounded border border-white/10 shrink-0 flex items-center justify-center p-1 bg-black/50 overflow-hidden">
                      {mat.imageUrl ? <img src={mat.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-base text-slate-400">{mat.icon}</span>}
                   </div>
                   <span className="text-base font-bold text-slate-300 truncate leading-none">{mat.name}</span>
                   <span className="text-base font-black text-blue-400 ml-auto leading-none">×{mat.quantity}</span>
                 </div>
              ))}
            </div>
          </div>
        )}

        {/* RECYCLING */}
        {(recycleResults.length > 0 || sources.length === 0) && (
          <div className="bg-slate-800/50 p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
               <span className="material-symbols-outlined text-emerald-400 text-lg">recycling</span>
               <h3 className="text-base font-black tracking-widest uppercase text-emerald-400">RECYCLING YIELD</h3>
            </div>
            {recycleResults.length > 0 ? (
               <div className="space-y-2">
                 {recycleResults.map((mat: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-black/30 rounded p-2 border-l-2 border-emerald-500/50">
                      <div className="w-8 h-8 rounded border border-white/10 shrink-0 flex items-center justify-center p-1 bg-black/50 overflow-hidden">
                         {mat.imageUrl ? <img src={mat.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-base text-slate-400">{mat.icon}</span>}
                      </div>
                      <span className="text-base font-bold text-slate-300 truncate leading-none">{mat.name}</span>
                      <span className="text-base font-black text-emerald-400 ml-auto leading-none">×{mat.quantity}</span>
                    </div>
                 ))}
               </div>
            ) : (
               <p className="text-base text-slate-500 italic uppercase tracking-wider font-semibold">Not recyclable</p>
            )}
          </div>
        )}

        {/* SALVAGING */}
        {(salvageResults.length > 0) && (
          <div className="bg-black/60 p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
               <span className="material-symbols-outlined text-amber-400 text-lg">build_circle</span>
               <h3 className="text-base font-black tracking-widest uppercase text-amber-400">SALVAGING YIELD</h3>
            </div>
            <div className="space-y-2">
              {salvageResults.map((mat: any, i: number) => (
                 <div key={i} className="flex items-center gap-3 bg-black/30 rounded p-2 border-l-2 border-amber-500/50">
                   <div className="w-8 h-8 rounded border border-white/10 shrink-0 flex items-center justify-center p-1 bg-black/50 overflow-hidden">
                      {mat.imageUrl ? <img src={mat.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-base text-slate-400">{mat.icon}</span>}
                   </div>
                   <span className="text-base font-bold text-slate-300 truncate leading-none">{mat.name}</span>
                   <span className="text-base font-black text-amber-400 ml-auto leading-none">×{mat.quantity}</span>
                 </div>
              ))}
            </div>
          </div>
        )}

        {/* FONTES DE RECICLAGEM (LOOT) */}
        {sources.length > 0 && (
          <div className="bg-slate-900/80 p-4">
            <div className="flex items-center gap-2 mb-3">
               <span className="material-symbols-outlined text-purple-400 text-lg">search</span>
               <h3 className="text-base font-black tracking-widest uppercase text-purple-400">FOUND IN (LOOT)</h3>
            </div>
               <div className="space-y-2">
                 {sources.slice(0, 4).map((src, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black/30 rounded p-2">
                      <div className="w-8 h-8 rounded border border-white/5 shrink-0 flex items-center justify-center p-1 bg-black/50 overflow-hidden">
                         {src.imageUrl ? <img src={src.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-base text-slate-500">inventory_2</span>}
                      </div>
                      <span className="text-base font-bold text-slate-300 truncate leading-none">{src.name}</span>
                      <span className="text-base font-black text-primary ml-auto leading-none">×{src.quantity}</span>
                    </div>
                 ))}
               </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalMaterialTooltip;
