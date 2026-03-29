import React, { useState } from 'react';
import { Modification } from '../types';
import { getRarityStyles, getRarityIconColor, getRarityGlowStyles, getSourceImageUrl, getRarityHoverStyles } from '../utils';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';

interface ModCardProps {
  mod: Modification;
  onClick?: (mod: Modification) => void;
}

const ModCard: React.FC<ModCardProps> = ({ mod, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <RichTooltip item={mod}>
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
          <h3 className="text-lg font-black text-slate-100 group-hover:text-white transition-colors truncate">{mod.name}</h3>
          <div className="flex gap-2 mt-0.5">
            <span className={`text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded inline-block border ${getRarityStyles(mod.rarity)}`}>
              {mod.rarity}
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter rounded border border-slate-700 px-1.5 py-0.5 inline-block">
              {mod.category}
            </span>
          </div>
        </div>

        {/* Stack Size Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded border border-slate-600 bg-slate-800 text-slate-300 uppercase tracking-widest shadow-inner shadow-black/50" title="Stack Size">
            <span className="material-symbols-outlined text-[12px] text-slate-400">layers</span>
            {mod.stackSize || 1}
          </span>
        </div>
      </div>
      
      {/* Scanline */}
      <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
    </button>
    </RichTooltip>
  );
};

export default ModCard;
