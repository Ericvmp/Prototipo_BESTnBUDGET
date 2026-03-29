
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Weapon, Modification, Throwable, Material, Augment, Rarity, PlannerLoadout, MultiLoadoutState, PlannerWeaponSlot, PlannerConsumableSlot } from '../types';
import { getRarityIconColor, getRarityStyles, getSourceImageUrl, getRarityGlowStyles, getRarityHoverStyles, getModSlotType } from '../utils';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';
import { WEAPON_MOD_SLOTS } from '../data';

interface PlannerScreenProps {
   weapons: Weapon[];
   mods: Modification[];
   throwables: Throwable[];
   augments: Augment[];
   materialsData: Material[];
   onBack: () => void;
}

const ConfirmationModal: React.FC<{
   isOpen: boolean;
   title: string;
   message: string;
   onConfirm: () => void;
   onCancel: () => void;
   danger?: boolean;
}> = ({ isOpen, title, message, onConfirm, onCancel, danger = false }) => {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[300] bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
         <div className="bg-card-dark border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${danger ? 'bg-red-500' : 'bg-primary'}`} />
            
            <div className="flex items-center gap-4 mb-6">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">{danger ? 'warning' : 'help'}</span>
               </div>
               <div>
                  <h3 className="text-xl font-black tracking-widest text-white uppercase">{title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">System Confirmation Required</p>
               </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-8">
               {message}
            </p>

            <div className="flex gap-4">
               <button 
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-white/5"
               >
                  Cancel
               </button>
               <button 
                  onClick={() => { onConfirm(); onCancel(); }}
                  className={`flex-1 px-6 py-3 ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-dark'} text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl`}
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   );
};

const ScrollContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const scroll = (amount: number) => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({ top: amount, behavior: 'smooth' });
      }
   };

   return (
      <div className={`relative flex flex-col overflow-hidden group/scroll ${className || ''}`}>
         <button
            onClick={() => scroll(-150)}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-slate-800/90 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none group-hover/scroll:pointer-events-auto backdrop-blur-md"
         >
            <span className="material-symbols-outlined leading-none">keyboard_arrow_up</span>
         </button>

         <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-4 px-1">
            {children}
         </div>

         <button
            onClick={() => scroll(150)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-slate-800/90 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none group-hover/scroll:pointer-events-auto backdrop-blur-md"
         >
            <span className="material-symbols-outlined leading-none">keyboard_arrow_down</span>
         </button>
      </div>
   );
};

const PickerModal: React.FC<{
   isOpen: boolean;
   title: string;
   items: any[];
   onSelect: (id: string) => void;
   onClose: () => void;
   isMultiSelect?: boolean;
   selectedIds?: string[];
   onToggle?: (id: string) => void;
}> = ({ isOpen, title, items, onSelect, onClose, isMultiSelect = false, selectedIds = [], onToggle }) => {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
         <div className="bg-card-dark border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
               <div>
                  <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">{title}</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                     {isMultiSelect ? `${selectedIds.length} ITEMS SELECTED` : 'Available Inventory'}
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  {isMultiSelect && (
                     <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(19,91,236,0.3)]"
                     >
                        Confirm
                     </button>
                  )}
                  <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-slate-400">
                     <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
               </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-4">
               {items.map(item => {
                  const isSelected = isMultiSelect && selectedIds.includes(item.id);
                  return (
                     <RichTooltip key={item.id} item={item}>
                        <div
                           onClick={() => {
                           if (isMultiSelect && onToggle) {
                              onToggle(item.id);
                           } else {
                              onSelect(item.id);
                              onClose();
                           }
                        }}
                        className={`flex items-center gap-4 p-4 bg-background-dark border rounded-xl cursor-pointer transition-all group relative overflow-hidden ${isSelected ? 'border-primary ring-2 ring-primary/20 shadow-[0_0_20px_rgba(19,91,236,0.2)]' : 'border-slate-800 hover:border-slate-500'} ${getRarityHoverStyles(item.rarity || 'COMMON')}`}
                     >
                        <div className={`w-14 h-14 bg-black/40 rounded-lg flex items-center justify-center p-1.5 shrink-0 border transition-all ${isSelected ? 'border-primary' : 'border-white/5'} group-hover:scale-105`}>
                           {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-md" /> : <span className={`material-symbols-outlined text-2xl ${getRarityIconColor(item.rarity || 'COMMON')}`}>{item.icon || 'military_tech'}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2">
                              <p className="text-lg font-black text-slate-100 group-hover:text-white truncate leading-none">{item.name}</p>
                              {isSelected && <span className="material-symbols-outlined text-primary text-sm font-black">check_circle</span>}
                           </div>
                           <div className="flex gap-2 mt-2">
                              <p className={`text-[8px] uppercase font-black tracking-widest border px-1.5 py-0.5 rounded leading-none ${getRarityStyles(item.rarity || 'COMMON')}`}>{item.rarity || 'COMMON'}</p>
                              {item.category && <span className="text-[8px] text-slate-600 uppercase font-bold tracking-tighter self-center">{item.category}</span>}
                           </div>
                        </div>
                        {isSelected && (
                           <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary rounded-full text-white shadow-lg">
                              <span className="material-symbols-outlined text-[12px] font-black">check</span>
                           </div>
                        )}
                     </div>
                   </RichTooltip>
                );
             })}
               {items.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-600 gap-4 opacity-30">
                     <span className="material-symbols-outlined text-6xl">inventory_2</span>
                     <p className="text-sm font-bold uppercase tracking-[0.3em] italic">No items available.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const FinalReportModal: React.FC<{
   isOpen: boolean;
   onClose: () => void;
   materials: any[];
   loadouts: PlannerLoadout[];
   multiplier: number;
}> = ({ isOpen, onClose, materials, loadouts, multiplier }) => {
   if (!isOpen) return null;

   const activeLoadouts = loadouts.filter(l => l.isActive);
   
   const getCategory = (name: string): string => {
      const lower = name.toLowerCase();
      if (lower.includes('processor') || lower.includes('arc') || lower.includes('electrical') || lower.includes('circuit') || lower.includes('capacitor')) return 'ELECTRONICS';
      if (lower.includes('gear') || lower.includes('mechanical') || lower.includes('bearing') || lower.includes('piston') || lower.includes('engine')) return 'MECHANICAL';
      if (lower.includes('refined') || lower.includes('aluminum') || lower.includes('rubber') || lower.includes('plastic') || lower.includes('glass') || lower.includes('scrap')) return 'BASE / REFINED';
      return 'OTHER COMPONENTS';
   };

   const categorized = materials.reduce((acc: any, mat) => {
      const cat = getCategory(mat.name);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(mat);
      return acc;
   }, {});

   return (
      <div className="fixed inset-0 z-[200] bg-[#05070a] flex flex-col animate-fade-in overflow-y-auto no-scrollbar p-10 select-none">
         {/* Grid Background */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(circle, #135bec 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
         
         {/* Scanline Overlay */}
         <div className="fixed inset-0 scanline-overlay pointer-events-none opacity-[0.12]" />

         {/* Atmospheric Glow */}
         <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
         <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

         <div className="max-w-6xl mx-auto w-full flex-1 relative z-10">
            {/* Header / Brand */}
            <div className="flex justify-between items-center mb-12 border-b border-primary/20 pb-8 relative">
               <div className="absolute -left-6 top-0 w-1 h-full bg-primary/40 rounded-full" />
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-primary/10 border-2 border-primary/40 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(19,91,236,0.2)]">
                     <span className="material-symbols-outlined text-4xl text-primary drop-shadow-glow">analytics</span>
                  </div>
                  <div>
                     <h1 className="text-4xl font-black tracking-[0.4em] text-white leading-none italic">STASH PLAN</h1>
                     <h2 className="text-base font-black tracking-[0.6em] text-primary mt-2">STASH REPORT</h2>
                  </div>
               </div>
               <button 
                  onClick={onClose} 
                  className="px-8 py-3 flex items-center gap-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 border-2 border-white/5 hover:border-red-500/30 rounded-2xl transition-all font-black uppercase tracking-widest text-[11px]"
               >
                  Close <span className="material-symbols-outlined text-xl">close</span>
               </button>
            </div>

            {/* Main Report Body - Simplified grid */}
            <div className="space-y-12 mb-32">
               <section className="animate-fade-in">
                  <div className="flex items-center gap-6 mb-8">
                     <h3 className="text-xl font-black tracking-[0.5em] uppercase text-slate-100 flex items-center gap-4 whitespace-nowrap">
                        <span className="w-8 h-px bg-primary/40" />
                        PLANNED MATERIALS
                     </h3>
                     <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                     <span className="text-[10px] font-black text-primary border-2 border-primary/20 px-4 py-1.5 rounded-full bg-primary/5 tracking-widest">
                        {materials.length} ASSETS LOGGED
                     </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                     {materials.map((mat: any, idx: number) => (
                        <RichTooltip key={idx} item={mat}>
                           <div 
                              className={`flex items-center justify-between p-3 bg-slate-900/30 backdrop-blur-sm border-2 rounded-2xl group transition-all duration-300 shadow-xl overflow-hidden relative ${getRarityStyles(mat.rarity)} ${getRarityHoverStyles(mat.rarity)}`}
                           >
                              {/* Internal High-Density Card */}
                              <div className="flex items-center gap-3 relative z-10 w-full">
                                 <div className="w-11 h-11 bg-black/60 rounded-xl border border-white/5 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                                    {mat.imageUrl ? <img src={mat.imageUrl} alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]" /> : <span className="material-symbols-outlined text-slate-700 text-xl">category</span>}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <span className="text-[12px] font-black uppercase tracking-wider block text-slate-100 truncate pr-1 leading-tight group-hover:text-white">{mat.name}</span>
                                    <span className="text-[8px] font-black tracking-[0.1em] uppercase opacity-60 block mt-0.5">{mat.rarity}</span>
                                 </div>
                                 <div className="text-2xl font-black text-white font-mono shrink-0 pl-3 border-l border-white/10 group-hover:text-primary transition-colors">
                                    {mat.quantity}
                                 </div>
                              </div>
                           </div>
                        </RichTooltip>
                     ))}
                  </div>
               </section>
            </div>

            {/* Schematic Footer */}
            <div className="flex flex-col items-center gap-10 pb-20 justify-center">
               <div className="flex items-center gap-10 opacity-10">
                  <span className="w-24 h-px bg-slate-700" />
                  <div className="flex items-center gap-6">
                     <span className="material-symbols-outlined text-2xl">view_in_ar</span>
                     <span className="material-symbols-outlined text-2xl">hub</span>
                     <span className="material-symbols-outlined text-2xl">biotech</span>
                  </div>
                  <span className="w-24 h-px bg-slate-700" />
               </div>
               <div className="text-center opacity-40">
                  <p className="text-[9px] font-black tracking-[0.8em] uppercase text-slate-600 mb-2">Authenticated Provisioning Data</p>
                  <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-slate-700 italic">v1.4.2 // Calibration Complete</p>
               </div>
               <button 
                  onClick={onClose}
                  className="mt-6 px-16 py-4 border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all rounded-full font-black uppercase tracking-[0.4em] text-[10px] active:scale-95 shadow-[0_0_40px_rgba(19,91,236,0.1)] hover:shadow-[0_0_50px_rgba(19,91,236,0.4)]"
               >
                  Return to Planner
               </button>
            </div>
         </div>
      </div>
   );
};

const PlannerScreen: React.FC<PlannerScreenProps> = ({ weapons, mods, throwables, augments, materialsData, onBack }) => {
   const [activeLoadoutIndex, setActiveLoadoutIndex] = useState(0);

   const [state, setState] = useState<MultiLoadoutState>(() => {
      const saved = localStorage.getItem('planner_state_multi_v1');
      if (saved) return JSON.parse(saved);

      const initialLoadouts: PlannerLoadout[] = Array.from({ length: 5 }, (_, i) => ({
         id: `l-${i + 1}`,
         name: `LOADOUT ${i + 1}`,
         isActive: i === 0,
         primary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' },
         secondary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' },
         augments: [],
         shields: [],
         quickUse: [],
         multiplier: 1
      }));

      return { loadouts: initialLoadouts, multiplier: 1 };
   });

   const [checkedMaterials, setCheckedMaterials] = useState<string[]>(() => {
      const saved = localStorage.getItem('planner_checked_mats_multi_v1');
      return saved ? JSON.parse(saved) : [];
   });

   const [pickerConfig, setPickerConfig] = useState<{ 
      isOpen: boolean, 
      title: string, 
      items: any[], 
      pickerType: 'weapon' | 'mods' | 'augments' | 'shields' | 'quickUse',
      slotKey?: 'primary' | 'secondary'
   } | null>(null);

   const [showReport, setShowReport] = useState(false);
   const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean, title: string, message: string, onConfirm: () => void, danger?: boolean } | null>(null);

   const fileInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      localStorage.setItem('planner_state_multi_v1', JSON.stringify(state));
      localStorage.setItem('planner_checked_mats_multi_v1', JSON.stringify(checkedMaterials));
   }, [state, checkedMaterials]);

   const currentLoadout = state.loadouts[activeLoadoutIndex];

   const updateCurrentLoadout = (updates: Partial<PlannerLoadout>) => {
      setState(prev => {
         const newLoadouts = [...prev.loadouts];
         newLoadouts[activeLoadoutIndex] = { ...newLoadouts[activeLoadoutIndex], ...updates };
         return { ...prev, loadouts: newLoadouts };
      });
   };

   const resetLoadout = (idx: number) => {
      setState(prev => {
         const newLoadouts = [...prev.loadouts];
         newLoadouts[idx] = {
            ...newLoadouts[idx],
            primary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' },
            secondary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' },
            augments: [],
            shields: [],
            quickUse: []
         };
         return { ...prev, loadouts: newLoadouts };
      });
   };

   const wipeAllData = () => {
      const resetLoadouts = state.loadouts.map((l, i) => ({ 
         ...l, 
         isActive: i === 0, 
         primary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' }, 
         secondary: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' }, 
         augments: [], 
         shields: [], 
         quickUse: [] 
      }));
      setState(s => ({ ...s, loadouts: resetLoadouts }));
      setCheckedMaterials([]);
   };

   const exportConfig = () => {
      const dataStr = JSON.stringify(state, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `arc_loadouts_${new Date().toISOString().split('T')[0]}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
   };

   const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
         try {
            const json = JSON.parse(e.target?.result as string);
            setState(json);
         } catch (err) {
            alert("Error importing file. Invalid format.");
         }
      };
      reader.readAsText(file);
   };

   const updateLoadoutByIdx = (idx: number, updates: Partial<PlannerLoadout>) => {
      setState(prev => {
         const newLoadouts = [...prev.loadouts];
         newLoadouts[idx] = { ...newLoadouts[idx], ...updates };
         return { ...prev, loadouts: newLoadouts };
      });
   };

   // Logic to calculate materials for ALL active loadouts
   const requiredMaterials = useMemo(() => {
      const craftingTotals: Record<string, number> = {};
      const addMaterial = (name: string, quantity: number) => {
         craftingTotals[name] = (craftingTotals[name] || 0) + quantity;
      };

      state.loadouts.forEach(loadout => {
         if (!loadout.isActive) return;

         // Primary Weapon Craft (if set)
         if (loadout.primary.weaponId) {
            // Actually weapons aren't usually craftable here unless we add that, currently they have craftInfo in data.
            // Let's add weapon crafting materials if present.
            const weapon = weapons.find(w => w.id === loadout.primary.weaponId);
            weapon?.craftInfo?.materials.forEach(m => addMaterial(m.name, m.quantity));
         }

         // Primary Mods
         loadout.primary.attachedModIds.forEach(mid => {
            const mod = mods.find(m => m.id === mid);
            mod?.materials?.forEach(m => addMaterial(m.name, m.quantity));
         });

         // Secondary Weapon Craft
         if (loadout.secondary.weaponId) {
            const weapon = weapons.find(w => w.id === loadout.secondary.weaponId);
            weapon?.craftInfo?.materials.forEach(m => addMaterial(m.name, m.quantity));
         }

         // Secondary Mods
         loadout.secondary.attachedModIds.forEach(mid => {
            const mod = mods.find(m => m.id === mid);
            mod?.materials?.forEach(m => addMaterial(m.name, m.quantity));
         });

         // Augments
         loadout.augments.forEach(aid => {
            const aug = augments.find(a => a.id === aid);
            aug?.craftInfo?.materials.forEach(m => addMaterial(m.name, m.quantity));
         });

         // Shields
         loadout.shields.forEach(sid => {
            const shield = throwables.find(t => t.id === sid);
            shield?.craftInfo?.materials.forEach(m => addMaterial(m.name, m.quantity));
         });

         // Quick Use Items
         loadout.quickUse.forEach(qu => {
            const item = throwables.find(t => t.id === qu.itemId);
            if (!item) return;
            const produced = item.craftInfo?.quantityProduced || 1;
            const craftTimes = Math.ceil(qu.quantity / produced);
            item.craftInfo?.materials.forEach(m => addMaterial(m.name, m.quantity * craftTimes));
         });
      });

      const rarityOrder = { 'LEGENDARY': 0, 'EPIC': 1, 'RARE': 2, 'UNCOMMON': 3, 'COMMON': 4 };

      const craftingMaterials = Object.entries(craftingTotals).map(([name, quantity]) => {
         const matData = materialsData.find(m => m.name === name);
         return {
            name,
            quantity: quantity * (state.multiplier || 1),
            rarity: matData?.rarity || 'COMMON',
            icon: matData?.icon || 'category',
            imageUrl: matData?.imageUrl
         };
      }).sort((a, b) => rarityOrder[a.rarity as keyof typeof rarityOrder] - rarityOrder[b.rarity as keyof typeof rarityOrder]);

      // Maintenance materials
      const maintenanceSet = new Set<string>();
      state.loadouts.forEach(loadout => {
         if (!loadout.isActive) return;
         [loadout.primary.weaponId, loadout.secondary.weaponId].forEach(wid => {
            if (!wid) return;
            const w = weapons.find(wp => wp.id === wid);
            if (!w) return;
            w.repairInfo?.forEach(tier => tier.materials.forEach(m => maintenanceSet.add(m.name)));
            w.upgradeInfo?.forEach(tier => tier.materials.forEach(m => maintenanceSet.add(m.name)));
         });
      });

      const maintenanceMaterials = Array.from(maintenanceSet).map(name => {
         const matData = materialsData.find(m => m.name === name);
         return { name, rarity: matData?.rarity || 'COMMON', icon: matData?.icon || 'category', imageUrl: matData?.imageUrl };
      }).sort((a, b) => rarityOrder[a.rarity as keyof typeof rarityOrder] - rarityOrder[b.rarity as keyof typeof rarityOrder]);

      return { craftingMaterials, maintenanceMaterials };
   }, [state, weapons, mods, throwables, augments, materialsData]);

   const { craftingMaterials, maintenanceMaterials } = requiredMaterials;
   const hasAnyMaterials = craftingMaterials.length > 0 || maintenanceMaterials.length > 0;

   // Render Subcomponents
   const renderWeaponSlot = (title: string, slotData: PlannerWeaponSlot, slotKey: 'primary' | 'secondary') => {
      const weapon = weapons.find(w => w.id === slotData.weaponId);
      return (
         <div className={`mb-4 bg-black/20 border border-slate-800 rounded-xl p-4 transition-all duration-300 relative group/wslot ${weapon ? getRarityHoverStyles(weapon.rarity) : ''}`}>
            <div className="flex justify-between items-center mb-3">
               <h4 className="text-[12px] font-black tracking-[0.3em] uppercase text-slate-500">{title}</h4>
               {weapon && (
                  <button onClick={() => updateCurrentLoadout({ [slotKey]: { weaponId: null, attachedModIds: [], maintenanceAction: 'NONE' } })} className="text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover/wslot:opacity-100">
                     <span className="material-symbols-outlined text-sm">remove_circle</span>
                  </button>
               )}
            </div>

            {!weapon ? (
               <button onClick={() => setPickerConfig({
                  isOpen: true,
                  title: `Select Weapon`,
                  items: weapons,
                  pickerType: 'weapon',
                  slotKey
               })} className="w-full py-6 border-2 border-dashed border-slate-800 rounded-lg text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-[13px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">add_circle</span> Select Weapon
               </button>
            ) : (
               <div className="space-y-3">
                  <RichTooltip item={weapon}>
                     <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded bg-black/50 p-1 shrink-0 border border-white/5 shadow-inner">
                           {weapon.imageUrl ? <img src={weapon.imageUrl} alt={weapon.name} className="w-full h-full object-contain drop-shadow-md" /> : <span className="material-symbols-outlined">{weapon.icon}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="font-bold text-slate-100 uppercase tracking-wider text-base">{weapon.name}</p>
                           <p className={`text-[11px] uppercase font-black tracking-widest mt-0.5 border inline-block px-1.5 py-0.5 rounded leading-none ${getRarityStyles(weapon.rarity)}`}>{weapon.rarity}</p>
                        </div>
                     </div>
                  </RichTooltip>

                  {/* Mods Section */}
                  <div className="bg-background-dark/80 p-3 rounded-lg border border-slate-800/50">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Apply Mods</span>
                        <button onClick={() => {
                            const weapon = weapons.find(w => w.id === slotData.weaponId);
                            const weaponSlots = weapon ? (WEAPON_MOD_SLOTS[weapon.id] || []) : [];
                            const filteredMods = weaponSlots.length > 0
                               ? mods.filter(m => weaponSlots.includes(getModSlotType(m)))
                               : mods; // Fallback: show all mods if weapon has no slot data
                            setPickerConfig({
                               isOpen: true,
                               title: 'Equip Weapon Mods',
                               items: filteredMods,
                               pickerType: 'mods',
                               slotKey
                            });
                         }} className="text-[11px] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1">
                           <span className="material-symbols-outlined text-sm text-primary">add</span> EDIT
                        </button>
                     </div>
                     <div className="space-y-2">
                        {slotData.attachedModIds.map(mid => {
                           const mod = mods.find(m => m.id === mid);
                           if (!mod) return null;
                           return (
                              <RichTooltip key={mid} item={mod}>
                              <div 
                                   className="flex justify-between items-center bg-black/40 border border-white/5 p-2 rounded-lg group/mod hover:border-slate-500 transition-colors">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-black/20 flex items-center justify-center p-0.5 border border-white/5">
                                       {mod.imageUrl ? <img src={mod.imageUrl} alt="" className="w-full h-full object-contain" /> : <span className="material-symbols-outlined text-[16px] text-slate-500">settings</span>}
                                    </div>
                                    <div>
                                       <span className="text-[13px] font-bold text-slate-200 block truncate max-w-[120px]">{mod.name}</span>
                                       <span className={`text-[10px] font-black uppercase tracking-widest ${getRarityStyles(mod.rarity).split(' ').find(c => c.startsWith('text-'))}`}>{mod.rarity}</span>
                                    </div>
                                 </div>
                                 <button onClick={() => {
                                    const newMods = slotData.attachedModIds.filter(id => id !== mid);
                                    updateCurrentLoadout({ [slotKey]: { ...slotData, attachedModIds: newMods } });
                                 }} className="p-1 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover/mod:opacity-100">
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                 </button>
                              </div>
                           </RichTooltip>
                        );
                     })}
                        {slotData.attachedModIds.length === 0 && <p className="text-[12px] text-slate-600 italic px-1 pt-1">No attachments equipped</p>}
                     </div>
                  </div>
               </div>
            )}
         </div>
      );
   };

   return (
      <div className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-[1400px] mx-auto w-full">
         <PickerModal
            isOpen={pickerConfig?.isOpen || false}
            title={pickerConfig?.title || ''}
            items={pickerConfig?.items || []}
            onClose={() => setPickerConfig(null)}
            isMultiSelect={pickerConfig?.pickerType !== 'weapon'}
            selectedIds={
               pickerConfig?.pickerType === 'augments' ? currentLoadout.augments :
               pickerConfig?.pickerType === 'shields' ? currentLoadout.shields :
               pickerConfig?.pickerType === 'quickUse' ? currentLoadout.quickUse.map(qu => qu.itemId) :
               pickerConfig?.pickerType === 'mods' && pickerConfig.slotKey ? currentLoadout[pickerConfig.slotKey].attachedModIds :
               []
            }
            onSelect={(id) => {
               if (pickerConfig?.pickerType === 'weapon' && pickerConfig.slotKey) {
                  updateCurrentLoadout({ [pickerConfig.slotKey]: { ...currentLoadout[pickerConfig.slotKey], weaponId: id } });
               }
            }}
            onToggle={(id) => {
               if (pickerConfig?.pickerType === 'augments') {
                  const newIds = currentLoadout.augments.includes(id) 
                     ? currentLoadout.augments.filter(aid => aid !== id) 
                     : [...currentLoadout.augments, id];
                  updateCurrentLoadout({ augments: newIds });
               } else if (pickerConfig?.pickerType === 'shields') {
                  const newIds = currentLoadout.shields.includes(id) 
                     ? currentLoadout.shields.filter(sid => sid !== id) 
                     : [...currentLoadout.shields, id];
                  updateCurrentLoadout({ shields: newIds });
               } else if (pickerConfig?.pickerType === 'quickUse') {
                  const exists = currentLoadout.quickUse.find(qu => qu.itemId === id);
                  const newQU = exists
                     ? currentLoadout.quickUse.filter(qu => qu.itemId !== id)
                     : [...currentLoadout.quickUse, { itemId: id, quantity: 1 }];
                  updateCurrentLoadout({ quickUse: newQU });
               } else if (pickerConfig?.pickerType === 'mods' && pickerConfig.slotKey) {
                  const currentIds = currentLoadout[pickerConfig.slotKey].attachedModIds;
                  const newIds = currentIds.includes(id)
                     ? currentIds.filter(mid => mid !== id)
                     : [...currentIds, id];
                  updateCurrentLoadout({ [pickerConfig.slotKey]: { ...currentLoadout[pickerConfig.slotKey], attachedModIds: newIds } });
               }
            }}
         />

         <FinalReportModal 
            isOpen={showReport}
            onClose={() => setShowReport(false)}
            materials={craftingMaterials}
            loadouts={state.loadouts}
            multiplier={state.multiplier}
         />

         <ConfirmationModal 
            isOpen={confirmModal?.isOpen || false}
            title={confirmModal?.title || ''}
            message={confirmModal?.message || ''}
            danger={confirmModal?.danger}
            onConfirm={confirmModal?.onConfirm || (() => {})}
            onCancel={() => setConfirmModal(null)}
         />

         <input 
            type="file" 
            ref={fileInputRef} 
            onChange={importConfig} 
            className="hidden" 
            accept=".json"
         />

         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5 shadow-xl">
                  <span className="material-symbols-outlined text-2xl">arrow_back</span>
               </button>
               <div>
                  <div>
                     <h2 className="text-3xl font-black tracking-[0.3em] text-white drop-shadow-glow">STASH PLANNER</h2>
                     <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase mt-1 opacity-70">Loadout-Agregated Resource Calibration</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 bg-black/40 border-2 border-emerald-500/40 p-2 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                   <div className="flex flex-col items-end px-4 border-r border-emerald-500/20">
                      <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">Save / Load</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <button 
                         onClick={exportConfig}
                         className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-all flex items-center justify-center text-emerald-400 hover:text-white"
                         title="Export Config to File"
                      >
                         <span className="material-symbols-outlined">download</span>
                      </button>
                      <button 
                         onClick={() => fileInputRef.current?.click()}
                         className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 transition-all flex items-center justify-center text-emerald-400 hover:text-white"
                         title="Import Config from File"
                      >
                         <span className="material-symbols-outlined">upload</span>
                      </button>
                   </div>
                </div>
             </div>
          </div>

         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1 min-h-0">
            {/* Left Card: Loadout Selection & Edit */}
            <div className="xl:col-span-8 bg-card-dark border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col h-[75vh] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary/10 to-transparent" />

               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]">engineering</span>
                      <h3 className="text-xl font-black text-slate-100 tracking-[0.2em]">Loadouts Manager</h3>
                  </div>
                  <button
                     onClick={() => setConfirmModal({
                        isOpen: true,
                        title: 'Wipe All Data',
                        message: 'This will clear all primary/secondary slots, mods, and tactical items across ALL loadouts. This action cannot be undone.',
                        danger: true,
                        onConfirm: wipeAllData
                     })}
                      className="flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest group/wipe"
                  >
                      <span className="material-symbols-outlined text-[14px]">delete_sweep</span> Wipe All
                  </button>
               </div>

               {/* Loadout Tabs */}
               <div className="flex gap-2 mb-8 p-1.5 bg-background-dark/80 rounded-2xl border border-slate-800/50">
                  {state.loadouts.map((l, idx) => (
                     <button
                        key={l.id}
                        onClick={() => setActiveLoadoutIndex(idx)}
                        className={`flex-1 relative flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 group ${activeLoadoutIndex === idx ? 'bg-primary shadow-[0_0_20px_rgba(19,91,236,0.4)]' : 'hover:bg-white/5'}`}
                     >
                        <div className="flex items-center gap-3">
                           <input
                              type="checkbox"
                              checked={l.isActive}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateLoadoutByIdx(idx, { isActive: e.target.checked })}
                              className={`w-4 h-4 rounded appearance-none border-2 transition-all cursor-pointer ${l.isActive ? 'bg-white border-white' : 'border-slate-700 bg-black/20 hover:border-slate-500'}`}
                           />
                           <span className={`text-[11px] font-black tracking-[0.2em] ${activeLoadoutIndex === idx ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                              {l.name}
                           </span>
                        </div>
                     </button>
                  ))}
               </div>

               {/* Configuration Area */}
               <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest text-primary uppercase">Active Config</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                     </div>
                     <button 
                        onClick={() => setConfirmModal({
                           isOpen: true,
                           title: `Wipe ${currentLoadout.name}`,
                           message: `Are you sure you want to clear all slots for ${currentLoadout.name}? Other loadouts will remain untouched.`,
                           danger: true,
                           onConfirm: () => resetLoadout(activeLoadoutIndex)
                        })}
                        className="flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest group/wipe"
                     >
                        <span className="material-symbols-outlined text-[14px]">delete</span> Wipe Loadout
                     </button>
                  </div>
                  <input
                     type="text"
                     value={currentLoadout.name}
                     onChange={(e) => updateCurrentLoadout({ name: e.target.value })}
                     className="bg-transparent border-none text-right font-black text-white text-[14px] tracking-[0.2em] focus:ring-0 w-40 outline-none placeholder:opacity-30"
                     placeholder="Rename"
                  />

                  <ScrollContainer className="flex-1 px-1">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">

                        {/* PRIMARY & SECONDARY */}
                        <div className="space-y-4">
                           {renderWeaponSlot('Primary Weapon', currentLoadout.primary, 'primary')}
                           {renderWeaponSlot('Secondary Weapon', currentLoadout.secondary, 'secondary')}
                        </div>

                        {/* AUGMENTS, SHIELDS, QUICK USE */}
                        <div className="space-y-4">

                           {/* Augments */}
                           <div className="bg-black/20 border border-slate-800 rounded-xl p-4">
                              <div className="flex justify-between items-center mb-3">
                                 <h4 className="text-[12px] font-black tracking-[0.3em] uppercase text-slate-500">AUGMENTS</h4>
                                 <button onClick={() => setPickerConfig({
                                    isOpen: true,
                                    title: 'Equip Augments',
                                    items: augments,
                                    pickerType: 'augments'
                                 })} className="text-[11px] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add</span> EDIT
                                 </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                 {currentLoadout.augments.map(aid => {
                                    const aug = augments.find(a => a.id === aid);
                                    if (!aug) return null;
                                    return (
                                       <RichTooltip key={aid} item={aug}>
                                          <div className="flex justify-between items-center bg-black/40 border border-white/5 p-2 rounded-lg group hover:border-slate-500 transition-colors">
                                             <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-black/20 border border-white/5 flex items-center justify-center p-1 shrink-0">
                                                   {aug.imageUrl ? <img src={aug.imageUrl} alt="" className="w-full h-full object-contain" /> : <span className="material-symbols-outlined text-sm text-slate-500">memory</span>}
                                                </div>
                                                <span className="text-[13px] font-bold text-slate-200 truncate max-w-[120px]">{aug.name}</span>
                                             </div>
                                          </div>
                                       </RichTooltip>
                                 );
                              })}
                                 {currentLoadout.augments.length === 0 && <p className="text-[12px] text-slate-600 italic px-1">No augments equipped</p>}
                              </div>
                           </div>

                           {/* Shields */}
                           <div className="bg-black/20 border border-slate-800 rounded-xl p-4">
                              <div className="flex justify-between items-center mb-3">
                                 <h4 className="text-[12px] font-black tracking-[0.3em] uppercase text-slate-500">SHIELDS</h4>
                                 <button onClick={() => setPickerConfig({
                                    isOpen: true,
                                    title: 'Equip Shields',
                                    items: throwables.filter(t => t.category === 'SHIELDS'),
                                    pickerType: 'shields'
                                 })} className="text-[11px] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add</span> EDIT
                                 </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                 {currentLoadout.shields.map(sid => {
                                    const item = throwables.find(t => t.id === sid);
                                    if (!item) return null;
                                    return (
                                       <RichTooltip key={sid} item={item}>
                                          <div className="flex justify-between items-center bg-black/40 border border-white/5 p-2 rounded-lg group hover:border-slate-500 transition-colors">
                                             <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-black/20 border border-white/5 flex items-center justify-center p-1 shrink-0">
                                                   {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-full h-full object-contain" /> : <span className="material-symbols-outlined text-sm text-slate-500">shield</span>}
                                                </div>
                                                <span className="text-[13px] font-bold text-slate-200 truncate max-w-[120px]">{item.name}</span>
                                             </div>
                                          </div>
                                       </RichTooltip>
                                 );
                              })}
                                 {currentLoadout.shields.length === 0 && <p className="text-[12px] text-slate-600 italic px-1">No shields equipped</p>}
                              </div>
                           </div>

                           {/* Quick Use */}
                           <div className="bg-black/20 border border-slate-800 rounded-xl p-4">
                              <div className="flex justify-between items-center mb-3">
                                 <h4 className="text-[12px] font-black tracking-[0.3em] uppercase text-slate-500">QUICK USE</h4>
                                 <button onClick={() => setPickerConfig({
                                    isOpen: true,
                                    title: 'Manage Quick Use Cache',
                                    items: throwables.filter(t => (t.category === 'THROWABLES' || t.category === 'DEFENSIVE')),
                                    pickerType: 'quickUse'
                                 })} className="text-[11px] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">add</span> EDIT
                                 </button>
                              </div>
                              <div className="space-y-2">
                                 {currentLoadout.quickUse.map((qu, idx) => {
                                    const item = throwables.find(t => t.id === qu.itemId);
                                    if (!item) return null;
                                    return (
                                       <RichTooltip key={idx} item={item}>
                                          <div className="flex justify-between items-center bg-black/40 border border-white/5 p-2 rounded-lg group">
                                             <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-black/20 border border-white/5 flex items-center justify-center p-1 shrink-0">
                                                   {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-full h-full object-contain" /> : <span className="material-symbols-outlined text-sm text-slate-500">explosion</span>}
                                                </div>
                                                <span className="text-[13px] font-bold text-slate-200 truncate max-w-[80px]">{item.name}</span>
                                             </div>
                                             <div className="flex items-center gap-2 bg-black/40 rounded border border-white/5 p-0.5">
                                                <button onClick={() => {
                                                   const newQU = [...currentLoadout.quickUse];
                                                   if (newQU[idx].quantity > 1) newQU[idx].quantity -= 1;
                                                   else newQU.splice(idx, 1);
                                                   updateCurrentLoadout({ quickUse: newQU });
                                                }} className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white">-</button>
                                                <span className="text-[13px] font-black text-primary w-4 text-center">{qu.quantity}</span>
                                                <button onClick={() => {
                                                   const newQU = [...currentLoadout.quickUse];
                                                   newQU[idx].quantity += 1;
                                                   updateCurrentLoadout({ quickUse: newQU });
                                                }} className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white">+</button>
                                             </div>
                                          </div>
                                       </RichTooltip>
                                 );
                              })}
                                 {currentLoadout.quickUse.length === 0 && <p className="text-[12px] text-slate-600 italic px-1">No tactical gear selected</p>}
                              </div>
                           </div>

                        </div>
                     </div>
                  </ScrollContainer>
               </div>
            </div>

            {/* Right Card: Stash Requirements Asset List */}
            <div className="xl:col-span-4 bg-card-dark border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col h-[75vh] relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-primary/50 via-primary/10 to-transparent" />

                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_8px_rgba(19,91,236,0.6)]">analytics</span>
                      <h3 className="text-xl font-black text-white tracking-[0.2em]">Stash List</h3>
                   </div>
                </div>

               <ScrollContainer className="flex-1">
                  {!hasAnyMaterials ? (
                     <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-6 mt-20 opacity-30">
                        <span className="material-symbols-outlined text-7xl animate-pulse">monitoring</span>
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-center max-w-[200px] leading-relaxed italic">Configure loadouts to visualize resource needs</p>
                     </div>
                  ) : (
                      <div className="flex flex-col gap-4">
                         {/* Items Needed Header */}
                         <div className="flex items-center gap-3 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30"></div>
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">ITEMS NEEDED FOR PLAN</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30"></div>
                         </div>
                         <div className="space-y-2">
                            {[...maintenanceMaterials, ...craftingMaterials].map((mat, idx) => {
                               const rarityStyles = getRarityStyles(mat.rarity as Rarity);
                               return (
                                  <RichTooltip key={idx} item={mat}>
                                     <div
                                        key={idx}
                                        
                                        className="group/mat flex items-center justify-between p-3 rounded-2xl border transition-all relative overflow-hidden bg-black/40 border-white/5 hover:border-primary/50 hover:bg-black/60"
                                     >
                                        <div className="flex items-center gap-3 relative z-10 shrink-0">
                                           <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/5 p-1.5 flex items-center justify-center transition-transform group-hover/mat:scale-110">
                                              {mat.imageUrl ? <img src={mat.imageUrl} alt="" className="w-full h-full object-contain" /> : <span className="material-symbols-outlined text-lg opacity-40">category</span>}
                                           </div>
                                           <div>
                                              <span className="text-[12px] font-black uppercase tracking-wider block leading-tight text-slate-100">{mat.name}</span>
                                              <span className={`text-[8px] font-black uppercase tracking-widest ${rarityStyles.split(' ').find(c => c.startsWith('text-'))}`}>{mat.rarity}</span>
                                           </div>
                                        </div>
                                        <div className="flex items-center gap-4 relative z-10">
                                           <div className="text-xl font-black font-mono text-primary">
                                              {mat.quantity}
                                           </div>
                                        </div>
                                     </div>
                                  </RichTooltip>
                               );
                            })}
                         </div>
                      </div>
                  )}
                </ScrollContainer>

                {hasAnyMaterials && (
                   <div className="mt-6 pt-6 border-t border-slate-800">
                      <button
                         onClick={() => setShowReport(true)}
                         className="w-full py-4 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-2xl text-sm font-black uppercase tracking-[0.3em] transition-all border-2 border-primary/30 hover:border-primary flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(19,91,236,0.1)] hover:shadow-[0_0_30px_rgba(19,91,236,0.3)]"
                      >
                         <span className="material-symbols-outlined text-xl">analytics</span>
                         Finalize Plan
                      </button>
                   </div>
                )}
             </div>
          </div>
       </div>
    );
};

export default PlannerScreen;
