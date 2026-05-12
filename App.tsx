
import React, { useState } from 'react';
import WeaponCard from './components/WeaponCard';
import ModCard from './components/ModCard';
import LootScreen from './components/LootScreen';
import ThrowablesScreen from './components/ThrowablesScreen';
import BlueprintsScreen from './components/BlueprintsScreen';
import PlannerScreen from './components/PlannerScreen';
import BottomNav from './components/BottomNav';
import WeaponOverlay from './components/WeaponOverlay';
import ModOverlay from './components/ModOverlay';
import MaterialOverlay from './components/MaterialOverlay';
import TacticalOverlay from './components/TacticalOverlay';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA, LOOT_DATA, THROWABLES_DATA, AUGMENTS_DATA } from './data';
import { Weapon, Modification, Material, Screen, Augment, Throwable } from './types';

const HomeOption: React.FC<{ label: string; icon: string; delay: string; image?: string; itemImage?: string; itemImageClass?: string; hoverColor?: string; onClick: () => void }> = ({ label, icon, delay, image, itemImage, itemImageClass = 'w-60 h-60', hoverColor = '#135bec', onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative aspect-square w-full bg-card-dark rounded-xl overflow-hidden transition-all duration-300 active:scale-95 flex flex-col items-center shadow-2xl animate-fade-in`}
      style={{
        animationDelay: delay,
      }}
    >
      {/* Background Image or Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0">
        {label === 'Blueprints' ? (
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `linear-gradient(${hoverColor} 2px, transparent 2px), linear-gradient(90deg, ${hoverColor} 2px, transparent 2px)`,
              backgroundSize: '20% 20%'
            }}
          />
        ) : (
          <img
            src={image || ''}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* Hover Glow & Border Overlay - Placed above everything but corners */}
      <div 
        className={`absolute inset-0 z-30 pointer-events-none transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      >
        <div className="absolute inset-0 border-[4px] border-white/20 blur-[1px]"></div>
        <div className="absolute inset-0 border-[8px]" style={{ borderColor: hoverColor, boxShadow: `0 0 60px ${hoverColor}40, inset 0 0 40px ${hoverColor}30` }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full relative z-40 transform -translate-y-2 md:-translate-y-5 scale-75 group-hover:-translate-y-3 md:group-hover:-translate-y-6 transition-all duration-700 ease-out">
        {itemImage ? (
          <img src={itemImage} alt={label} className={`${itemImageClass} object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300`} />
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-7xl text-slate-300 group-hover:text-primary transition-colors duration-300">
              {icon}
            </span>
          </div>
        )}
      </div>

      {/* Label Area - Absolutely positioned to ensure perfect alignment across all cards */}
      <div className="absolute bottom-0 left-0 right-0 z-50 text-center px-1 pb-6 md:pb-10 h-20 md:h-28 flex flex-col justify-end items-center w-full pointer-events-none">
        <span className="text-xs md:text-base font-bold tracking-[0.15em] md:tracking-[0.4em] uppercase text-slate-100 group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {label}
        </span>
        <div className="h-[2px] w-0 group-hover:w-1/2 transition-all duration-500 mt-2" style={{ backgroundColor: hoverColor }}></div>
      </div>
      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none z-50">
        <div className="absolute top-4 left-4 w-[1px] h-4 transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}80` }}></div>
        <div className="absolute top-4 left-4 w-4 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}80` }}></div>
      </div>
      <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none z-50">
        <div className="absolute bottom-4 right-4 w-[1px] h-4 transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}80` }}></div>
        <div className="absolute bottom-4 right-4 w-4 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : `${hoverColor}80` }}></div>
      </div>

      {/* OVERLAY BORDER - OVER EVERYTHING */}
      <div 
        className="absolute inset-0 pointer-events-none z-[60] rounded-xl transition-all duration-300"
        style={{ 
          border: `4px solid ${hoverColor}${hovered ? '' : '80'}`,
          boxShadow: hovered ? `0 0 30px ${hoverColor}40, inset 0 0 20px ${hoverColor}20` : 'none'
        }}
      />

      <div className="scanline-overlay absolute inset-0 opacity-10 group-hover:opacity-30 z-60 transition-opacity"></div>
    </button>
  );
};

const App: React.FC = () => {
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
    <main className="flex-1 flex flex-col items-center justify-center p-8 gap-12 relative z-10">
      <div className="flex flex-col items-center w-full animate-fade-in relative py-8 mb-4" style={{ animationDelay: '50ms' }}>
        <div className="w-full max-w-7xl px-0">
           {/* Full-width Title - Aligned to grid edges */}
           <h1 className="text-4xl md:text-6xl lg:text-[7.7rem] font-black tracking-[0.08em] md:tracking-[0.12em] uppercase text-white relative z-10 whitespace-nowrap text-center leading-none w-full">
             SCRAPPY PLANNER
           </h1>
        </div>
      </div>
      {/* Grid of 5 options */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl mt-4">
        <HomeOption
          label="Weapons"
          icon="military_tech"
          delay="200ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/Gunsmith.webp"
          itemImage="/images/items/Bobcat.webp"
          itemImageClass="w-36 h-36 md:w-[211px] md:h-[211px]"
          hoverColor="#85f2e9"
          onClick={() => setCurrentScreen('weapons')}
        />
        <HomeOption
          label="Mods"
          icon="settings_input_component"
          delay="300ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/ExplosivesStation.webp"
          itemImage="/images/items/Kinetic_Converter.webp"
          itemImageClass="w-24 h-24 md:w-[189px] md:h-[189px]"
          hoverColor="#2df287"
          onClick={() => setCurrentScreen('mods')}
        />
        <HomeOption
          label="Materials"
          icon="inventory_2"
          delay="400ms"
          image="/images/Refiner.webp"
          itemImage="/images/items/Plastic_Parts.webp"
          itemImageClass="w-24 h-24 md:w-[173px] md:h-[173px]"
          hoverColor="#fbd008"
          onClick={() => setCurrentScreen('materials')}
        />
        <HomeOption
          label="Equipment"
          icon="shield_with_heart"
          delay="500ms"
          image="/images/GearBench.webp"
          itemImage="/images/items/Medium_Shield.webp"
          itemImageClass="w-20 h-20 md:w-[147px] md:h-[147px]"
          hoverColor="#fb090b"
          onClick={() => setCurrentScreen('equipment')}
        />
        <HomeOption
          label="Blueprints"
          icon="architecture"
          delay="600ms"
          image="/images/Workshop.webp"
          itemImage="/images/items/Barricade_Kit.webp"
          itemImageClass="w-28 h-28 md:w-[163px] md:h-[163px] transform -translate-y-[7px]"
          hoverColor="#135bec"
          onClick={() => setCurrentScreen('blueprints')}
        />
      </div>

      {/* STASH PLANNER Button (Moved Below) */}
      <div className="w-full max-w-7xl animate-fade-in-up mt-8" style={{ animationDelay: '800ms' }}>
          <button 
            onClick={() => setCurrentScreen('planner')}
            className="w-full relative group overflow-hidden rounded-2xl hover:ring-8 hover:ring-inset hover:ring-primary transition-all p-6 flex flex-col md:flex-row items-center justify-between bg-card-dark"
          >
            <div className="absolute inset-0 bg-[#513bbd]/5 group-hover:bg-[#513bbd]/10 transition-colors" />
            
            {/* OVERLAY BORDER - OVER EVERYTHING */}
            <div className="absolute inset-0 pointer-events-none z-50 border-4 border-[#513bbd]/60 group-hover:border-[#513bbd] transition-colors rounded-2xl" />

            <div className="relative z-10 flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-background-dark border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform p-1 overflow-hidden">
                   <img src="/images/scrappy.webp" alt="Scrappy" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="text-left">
                   <h3 className="text-4xl font-black tracking-[0.3em] transform-gpu transition-all text-white group-hover:text-blue-500 uppercase">
                      STASH MANAGEMENT
                   </h3>
                   <p className="text-sm text-slate-400 mt-1 max-w-lg">
                      Build your ideal setup and calculate the exact materials needed to craft, upgrade, and maintain it.
                   </p>
                </div>
            </div>
            <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-[#513bbd] transition-all relative z-10 mt-4 md:mt-0">
               arrow_forward
            </span>
          </button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
        <div className="flex gap-12 text-[9px] font-bold tracking-[0.3em] uppercase">
          <span>Terminal: 0x7F2</span>
          <span>Region: EU-Central</span>
          <span>Ver: 2.1.0-RC</span>
        </div>
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
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-glow uppercase italic">WEAPONS</h2>
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
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-glow uppercase italic">MODS</h2>
        </div>
      </div>
      {(() => {
        const categoryOrder = ['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK', 'ALL'];
        const categoryLabels: Record<string, string> = { 'MUZZLE': 'Muzzle', 'MAGAZINE': 'Magazine', 'UNDERBARREL': 'Underbarrel', 'STOCK': 'Stock', 'ALL': 'Special' };
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

      {currentScreen !== 'home' && !selectedWeapon && !selectedMod && !selectedMaterial && (
        <BottomNav activeScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}

    </div>
  );
};

export default App;
