
import React from 'react';
import { BLUEPRINTS_DATA } from '../blueprintData';
import RichTooltip from './RichTooltip';
import { findFullItem, getItemRarity, getRarityIconColor, getRarityBorderColor, getRarityGlowStyles, getRarityHoverStyles } from '../utils';

interface BlueprintsScreenProps {
  onBack: () => void;
}

const BLUEPRINT_COLOR = '#135bec';

const BlueprintsScreen: React.FC<BlueprintsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      {/* Background Blueprint Grid (Full Screen) */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      <div 
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <main className="flex-1 flex flex-col p-4 md:p-6 pb-32 relative z-10 animate-fade-in w-full mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-blue-500/20 rounded-2xl text-slate-400 hover:text-blue-400 transition-all border border-white/10 shadow-2xl group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </button>
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-glow uppercase italic">
                BLUEPRINTS
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-blue-500/5 border border-blue-500/20 px-6 py-3 rounded-2xl backdrop-blur-md">
              <p className="text-sm font-black text-blue-400 tracking-[0.2em] uppercase">
                TOTAL: <span className="text-white">{BLUEPRINTS_DATA.length}</span> BLUEPRINTS
              </p>
            </div>
          </div>
        </div>

        {/* Grid — 9 columns as requested (10x9 total) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4"
        >
          {BLUEPRINTS_DATA.map((bp, index) => {
            const fullItem = findFullItem(bp.name);
            const rarity = getItemRarity(bp.name);
            
            // If we find the item in our database, we use it for the tooltip.
            const tooltipItem = fullItem || {
              name: bp.name,
              rarity: rarity,
              icon: 'architecture'
            };

            const rarityBorder = getRarityBorderColor(rarity);

            return (
              <div
                key={bp.id}
                className={`group relative aspect-square rounded-2xl bg-card-dark transition-all duration-300 overflow-hidden shadow-lg animate-fade-in ${rarityBorder} ${getRarityHoverStyles(rarity)}`}
                style={{
                  animationDelay: `${Math.min(index * 10, 1000)}ms`,
                }}
              >
                {/* Background Rarity Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none z-10`}></div>

                {/* Blueprint Internal Grid */}
                <div 
                  className="absolute inset-0 z-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700"
                  style={{ 
                    backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
                    backgroundSize: '15% 15%'
                  }}
                />


                {/* Scanline */}
                <div className="scanline-overlay absolute inset-0 opacity-[0.02] z-20 pointer-events-none" />

                {/* Item Image */}
                <div className="relative z-30 flex-1 flex items-center justify-center p-4 pb-0" style={{ height: 'calc(100% - 36px)' }}>
                  {bp.image ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                       {/* Shadow fallback */}
                       <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-40"></div>
                       <img
                         src={bp.image}
                         alt={bp.name}
                         className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_25px_rgba(19,91,236,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                       />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110">
                      <span className="material-symbols-outlined text-5xl" style={{ color: BLUEPRINT_COLOR }}>architecture</span>
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white">No-Data</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-t border-white/5 py-1.5 px-1 text-center group-hover:bg-blue-900/60 transition-colors duration-500 min-h-[32px] flex items-center justify-center">
                  <div
                    className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.05em] text-slate-200 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-[1.1] break-words w-full"
                  >
                    {bp.name}
                  </div>
                </div>

                {/* Corner accents (Techy) */}
                <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute top-2 left-2 w-full h-[1px] bg-blue-400" />
                  <div className="absolute top-2 left-2 w-[1px] h-full bg-blue-400" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[100px] w-full pointer-events-none" />
      </main>
    </div>
  );
};

export default BlueprintsScreen;



