
import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import WeaponCard from './components/WeaponCard';
import ModCard from './components/ModCard';
import LootScreen from './components/LootScreen';
import ThrowablesScreen from './components/ThrowablesScreen';
import BlueprintsScreen from './components/BlueprintsScreen';
import PlannerScreen from './components/PlannerScreen';
import TradeScreen from './components/TradeScreen';
import BottomNav from './components/BottomNav';
import WeaponOverlay from './components/WeaponOverlay';
import ModOverlay from './components/ModOverlay';
import MaterialOverlay from './components/MaterialOverlay';
import TacticalOverlay from './components/TacticalOverlay';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA, LOOT_DATA, THROWABLES_DATA, AUGMENTS_DATA } from './data';
import { Weapon, Modification, Material, Screen, Augment, Throwable } from './types';

const HomeOption: React.FC<{ label: string; icon: string; delay: string; image?: string; itemImage?: string; itemImageClass?: string; hoverColor?: string; useBlueprintBg?: boolean; onClick: () => void }> = ({ label, icon, delay, image, itemImage, itemImageClass = 'w-20 h-20', hoverColor = '#135bec', useBlueprintBg = false, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative w-full bg-card-dark rounded-xl overflow-hidden transition-all duration-300 active:scale-95 flex flex-col items-center shadow-2xl animate-fade-in`}
      style={{ animationDelay: delay, paddingTop: '75%', position: 'relative' }}
    >
      {/* Inner wrapper to contain content with absolute positioning */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Background Image or Blueprint Grid */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0">
          {useBlueprintBg ? (
            <div 
              className="w-full h-full"
              style={{ 
                backgroundImage: `linear-gradient(${hoverColor} 2px, transparent 2px), linear-gradient(90deg, ${hoverColor} 2px, transparent 2px)`,
                backgroundSize: '20% 20%'
              }}
            />
          ) : (
            <img src={image || ''} alt="" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Hover Glow Border */}
        <div className={`absolute inset-0 z-30 pointer-events-none transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 border-[6px]" style={{ borderColor: hoverColor, boxShadow: `0 0 40px ${hoverColor}40, inset 0 0 30px ${hoverColor}20` }}></div>
        </div>

        {/* Item image - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-40 pb-8">
          {itemImage ? (
            <img src={itemImage} alt={label} className={`${itemImageClass} object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:scale-110`} />
          ) : (
            <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:text-primary transition-colors duration-300">{icon}</span>
          )}
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 z-50 text-center px-1 pb-2 flex flex-col items-center pointer-events-none">
          <span className="text-[13px] md:text-[15px] font-black tracking-[0.2em] uppercase text-slate-200 group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {label}
          </span>
          <div className="h-[2px] w-0 group-hover:w-1/2 transition-all duration-500 mt-1" style={{ backgroundColor: hoverColor }}></div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-50">
          <div className="absolute top-2 left-2 w-[1px] h-3 transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}60` }}></div>
          <div className="absolute top-2 left-2 w-3 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}60` }}></div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-50">
          <div className="absolute bottom-2 right-2 w-[1px] h-3 transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}60` }}></div>
          <div className="absolute bottom-2 right-2 w-3 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}60` }}></div>
        </div>

        {/* Base border */}
        <div 
          className="absolute inset-0 pointer-events-none z-[60] rounded-xl transition-all duration-300"
          style={{ 
            border: `3px solid ${hoverColor}${hovered ? '' : '60'}`,
            boxShadow: hovered ? `0 0 20px ${hoverColor}40` : 'none'
          }}
        />
        <div className="scanline-overlay absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity"></div>
      </div>
    </button>
  );
};

const AppContent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [selectedMod, setSelectedMod] = useState<Modification | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedTactical, setSelectedTactical] = useState<Throwable | Augment | null>(null);

  // Helper to clear others when one is selected
  const handleWeaponSelect = (w: Weapon | null) => {
    setSelectedWeapon(w);
    if (w) { setSelectedMod(null); setSelectedMaterial(null); }
  };
  const handleModSelect = (m: Modification | null) => {
    setSelectedMod(m);
    if (m) { setSelectedWeapon(null); setSelectedMaterial(null); }
  };
  const handleMaterialSelect = (mat: Material | null) => {
    setSelectedMaterial(mat);
    if (mat) { setSelectedWeapon(null); setSelectedMod(null); setSelectedTactical(null); }
  };
  const handleTacticalSelect = (t: Throwable | Augment | null) => {
    setSelectedTactical(t);
    if (t) { setSelectedWeapon(null); setSelectedMod(null); setSelectedMaterial(null); }
  };

  const renderHome = () => (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-6 relative z-10 pb-32">
      {/* Title with Inline Flag Language Selector */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full animate-fade-in relative" style={{ animationDelay: '50ms' }}>
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] select-none">
          <button
            onClick={() => setLanguage('en')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all duration-300 ${
              language === 'en'
                ? 'bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <img src="/images/flag_en.png" alt="English" className="w-4.5 h-4.5 rounded-full object-cover shadow-sm" style={{ width: '18px', height: '18px' }} />
            <span>EN</span>
          </button>
          <button
            onClick={() => setLanguage('pt-BR')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all duration-300 ${
              language === 'pt-BR'
                ? 'bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <img src="/images/flag_pt.png" alt="Português" className="w-4.5 h-4.5 rounded-full object-cover shadow-sm" style={{ width: '18px', height: '18px' }} />
            <span>PT-BR</span>
          </button>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.08em] md:tracking-[0.12em] uppercase text-white relative z-10 whitespace-nowrap text-center leading-none">
          {t('home.title')}
        </h1>
      </div>

      {/* Single row of 6 compact cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-7xl">
        <HomeOption
          label={t('home.weapons')}
          icon="military_tech"
          delay="200ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/Gunsmith.webp"
          itemImage="/images/items/Bobcat.webp"
          itemImageClass="w-[88px] h-[88px] md:w-[120px] md:h-[120px]"
          hoverColor="#85f2e9"
          onClick={() => setCurrentScreen('weapons')}
        />
        <HomeOption
          label={t('home.mods')}
          icon="settings_input_component"
          delay="300ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/ExplosivesStation.webp"
          itemImage="/images/items/Extended_Medium_Mag_III.webp"
          itemImageClass="w-[60px] h-[60px] md:w-[84px] md:h-[84px]"
          hoverColor="#2df287"
          onClick={() => setCurrentScreen('mods')}
        />
        <HomeOption
          label={t('home.materials')}
          icon="inventory_2"
          delay="400ms"
          image="/images/Refiner.webp"
          itemImage="/images/items/Plastic_Parts.webp"
          itemImageClass="w-[70px] h-[70px] md:w-[94px] md:h-[94px]"
          hoverColor="#fbd008"
          onClick={() => setCurrentScreen('materials')}
        />
        <HomeOption
          label={t('home.equipments')}
          icon="shield_with_heart"
          delay="500ms"
          image="/images/GearBench.webp"
          itemImage="/images/items/Medium_Shield.webp"
          itemImageClass="w-[70px] h-[70px] md:w-[94px] md:h-[94px]"
          hoverColor="#fb090b"
          onClick={() => setCurrentScreen('equipment')}
        />
        <HomeOption
          label={t('home.blueprints')}
          icon="architecture"
          delay="600ms"
          image="/images/Workshop.webp"
          itemImage="/images/items/Barricade_Kit.webp"
          itemImageClass="w-[70px] h-[70px] md:w-[94px] md:h-[94px]"
          hoverColor="#135bec"
          useBlueprintBg
          onClick={() => setCurrentScreen('blueprints')}
        />
        <HomeOption
          label={t('home.trade')}
          icon="sync_alt"
          delay="700ms"
          image="/images/background-home.webp"
          itemImage="/images/items/Medium_Gun_Parts.webp"
          itemImageClass="w-[70px] h-[70px] md:w-[94px] md:h-[94px]"
          hoverColor="#8b5cf6"
          onClick={() => setCurrentScreen('trade')}
        />
      </div>

      {/* STASH PLANNER Banner */}
      <div className="w-full max-w-7xl animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <button 
          onClick={() => setCurrentScreen('planner')}
          className="w-full relative group overflow-hidden rounded-2xl transition-all p-5 flex flex-col md:flex-row items-center justify-between bg-card-dark"
        >
          <div className="absolute inset-0 bg-[#f97316]/5 group-hover:bg-[#f97316]/10 transition-colors" />
          <div className="absolute inset-0 pointer-events-none z-50 border-4 border-[#f97316]/60 group-hover:border-[#f97316] transition-colors rounded-2xl" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-background-dark border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform p-1 overflow-hidden">
              <img src="/images/scrappy.webp" alt="Scrappy" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-black tracking-[0.2em] text-white group-hover:text-orange-400 uppercase transition-colors">{t('home.stash_planner')}</h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-lg">{t('home.stash_desc')}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#f97316] transition-all relative z-10 mt-3 md:mt-0">arrow_forward</span>
        </button>
      </div>

      <div className="flex gap-10 text-[9px] font-bold tracking-[0.3em] uppercase opacity-20">
        <span>Terminal: 0x7F2</span>
        <span>Region: EU-Central</span>
        <span>Ver: 2.1.0-RC</span>
      </div>
    </main>
  );

  const renderWeapons = () => (
    <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase italic drop-shadow-[0_0_20px_rgba(251,208,8,0.6)] leading-none">{t('nav.weapons')}</h2>
          <p className="text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-wider mt-2 opacity-80">{t('hint.lock_tooltip')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {WEAPONS_DATA.map(weapon => (
          <WeaponCard key={weapon.id} weapon={weapon} onClick={handleWeaponSelect} />
        ))}
      </div>
      <div className="h-[100px] w-full pointer-events-none" />
    </main>
  );

  const renderMods = () => (
    <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase italic drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] leading-none">{t('nav.mods')}</h2>
          <p className="text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-wider mt-2 opacity-80">{t('hint.lock_tooltip')}</p>
        </div>
      </div>
      {(() => {
        const categoryOrder = ['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK', 'ALL'];
        const categoryLabels: Record<string, string> = { 
          'MUZZLE': language === 'pt-BR' ? 'Boca' : 'Muzzle', 
          'MAGAZINE': language === 'pt-BR' ? 'Carregador' : 'Magazine', 
          'UNDERBARREL': language === 'pt-BR' ? 'Acoplamento' : 'Underbarrel', 
          'STOCK': language === 'pt-BR' ? 'Coronha' : 'Stock', 
          'ALL': language === 'pt-BR' ? 'Especial' : 'Special' 
        };
        const categoryIcons: Record<string, string> = { 
          'MUZZLE': 'https://arcraiders.wiki/w/images/4/4b/Mods_Muzzle.png', 
          'MAGAZINE': 'https://arcraiders.wiki/w/images/c/c6/Mods_Medium-Mag.png', 
          'UNDERBARREL': 'https://arcraiders.wiki/w/images/0/01/Mods_Underbarrel.png', 
          'STOCK': 'https://arcraiders.wiki/w/images/f/f5/Mods_Stock.png', 
          'ALL': 'auto_awesome' 
        };
        return categoryOrder.map(cat => {
          const catMods = MODS_DATA.filter(m => m.category === cat);
          if (catMods.length === 0) return null;
          return (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {cat === 'ALL' ? (
                  <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                ) : (
                  <img src={categoryIcons[cat]} alt={cat} className="w-6 h-6 object-contain brightness-0 invert opacity-80" />
                )}
                <h3 className="text-[12px] font-black tracking-[0.3em] uppercase text-primary">{categoryLabels[cat]}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                <span className="text-[10px] font-black text-slate-600 tracking-widest">{catMods.length}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {catMods.map(mod => (
                  <ModCard key={mod.id} mod={mod} onClick={handleModSelect} />
                ))}
              </div>
            </div>
          );
        });
      })()}
      <div className="h-[100px] w-full pointer-events-none" />
    </main>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100 font-display overflow-x-hidden selection:bg-primary/40 leading-relaxed">
      {/* Floating Language Selector - Only visible when not on home screen to avoid duplication */}
      {currentScreen !== 'home' && (
        <div className="fixed top-4 right-4 z-[100] flex gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] select-none">
          <button
            onClick={() => setLanguage('en')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all duration-300 ${
              language === 'en'
                ? 'bg-primary text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <img src="/images/flag_en.png" alt="English" className="w-3.5 h-3.5 rounded-full object-cover shadow-sm" style={{ width: '14px', height: '14px' }} />
            <span>EN</span>
          </button>
          <button
            onClick={() => setLanguage('pt-BR')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider transition-all duration-300 ${
              language === 'pt-BR'
                ? 'bg-primary text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <img src="/images/flag_pt.png" alt="Português" className="w-3.5 h-3.5 rounded-full object-cover shadow-sm" style={{ width: '14px', height: '14px' }} />
            <span>PT-BR</span>
          </button>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Main Background Image */}
        <img
          src="/images/background-home.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/60 to-background-dark z-10"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 opacity-[0.03] z-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="scanline-overlay absolute inset-0 opacity-[0.02] z-30 pointer-events-none"></div>
      </div>

      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'blueprints' && (
        <BlueprintsScreen
          onBack={() => { setCurrentScreen('home'); window.scrollTo(0, 0); }}
        />
      )}
      {currentScreen === 'trade' && (
        <TradeScreen
          onBack={() => { setCurrentScreen('home'); window.scrollTo(0, 0); }}
        />
      )}
      {currentScreen === 'weapons' && renderWeapons()}
      {currentScreen === 'mods' && renderMods()}
      {currentScreen === 'materials' && (
        <LootScreen
          data={LOOT_DATA}
          onBack={() => setCurrentScreen('home')}
          onMaterialSelect={handleMaterialSelect}
        />
      )}
      {currentScreen === 'equipment' && (
        <ThrowablesScreen 
          data={THROWABLES_DATA} 
          augmentsData={AUGMENTS_DATA} 
          onBack={() => { setCurrentScreen('home'); window.scrollTo(0, 0); }} 
          onItemSelect={handleTacticalSelect}
        />
      )}
      {currentScreen === 'planner' && (
        <PlannerScreen
          weapons={WEAPONS_DATA}
          mods={MODS_DATA}
          throwables={THROWABLES_DATA}
          augments={AUGMENTS_DATA}
          materialsData={MATERIALS_DATA}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {selectedWeapon && (
        <WeaponOverlay
          weapon={selectedWeapon}
          onClose={() => handleWeaponSelect(null)}
          onNavigateWeapon={handleWeaponSelect}
          onNavigateMod={handleModSelect}
          onNavigateMaterial={handleMaterialSelect}
        />
      )}

      {selectedMod && (
        <ModOverlay
          mod={selectedMod}
          onClose={() => handleModSelect(null)}
          onNavigateMaterial={handleMaterialSelect}
          onNavigateMod={handleModSelect}
        />
      )}

      {selectedMaterial && (
        <MaterialOverlay
          material={selectedMaterial}
          onClose={() => handleMaterialSelect(null)}
          onNavigateWeapon={handleWeaponSelect}
          onNavigateMod={handleModSelect}
          onNavigateMaterial={handleMaterialSelect}
          onNavigateTactical={handleTacticalSelect}
        />
      )}

      {selectedTactical && (
        <TacticalOverlay
          item={selectedTactical}
          onClose={() => handleTacticalSelect(null)}
          onNavigateMaterial={handleMaterialSelect}
          onNavigateTactical={handleTacticalSelect}
        />
      )}

      {!selectedWeapon && !selectedMod && !selectedMaterial && (
        <BottomNav activeScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}

    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
