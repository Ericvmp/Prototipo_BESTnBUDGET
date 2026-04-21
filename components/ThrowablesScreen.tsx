
import React, { useState } from 'react';
import { Throwable, Augment } from '../types';
import { getRarityGlowStyles, getRarityIconColor, getRarityStyles, getRarityHoverStyles, getRarityBorderColor } from '../utils';
import RichTooltip from './RichTooltip';

interface ThrowablesScreenProps {
  data: Throwable[];
  augmentsData?: Augment[];
  onBack: () => void;
  onItemSelect: (item: Throwable | Augment) => void;
}

const TacticalCard: React.FC<{ item: Throwable | Augment; onClick: (item: Throwable | Augment) => void }> = ({ item, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <RichTooltip item={item}>
      <button
        onClick={() => onClick(item)}
        className={`group relative flex w-full bg-card-dark rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${getRarityBorderColor(item.rarity)} ${getRarityHoverStyles(item.rarity)}`}
      >
        {/* Background Rarity Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(item.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>
        
        {/* Scanline */}
        <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>

        <div className="flex items-center gap-6 p-4 w-full relative z-10">
          {/* Left: Image */}
          <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center bg-background-dark shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner overflow-hidden ${getRarityBorderColor(item.rarity)}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(item.rarity)} opacity-20`}></div>
            {item.imageUrl && !imageError ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={() => setImageError(true)}
                className="w-14 h-14 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10"
              />
            ) : (
              <span className={`material-symbols-outlined text-4xl relative z-10 ${getRarityIconColor(item.rarity)}`}>
                {item.icon || 'military_tech'}
              </span>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-base md:text-xl font-black text-slate-100 group-hover:text-white transition-colors truncate tracking-wider mb-2">
              {item.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mt-1">
              {/* Rarity */}
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${getRarityStyles(item.rarity).split(' ').filter(s => !s.startsWith('border') && !s.startsWith('bg') && !s.startsWith('px') && !s.startsWith('py')).join(' ')}`}>
                {item.rarity}
              </span>
              
              {/* Stack */}
              {'stackSize' in item && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[16px] leading-none">layers</span>
                  {(item as Throwable).stackSize || 1}
                </div>
              )}

              {/* Category */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px] leading-none">category</span>
                {item.category}
              </div>
            </div>
          </div>
        </div>
      </button>
    </RichTooltip>
  );
};

const ThrowablesScreen: React.FC<ThrowablesScreenProps> = ({ data, augmentsData, onBack, onItemSelect }) => {
  return (
    <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5 shadow-xl">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div>
          <h2 className="text-3xl font-black tracking-[0.3em] text-white drop-shadow-glow uppercase">EQUIPMENT</h2>
          <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase mt-1 opacity-70">Support &amp; Equipment Inventory</p>
        </div>
      </div>

      <div className="space-y-16">
        {['GRENADES', 'SHIELDS', 'HEALING', 'UTILITY'].map(section => {
          const sectionItems = data.filter(item => item.category === section);
          if (sectionItems.length === 0) return null;

          return (
            <div key={section} className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(19,91,236,1)] animate-pulse"></span>
                    <h3 className="text-sm font-black tracking-[0.4em] text-white/90">
                      {section}
                    </h3>
                 </div>
                 <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {sectionItems.map(item => (
                  <TacticalCard key={item.id} item={item} onClick={onItemSelect} />
                ))}
              </div>
            </div>
          );
        })}

        {/* AUGMENTS SECTION */}
        {augmentsData && augmentsData.length > 0 && (
          <div className="space-y-8 pt-12 border-t border-slate-800 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(19,91,236,1)] animate-pulse"></span>
                  <h3 className="text-sm font-black tracking-[0.4em] text-white/90">
                    AUGMENTS
                  </h3>
               </div>
               <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {augmentsData.map(item => (
                <TacticalCard key={item.id} item={item} onClick={onItemSelect} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ThrowablesScreen;
