
import React from 'react';
import { Weapon } from '../types';
import { getRarityStyles, getRarityGlowStyles, getRarityIconColor, getRarityHoverStyles, getRarityBorderColor } from '../utils';
import RichTooltip from './RichTooltip';
import SmartItemIcon from './SmartItemIcon';

interface WeaponCardProps {
  weapon: Weapon;
  onClick?: (weapon: Weapon) => void;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, onClick }) => {

  return (
    <RichTooltip item={weapon}>
      <button
        onClick={() => onClick?.(weapon)}
        className={`group relative flex w-full bg-card-dark rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${getRarityBorderColor(weapon.rarity)} ${getRarityHoverStyles(weapon.rarity)}`}
      >
        {/* Background Rarity Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(weapon.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>
        
        {/* Scanline */}
        <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>

        <div className="flex items-center gap-6 p-4 w-full relative z-10">
          {/* Left: Image */}
          <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center bg-background-dark shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner overflow-hidden ${getRarityBorderColor(weapon.rarity)}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(weapon.rarity)} opacity-20`}></div>
            <SmartItemIcon
              itemName={weapon.name}
              icon={weapon.icon || 'swords'}
              rarity={weapon.rarity}
              imageClassName="w-14 h-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10"
              iconClassName="text-4xl relative z-10"
            />
          </div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-base md:text-xl font-black text-slate-100 group-hover:text-white transition-colors truncate tracking-wider mb-2">
              {weapon.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mt-1">
              {/* Rarity */}
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${getRarityStyles(weapon.rarity).split(' ').filter(s => !s.startsWith('border') && !s.startsWith('bg') && !s.startsWith('px') && !s.startsWith('py')).join(' ')}`}>
                {weapon.rarity}
              </span>
              
              {/* Weapon Type */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px] leading-none">settings_input_component</span>
                {weapon.weaponType}
              </div>
            </div>
          </div>
        </div>
      </button>
    </RichTooltip>
  );
};

export default WeaponCard;
