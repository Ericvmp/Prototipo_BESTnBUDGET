import React, { useState, useEffect } from 'react';
import { MATERIALS_DATA, LOOT_DATA } from '../data';

const GlobalMaterialTooltip: React.FC = () => {
  const [hoveredMaterial, setHoveredMaterial] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find closest element with data-material attribute
      const matEl = target.closest('[data-material]');
      if (matEl) {
        const matName = matEl.getAttribute('data-material');
        
        let bx = e.clientX + 15;
        let by = e.clientY + 15;
        // Basic overflow prevention
        if (bx + 260 > window.innerWidth) bx = e.clientX - 275;
        if (by + 200 > window.innerHeight) by = e.clientY - 215;
        
        setPos({ x: bx, y: by });
        setHoveredMaterial(matName);
      } else {
        setHoveredMaterial(null);
      }
    };
    
    // Use capture phase to ensure it triggers early and correctly
    window.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove, { capture: true });
  }, []);

  if (!hoveredMaterial) return null;

  const material = MATERIALS_DATA.find(m => m.name === hoveredMaterial);
  const materialLootData = LOOT_DATA.find(l => l.material === hoveredMaterial);

  if (!material) return null;

  const sources = materialLootData?.sources || [];
  const getRequirements = (reqs: any[] = []) => reqs.map(req => {
      const matInfo = MATERIALS_DATA.find(m => m.name === req.name);
      return matInfo ? { ...matInfo, quantity: req.quantity } : null;
  }).filter(Boolean);
  const recycleResults = getRequirements(material.recycleInfo) || [];

  return (
    <div 
      className="fixed z-[99999] pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in flex flex-col">
        {/* Top: FONTES DE RECICLAGEM (RECYCLED FROM) */}
        <div className="bg-slate-800/80 p-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
             <span className="material-symbols-outlined text-yellow-400 text-[14px]">recycling</span>
             <h3 className="text-[10px] font-black tracking-widest uppercase text-yellow-400">RECYCLED FROM</h3>
          </div>
          {sources.length > 0 ? (
             <div className="space-y-1">
               {sources.slice(0, 4).map((src, i) => (
                  <div key={i} className="flex items-center gap-2 bg-black/20 rounded p-1">
                    <div className="w-5 h-5 rounded border border-white/5 shrink-0 flex items-center justify-center p-0.5 bg-black/40 overflow-hidden">
                       {src.imageUrl ? <img src={src.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-[10px] text-slate-500">inventory_2</span>}
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 truncate leading-none">{src.name}</span>
                    <span className="text-[10px] font-black text-primary ml-auto leading-none">×{src.quantity}</span>
                  </div>
               ))}
             </div>
          ) : (
             <p className="text-[9px] text-slate-500 italic uppercase tracking-wider">No known sources</p>
          )}
        </div>
        
        {/* Bottom: RECYCLING */}
        <div className="bg-black/40 p-3">
          <div className="flex items-center gap-2 mb-2">
             <span className="material-symbols-outlined text-emerald-400 text-[14px]">recycling</span>
             <h3 className="text-[10px] font-black tracking-widest uppercase text-emerald-400">RECYCLING</h3>
          </div>
          {recycleResults.length > 0 ? (
             <div className="space-y-1">
               {recycleResults.map((mat: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-black/20 rounded p-1">
                    <div className="w-5 h-5 rounded border border-white/5 shrink-0 flex items-center justify-center p-0.5 bg-black/40 overflow-hidden">
                       {mat.imageUrl ? <img src={mat.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-[10px] text-slate-400">{mat.icon}</span>}
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 truncate leading-none">{mat.name}</span>
                    <span className="text-[10px] font-black text-primary ml-auto leading-none">×{mat.quantity}</span>
                  </div>
               ))}
             </div>
          ) : (
             <p className="text-[9px] text-slate-500 italic uppercase tracking-wider">Not recyclable</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMaterialTooltip;
