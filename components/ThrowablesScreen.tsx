
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
        className={`group relative w-full h-full min-h-[220px] bg-card-dark rounded-xl border ${getRarityBorderColor(item.rarity)} hover:ring-8 hover:ring-inset overflow-hidden flex flex-col items-center p-2 transition-all duration-300 active:scale-95 shadow-lg ${getRarityHoverStyles(item.rarity)}`}
      >
        {/* Background Rarity Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(item.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

        {/* Rarity Badge — top left */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-[0.2em] ${getRarityStyles(item.rarity)}`}>
            {item.rarity}
          </span>
        </div>

        {/* Stack Badge — top right (icon + number only) */}
        {'stackSize' in item && (
          <div className="absolute top-2 right-2 z-10">
            <span className="flex items-center gap-1 text-[11px] font-black px-1.5 py-0.5 rounded border border-slate-600 bg-slate-900/80 text-slate-300 shadow-inner shadow-black/50">
              <span className="material-symbols-outlined text-[13px] text-slate-400">layers</span>
              {(item as Throwable).stackSize || 1}
            </span>
          </div>
        )}

        {/* Image / Icon */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full min-h-[140px] px-2 py-4">
          {item.imageUrl && !imageError ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              onError={() => setImageError(true)}
              className="w-full h-full max-h-[120px] object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
            />
          ) : (
            <span className={`material-symbols-outlined text-6xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${getRarityIconColor(item.rarity)}`}>
              {item.icon || 'military_tech'}
            </span>
          )}
        </div>

        {/* Name Footer */}
        <div className="relative z-10 w-full text-center mt-auto border-t border-slate-800/50 pt-3 pb-2 px-3 bg-slate-900/40 min-w-0">
          <h3 className="text-sm md:text-base font-black text-slate-100 group-hover:text-white transition-colors truncate uppercase tracking-widest block w-full">
            {item.name}
          </h3>
        </div>

        {/* Scanline */}
        <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
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
          <h2 className="text-3xl font-black tracking-[0.3em] text-white drop-shadow-glow uppercase">TACTICAL</h2>
          <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase mt-1 opacity-70">Support &amp; Tactical Inventory</p>
        </div>
      </div>

      <div className="space-y-16">
        {['THROWABLES', 'SHIELDS', 'DEFENSIVE', 'QUICK USE'].map(section => {
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

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
