import React, { useState } from 'react';
import { Modification } from '../types';
import { getRarityStyles, getRarityIconColor, getRarityGlowStyles, getSourceImageUrl, getRarityHoverStyles } from '../utils';

interface ModCardProps {
  mod: Modification;
  onClick?: (mod: Modification) => void;
}

const ModCard: React.FC<ModCardProps> = ({ mod, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick?.(mod)}
      className={`text-left relative bg-card-dark border-2 border-slate-800 hover:ring-8 hover:ring-inset rounded-lg overflow-hidden transition-all duration-300 group flex flex-col h-full shadow-lg active:scale-95 ${getRarityHoverStyles(mod.rarity)}`}
    >
      {/* Background Rarity Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(mod.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

      <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center gap-4 relative z-10 w-full">
        <div className="w-16 h-16 rounded-lg bg-background-dark border border-slate-700 flex items-center justify-center p-2 shrink-0">
          {mod.imageUrl && !imageError ? (
            <img 
              src={mod.imageUrl} 
              alt={mod.name} 
              onError={() => setImageError(true)}
              className="w-full h-full object-contain transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
            />
          ) : (
            <span className={`material-symbols-outlined text-2xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${getRarityIconColor(mod.rarity)}`}>{mod.icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-md font-bold text-slate-100 group-hover:text-white transition-colors truncate">{mod.name}</h3>
          <div className="flex gap-2 mt-0.5">
            <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded inline-block border ${getRarityStyles(mod.rarity)}`}>
              {mod.rarity}
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter rounded border border-slate-700 px-1.5 py-0.5 inline-block">
              {mod.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-1 w-full relative z-10">
        <div className={`flex-1 bg-background-dark rounded p-2 border border-slate-800/50 transition-colors
          ${mod.rarity === 'COMMON' ? 'group-hover:border-slate-400/30' :
            mod.rarity === 'UNCOMMON' ? 'group-hover:border-emerald-400/30' :
            mod.rarity === 'RARE' ? 'group-hover:border-blue-400/30' :
            mod.rarity === 'EPIC' ? 'group-hover:border-fuchsia-400/30' :
            'group-hover:border-amber-500/30'
          }`}>
          
          <div className="space-y-1.5">
            {mod.materials && mod.materials.length > 0 ? (
              mod.materials.map((mat, idx) => {
                const matImageUrl = getSourceImageUrl(mat.name);
                return (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 flex items-center gap-2">
                       <div className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center p-0.5 shrink-0">
                         {matImageUrl ? (
                           <img src={matImageUrl} alt={mat.name} className="w-full h-full object-contain" />
                         ) : (
                           <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                         )}
                       </div>
                       <span className="truncate">{mat.name}</span>
                    </span>
                    <span className="text-white font-mono bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">{mat.quantity}</span>
                  </div>
                );
              })
            ) : (
                <div className="flex justify-center items-center py-2 h-full">
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase text-red-500/60 border border-red-500/20 bg-red-500/5 px-3 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    NOT CRAFTABLE
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scanline */}
      <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
    </button>
  );
};

export default ModCard;
