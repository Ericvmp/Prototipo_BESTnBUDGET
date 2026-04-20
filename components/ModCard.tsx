import React, { useState } from 'react';
import { Modification } from '../types';
import { getRarityStyles, getRarityIconColor, getRarityGlowStyles, getRarityHoverStyles, getRarityBorderColor } from '../utils';
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
        className={`group relative w-full h-full min-h-[220px] bg-card-dark rounded-xl border ${getRarityBorderColor(mod.rarity)} hover:ring-8 hover:ring-inset overflow-hidden flex flex-col items-center p-2 transition-all duration-300 active:scale-95 shadow-lg ${getRarityHoverStyles(mod.rarity)}`}
      >
        {/* Background Rarity Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(mod.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

        {/* Rarity Badge — top left */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-[0.2em] ${getRarityStyles(mod.rarity)}`}>
            {mod.rarity}
          </span>
        </div>

        {/* Stack Badge — top right */}
        <div className="absolute top-2 right-2 z-10">
          <span className="flex items-center gap-1 text-[11px] font-black px-1.5 py-0.5 rounded border border-slate-600 bg-slate-900/80 text-slate-300 shadow-inner shadow-black/50">
            <span className="material-symbols-outlined text-[13px] text-slate-400">layers</span>
            {mod.stackSize || 1}
          </span>
        </div>

        {/* Image / Icon */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full min-h-[140px] px-2 py-4">
          {mod.imageUrl && !imageError ? (
            <img
              src={mod.imageUrl}
              alt={mod.name}
              onError={() => setImageError(true)}
              className="w-full h-full max-h-[120px] object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
            />
          ) : (
            <span className={`material-symbols-outlined text-6xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${getRarityIconColor(mod.rarity)}`}>
              {mod.icon}
            </span>
          )}
        </div>

        {/* Name Footer */}
        <div className="relative z-10 w-full text-center mt-auto border-t border-slate-800/50 pt-3 pb-2 px-3 bg-slate-900/40 min-w-0">
          <h3 className="text-sm md:text-base font-black text-slate-100 group-hover:text-white transition-colors truncate uppercase tracking-widest block w-full">
            {mod.name}
          </h3>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{mod.category}</p>
        </div>

        {/* Scanline */}
        <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
      </button>
    </RichTooltip>
  );
};

export default ModCard;
