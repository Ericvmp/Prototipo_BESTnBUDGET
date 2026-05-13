import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems: { id: Screen; label: string; icon: string; color: string; image?: string }[] = [
    { id: 'home', label: 'HOME', icon: 'home', color: '#ffffff' },
    { id: 'weapons', label: 'WEAPONS', icon: 'military_tech', color: '#85f2e9', image: '/images/items/Bobcat.webp' },
    { id: 'mods', label: 'MODS', icon: 'settings_input_component', color: '#2df287', image: '/images/items/Kinetic_Converter.webp' },
    { id: 'materials', label: 'MATS', icon: 'construction', color: '#fbd008', image: '/images/items/Plastic_Parts.webp' },
    { id: 'equipment', label: 'EQUIP', icon: 'explosion', color: '#fb090b', image: '/images/items/Medium_Shield.webp' },
    { id: 'blueprints', label: 'PRINTS', icon: 'architecture', color: '#135bec', image: '/images/items/Barricade_Kit.webp' },
    { id: 'trade', label: 'TRADE', icon: 'sync_alt', color: '#8b5cf6', image: '/images/items/Medium_Gun_Parts.webp' },
    { id: 'planner', label: 'PLANNER', icon: 'calculate', color: '#f97316', image: '/images/scrappy.webp' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/95 ios-blur border-t border-slate-800 pb-6 pt-2 z-50 animate-fade-in-up">
      <div className="flex items-center justify-around max-w-4xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group ${isActive ? '' : 'text-slate-500'}`}
              style={isActive ? { color: item.color } : undefined}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = item.color;
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = '';
              }}
            >
              {/* Top Indicator with Strong Glow */}
              {isActive && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-[2px] rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 20px 2px ${item.color}`,
                    filter: `blur(0.5px)`
                  }}
                ></div>
              )}

              {/* Background Glow Effect */}
              <div
                className={`absolute inset-0 -top-2 rounded-full blur-2xl transition-all duration-500 pointer-events-none ${isActive ? 'opacity-30 scale-125' : 'opacity-0 scale-50 group-hover:opacity-20 group-hover:scale-100'}`}
                style={{ backgroundColor: item.color }}
              ></div>

              {/* Icon/Image with Strong Glow */}
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-115 active:scale-95">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.label}
                    className={`w-6 h-6 object-contain transition-all duration-300 ${isActive ? 'grayscale-0 opacity-100' : 'opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`}
                    style={{
                      filter: (isActive || true) ? `drop-shadow(0 0 12px ${isActive ? item.color : 'transparent'})` : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.filter = `drop-shadow(0 0 12px ${item.color}80)`;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.filter = '';
                    }}
                  />
                ) : (
                  <span
                    className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-[1]' : ''}`}
                    style={{
                      textShadow: isActive ? `0 0 15px ${item.color}` : 'none'
                    }}
                  >
                    {item.icon}
                  </span>
                )}
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.1em] relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
