
import React from 'react';
import { Throwable, Augment } from '../types';
import { getRarityGlowStyles, getRarityIconColor, getRarityStyles, getRarityHoverStyles } from '../utils';

interface ThrowablesScreenProps {
  data: Throwable[];
  augmentsData?: Augment[];
  onBack: () => void;
  onItemSelect: (item: Throwable | Augment) => void;
}

const TacticalCard: React.FC<{ item: Throwable | Augment; onClick: (item: Throwable | Augment) => void }> = ({ item, onClick }) => {
  return (
    <button
      onClick={() => onClick(item)}
      data-tooltip={item.name}
      className={`relative bg-card-dark border-2 border-slate-800 hover:ring-8 hover:ring-inset rounded-xl overflow-hidden transition-all duration-300 group flex flex-col h-full active:scale-[0.98] shadow-lg ${getRarityHoverStyles(item.rarity)}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(item.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>

      {/* Stack Size Badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className="flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded border border-slate-600 bg-slate-800 text-slate-300 uppercase tracking-widest shadow-inner" title="Stack Size">
          <span className="material-symbols-outlined text-[10px] text-slate-400">layers</span>
          {item.stackSize || 1}
        </span>
      </div>
      
      <div className="p-4 flex items-center gap-4 relative z-10">
        <div className="w-20 h-20 rounded-xl bg-background-dark border border-slate-700 flex items-center justify-center p-2 shrink-0 group-hover:bg-slate-800 transition-colors">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />
          ) : (
            <span className={`material-symbols-outlined text-4xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${getRarityIconColor(item.rarity)}`}>{item.icon || 'military_tech'}</span>
          )}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h3 className="text-lg font-black text-slate-100 group-hover:text-white transition-colors truncate">{item.name}</h3>
          <div className="flex gap-2 mt-1">
            <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded inline-block border ${getRarityStyles(item.rarity)}`}>
              {item.rarity}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter rounded border border-slate-700 px-2 py-0.5 inline-block">
              {item.category || 'TACTICAL'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
    </button>
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
          <h2 className="text-3xl font-black tracking-[0.3em] uppercase text-white drop-shadow-glow">TACTICAL GEAR</h2>
          <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase mt-1 opacity-70">Equipment & Augmentation Cache</p>
        </div>
      </div>

      <div className="space-y-16">
        {['THROWABLES', 'SHIELDS', 'DEFENSIVE'].map(section => {
          const sectionItems = data.filter(item => item.category === section);
          if (sectionItems.length === 0) return null;

          return (
            <div key={section} className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(19,91,236,1)] animate-pulse"></span>
                    <h3 className="text-sm font-black tracking-[0.4em] uppercase text-white/90">
                      {section}
                    </h3>
                 </div>
                 <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-sm font-black tracking-[0.4em] uppercase text-white/90">
                    AUGMENTS
                  </h3>
               </div>
               <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
