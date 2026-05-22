
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MODS_DATA } from '../data';
import { SetupDetail } from '../types';
import { getRarityBorderColor, getRarityIconColor } from '../utils';
import SmartItemIcon from './SmartItemIcon';
import { useLanguage } from './LanguageContext';

interface SetupTooltipProps {
  setup: SetupDetail;
  tier: 'S' | 'A';
  children: React.ReactNode;
}

const TIER_STYLES = {
  S: { border: 'border-amber-400', text: 'text-amber-300', glow: 'rgba(251,191,36,0.25)', bg: 'bg-amber-400/5', icon: 'military_tech' },
  A: { border: 'border-fuchsia-500', text: 'text-fuchsia-300', glow: 'rgba(232,121,249,0.25)', bg: 'bg-fuchsia-500/5', icon: 'verified_user' },
};

const SetupTooltip: React.FC<SetupTooltipProps> = ({ setup, tier, children }) => {
  const [visible, setVisible] = useState(false);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const style = TIER_STYLES[tier];
  const { t, translateItemName, translateItemDesc } = useLanguage();

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
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-6 ${isShiftDown ? 'pointer-events-auto bg-black/40' : 'pointer-events-none'}`}
      onClick={closeTooltip}
    >
      <div
        ref={tooltipRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 440,
          maxHeight: '85vh',
          boxShadow: isShiftDown ? `0 0 100px ${style.glow.replace('0.25', '0.5')}, 0 24px 64px rgba(0,0,0,0.9)` : `0 0 40px ${style.glow}, 0 12px 32px rgba(0,0,0,0.7)`,
          pointerEvents: isShiftDown ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={`bg-[#0d1117]/95 backdrop-blur-2xl border-2 ${style.border} rounded-[2rem] overflow-hidden animate-fade-in flex flex-col ${!isShiftDown ? 'scale-95 opacity-80' : ''}`}
      >
        {/* Top Status Bar */}
        <div className={`p-4 text-center text-[10px] font-black tracking-[0.4em] uppercase bg-white/5 border-b border-white/5 shrink-0 flex items-center justify-center relative ${isShiftDown ? style.text : 'text-slate-500'}`}>
          {!isShiftDown ? (
            <div className="flex items-center gap-2">
                 <span>{t('tooltip.press_shift')}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
            </div>
          ) : (
             <div className="flex items-center gap-2 w-full justify-center">
                 <span className="animate-bounce">{t('tooltip.inspection_locked')}</span>
                 <button 
                  onClick={(e) => { e.stopPropagation(); closeTooltip(); }}
                  className="absolute right-4 w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:text-white rounded-full transition-colors text-slate-300"
                 >
                   <span className="material-symbols-outlined text-[14px]">close</span>
                 </button>
            </div>
          )}
        </div>

        {/* Body - Scrollable */}
        <div 
          className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar" 
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${style.glow} transparent` }}
          onWheel={(e) => {
            if (isShiftDown) {
               const container = e.currentTarget;
               if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                 container.scrollTop += e.deltaX;
               }
            }
          }}
        >
          {setup.modIds.map(modId => {
              const mod = MODS_DATA.find(m => m.id === modId);
              if (!mod) return null;
              
              const borderStyle = getRarityBorderColor(mod.rarity);
              const imgBorderColor = borderStyle.replace('border-[3px]', 'border-2').replace('/30', '/50');
              const rarityColor = getRarityIconColor(mod.rarity);

              return (
                  <div key={modId} className={`flex items-center gap-5 p-4 bg-white/[0.04] border-2 rounded-2xl transition-all group/item shadow-inner ${borderStyle} hover:bg-white/[0.08]`}>
                      <div className={`w-14 h-14 rounded-2xl bg-slate-800 p-2.5 flex items-center justify-center shrink-0 border-2 shadow-inner group-hover/item:border-white/30 transition-colors ${imgBorderColor}`}>
                          <SmartItemIcon itemName={mod.name} icon="settings" rarity={mod.rarity} imageClassName="w-full h-full object-contain drop-shadow-glow" iconClassName="text-xl text-slate-400" />
                      </div>
                      <div className="flex flex-col min-w-0">
                          <span className="text-[15px] font-black text-slate-100 truncate uppercase tracking-wide leading-tight mb-1">
                            {translateItemName(mod.name)
                              .replace('Estendido ', '')
                              .replace('Estendida ', '')
                              .replace('Extended ', '')
                              .replace('  ', ' ')
                              .trim()
                              .replace('III', '3')
                              .replace('II', '2')
                              .replace('I', '1')}
                          </span>
                          <div className="flex items-center gap-2 mb-2">
                              <span className={`text-[10px] font-black tracking-[0.1em] uppercase leading-none opacity-60`}>
                                {t('category.' + mod.category.toLowerCase()) || mod.category}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className={`text-[10px] font-bold uppercase tracking-tighter ${rarityColor}`}>
                                {t('rarity.' + mod.rarity.toLowerCase())}
                              </span>
                          </div>
                          <span className="text-[12px] text-slate-400 font-bold leading-snug break-words uppercase tracking-tighter opacity-80">
                            {translateItemDesc(mod.name, mod.description)}
                          </span>
                      </div>
                  </div>
              );
          })}
          <div className="h-2" />
        </div>
        
        <div className={`p-4 text-center text-[11px] font-black tracking-[0.4em] uppercase bg-white/5 border-t border-white/5 shrink-0 ${isShiftDown ? style.text : 'text-slate-500'}`}>
          {isShiftDown ? t('tooltip.scroll_apply') : t('tooltip.move_mouse')}
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
