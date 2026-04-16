
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MODS_DATA } from '../data';
import { SetupDetail } from '../types';

interface SetupTooltipProps {
  setup: SetupDetail;
  tier: 'S' | 'A';
  children: React.ReactNode;
}

const TIER_STYLES = {
  S: { border: 'border-amber-400', text: 'text-amber-400', glow: 'rgba(251,191,36,0.25)', bg: 'bg-amber-400/5' },
  A: { border: 'border-fuchsia-500', text: 'text-fuchsia-400', glow: 'rgba(232,121,249,0.25)', bg: 'bg-fuchsia-500/5' },
};

const SetupTooltip: React.FC<SetupTooltipProps> = ({ setup, tier, children }) => {
  const [visible, setVisible] = useState(false);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const style = TIER_STYLES[tier];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === 'Shift' && visible) {
        setIsShiftDown(prev => !prev); 
      }
      if (e.key === 'Escape') {
        setIsShiftDown(false);
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  const closeTooltip = () => {
    setIsShiftDown(false);
    setVisible(false);
  };

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => { if (!isShiftDown) setVisible(false); };

  const tooltip = visible ? ReactDOM.createPortal(
    <div 
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-4 ${isShiftDown ? 'pointer-events-auto bg-black/40' : 'pointer-events-none'}`}
      onClick={closeTooltip}
    >
      <div
        ref={tooltipRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 440,
          maxHeight: '85vh',
          boxShadow: isShiftDown ? `0 0 100px ${style.glow.replace('0.25', '0.5')}, 0 20px 60px rgba(0,0,0,0.9)` : `0 0 40px ${style.glow}, 0 10px 30px rgba(0,0,0,0.7)`,
          pointerEvents: isShiftDown ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={`bg-[#0d1117]/95 backdrop-blur-xl border-2 ${style.border} rounded-3xl overflow-hidden animate-fade-in flex flex-col ${!isShiftDown && 'scale-95 opacity-80'}`}
      >
        {/* Header - Fixed at top of tooltip */}
        <div className={`p-6 border-b border-white/5 ${style.bg} shrink-0 relative`}>
          {!isShiftDown && (
            <div className="absolute top-2 right-6 flex items-center gap-2">
                 <span className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">Press [SHIFT] to Lock & Inspect</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
            </div>
          )}
          {isShiftDown && (
             <div className="absolute top-2 right-6 flex items-center gap-2">
                 <span className={`text-[9px] font-black tracking-[0.2em] uppercase animate-bounce ${style.text}`}>Inspection Locked</span>
                 <button 
                  onClick={(e) => { e.stopPropagation(); closeTooltip(); }}
                  className="w-5 h-5 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                 >
                   <span className="material-symbols-outlined text-[14px] text-white">close</span>
                 </button>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
              <span className={`text-[12px] font-black tracking-[0.5em] uppercase ${style.text}`}>TACTICAL INSPECTOR · TIER {tier}</span>
              <span className="material-symbols-outlined text-[24px] text-white/20">verified_user</span>
          </div>
          <h3 className="text-[26px] font-black text-white uppercase tracking-wider leading-tight">{setup.focus}</h3>
        </div>

        {/* Body - Scrollable */}
        <div 
          className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1" 
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${tier === 'S' ? '#fbbf24' : '#d946ef'}40 transparent` }}
          onWheel={(e) => {
            if (isShiftDown) {
              const container = e.currentTarget;
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                container.scrollTop += e.deltaX;
              }
            }
          }}
        >
          <p className="text-[15px] text-slate-300 font-bold leading-relaxed border-l-4 border-white/10 pl-5 py-1 italic">
            {setup.description}
          </p>

          <div className="space-y-4">
              <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-[18px] text-slate-500">settings</span>
                  <span className="text-[12px] font-black tracking-[0.3em] text-slate-500 uppercase">LOADOUT COMPONENTS</span>
              </div>
              {setup.modIds.map(modId => {
                  const mod = MODS_DATA.find(m => m.id === modId);
                  if (!mod) return null;
                  return (
                      <div key={modId} className="flex items-center gap-5 p-4 bg-white/[0.04] border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group/item">
                          <div className="w-14 h-14 rounded-2xl bg-slate-800 p-2.5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner group-hover/item:border-white/30 transition-colors">
                              <img src={mod.imageUrl} alt={mod.name} className="w-full h-full object-contain drop-shadow-glow" />
                          </div>
                          <div className="flex flex-col min-w-0">
                              <span className="text-[15px] font-black text-slate-100 truncate uppercase tracking-wide">{mod.name.replace('Extended ', '').replace('III', '3').replace('II', '2').replace('I', '1')}</span>
                              <div className="flex items-center gap-2 mt-0.5 mb-2">
                                  <span className={`text-[11px] font-black tracking-[0.1em] uppercase leading-none opacity-60`}>{mod.category}</span>
                                  <span className="w-1 h-1 rounded-full bg-white/20" />
                                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{mod.rarity}</span>
                              </div>
                              <span className="text-[12px] text-slate-400 font-bold leading-snug break-words uppercase tracking-tighter">{mod.description}</span>
                          </div>
                      </div>
                  );
              })}
          </div>
          <div className="h-4" />
        </div>
        
        <div className={`p-4 text-center text-[11px] font-black tracking-[0.4em] uppercase bg-white/5 border-t border-white/5 ${isShiftDown ? style.text : 'text-slate-500'} shrink-0`}>
          {isShiftDown ? 'Scroll to explore / Click to apply' : 'Move mouse away to close'}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div
      style={{ display: 'contents' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {tooltip}
    </div>
  );
};

export default SetupTooltip;
