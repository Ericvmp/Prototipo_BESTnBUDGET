
import React, { useState } from 'react';
import WeaponCard from './components/WeaponCard';
import ModCard from './components/ModCard';
import LootScreen from './components/LootScreen';
import ThrowablesScreen from './components/ThrowablesScreen';
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
      className={`group relative aspect-square w-full bg-card-dark rounded-xl overflow-hidden transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-2 md:gap-6 shadow-2xl animate-fade-in`}
      style={{
        animationDelay: delay,
        border: '2px solid rgb(30 41 59)',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0">
        <img
          src={image || ''}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Hover Glow & Border Overlay - Placed above everything but corners */}
      <div 
        className={`absolute inset-0 z-30 pointer-events-none transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      >
        <div className="absolute inset-0 border-[4px] border-white/20 blur-[1px]"></div>
        <div className="absolute inset-0 border-[8px]" style={{ borderColor: hoverColor, boxShadow: `0 0 60px ${hoverColor}40, inset 0 0 40px ${hoverColor}30` }}></div>
      </div>

      <div className="relative z-40 transform group-hover:-translate-y-2 transition-transform duration-500">
        {itemImage ? (
          <img src={itemImage} alt={label} className={`${itemImageClass} object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300`} />
        ) : (
          <>
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-7xl text-slate-300 group-hover:text-primary transition-colors duration-300">
              {icon}
            </span>
          </>
        )}
      </div>
      <div className="relative z-20 text-center px-1">
        <span className="text-xs md:text-base font-bold tracking-[0.15em] md:tracking-[0.4em] uppercase text-slate-100 group-hover:text-white transition-colors">
          {label}
        </span>
        <div className="h-[2px] w-0 mx-auto mt-2 group-hover:w-full transition-all duration-500" style={{ backgroundColor: hoverColor }}></div>
      </div>
      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none z-50">
        <div className="absolute top-4 left-4 w-[1px] h-4 transition-colors" style={{ backgroundColor: hovered ? hoverColor : 'rgb(51 65 85)' }}></div>
        <div className="absolute top-4 left-4 w-4 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : 'rgb(51 65 85)' }}></div>
      </div>
      <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none z-50">
        <div className="absolute bottom-4 right-4 w-[1px] h-4 transition-colors" style={{ backgroundColor: hovered ? hoverColor : 'rgb(51 65 85)' }}></div>
        <div className="absolute bottom-4 right-4 w-4 h-[1px] transition-colors" style={{ backgroundColor: hovered ? hoverColor : 'rgb(51 65 85)' }}></div>
      </div>
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
      <div className="text-center animate-fade-in" style={{ animationDelay: '50ms' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50"></div>
          <div className="w-2 h-2 bg-primary rotate-45"></div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50"></div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-[0.3em] uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          XANNAX STASH COPILOT
        </h1>
        <p className="text-[16px] md:text-[22px] text-primary tracking-[0.4em] uppercase mt-4 font-bold opacity-90 drop-shadow-glow">
          STASH PLANNER
        </p>
      </div>
      {/* Grid of 4 options */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-4">
        <HomeOption
          label="Weapons"
          icon="military_tech"
          delay="200ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/Gunsmith.webp"
          itemImage="/images/weapons/Stitcher.png"
          itemImageClass="w-32 h-32 md:w-52 md:h-52"
          hoverColor="#85f2e9"
          onClick={() => setCurrentScreen('weapons')}
        />
        <HomeOption
          label="Mods"
          icon="settings_input_component"
          delay="350ms"
          image="https://cdn.metaforge.app/arc-raiders/icons/hideout/ExplosivesStation.webp"
          itemImage="/images/mods/Compensator_II.png"
          itemImageClass="w-24 h-24 md:w-40 md:h-40"
          hoverColor="#f0ab66"
          onClick={() => setCurrentScreen('mods')}
        />
        <HomeOption
          label="Materials"
          icon="inventory_2"
          delay="500ms"
          image="/images/Refiner.webp"
          itemImage="https://arcraiders.wiki/w/images/8/89/Metal_Parts.png"
          itemImageClass="w-24 h-24 md:w-44 md:h-44"
          hoverColor="#fbd008"
          onClick={() => setCurrentScreen('materials')}
        />
        <HomeOption
          label="Tacticals"
          icon="shield_with_heart"
          delay="650ms"
          image="/images/GearBench.webp"
          itemImage="https://cdn.metaforge.app/arc-raiders/icons/snap-blast-grenade.webp"
          itemImageClass="w-16 h-16 md:w-32 md:h-32"
          hoverColor="#fb090b"
          onClick={() => setCurrentScreen('throwables')}
        />
      </div>

      {/* STASH PLANNER Button (Moved Below) */}
      <div className="w-full max-w-6xl animate-fade-in-up mt-8" style={{ animationDelay: '800ms' }}>
         <button 
           onClick={() => setCurrentScreen('planner')}
           className="w-full relative group overflow-hidden rounded-2xl border-2 border-primary/30 hover:ring-8 hover:ring-inset hover:ring-primary transition-all p-6 flex flex-col md:flex-row items-center justify-between bg-card-dark"
         >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-background-dark border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
                </div>
                <div className="text-left">
                   <h3 className="text-xl font-black tracking-[0.3em] transform-gpu transition-all text-white group-hover:text-primary uppercase">
                      STASH PLANNER
                   </h3>
                   <p className="text-sm text-slate-400 mt-1 max-w-lg">
                      Build your ideal setup and calculate the exact materials needed to craft, upgrade, and maintain it.
                   </p>
                </div>
            </div>
            <span className="material-symbols-outlined text-4xl text-slate-600 group-hover:text-primary transition-all relative z-10 mt-4 md:mt-0">
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
          <h2 className="text-2xl font-bold tracking-[0.2em] text-white">Weapons Archive</h2>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-1">Foundry Inventory Access</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {WEAPONS_DATA.map(weapon => (
          <WeaponCard key={weapon.id} weapon={weapon} onClick={handleWeaponSelect} />
        ))}
      </div>
    </main>
  );

  const renderMods = () => (
    <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-[0.2em] text-white">Mods Library</h2>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-1">Equipment Calibration Node</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODS_DATA.map(mod => (
          <ModCard key={mod.id} mod={mod} onClick={handleModSelect} />
        ))}
      </div>
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
      {currentScreen === 'weapons' && renderWeapons()}
      {currentScreen === 'mods' && renderMods()}
      {currentScreen === 'materials' && (
        <LootScreen
          data={LOOT_DATA}
          onBack={() => setCurrentScreen('home')}
          onMaterialSelect={handleMaterialSelect}
        />
      )}
      {currentScreen === 'throwables' && (
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
