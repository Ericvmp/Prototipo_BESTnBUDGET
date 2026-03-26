
import React, { useState } from 'react';
import { Weapon } from '../types';
import { getRarityStyles, getRarityGlowStyles, getRarityIconColor, getRarityHoverStyles } from '../utils';

interface WeaponCardProps {
  weapon: Weapon;
  onClick?: (weapon: Weapon) => void;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={() => onClick?.(weapon)}
      className={`group relative aspect-square bg-card-dark rounded-xl border-2 border-slate-800 hover:ring-8 hover:ring-inset overflow-hidden flex flex-col items-center justify-center p-2 transition-all duration-300 active:scale-95 shadow-lg ${getRarityHoverStyles(weapon.rarity)}`}
    >
      {/* Background Rarity Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(weapon.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

      {/* Rarity Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest ${getRarityStyles(weapon.rarity)}`}>
          {weapon.rarity}
        </span>
      </div>

      {/* Weapon Content (Image or Icon) */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-2">
        {weapon.imageUrl && !imageError ? (
          <img
            src={weapon.imageUrl}
            alt={weapon.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <span className={`material-symbols-outlined text-6xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${getRarityIconColor(weapon.rarity)}`}>
            {weapon.icon}
          </span>
        )}
      </div>

      {/* Name */}
      <div className="relative z-10 w-full text-center mt-1 border-t border-slate-800/50 pt-2 pb-1">
        <h3 className="text-[11px] font-bold tracking-widest uppercase text-slate-100 group-hover:text-white transition-colors">
          {weapon.name}
        </h3>
      </div>

      {/* Scanline */}
      <div className="scanline-overlay absolute inset-0 opacity-10"></div>
    </button>
  );
};

export default WeaponCard;
