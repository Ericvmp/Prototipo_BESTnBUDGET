import React from 'react';
import RichTooltip from './RichTooltip';
import { getRarityHoverStyles, getRarityIconColor, getRarityStyles } from '../utils';
import SmartItemIcon from './SmartItemIcon';
import { useLanguage } from './LanguageContext';

interface PickerModalProps {
   isOpen: boolean;
   title: string;
   items: any[];
   onSelect: (id: string) => void;
   onClose: () => void;
   isMultiSelect?: boolean;
   selectedIds?: string[];
   onToggle?: (id: string) => void;
}

const PickerModal: React.FC<PickerModalProps> = ({ isOpen, title, items, onSelect, onClose, isMultiSelect = false, selectedIds = [], onToggle }) => {
   const { t, translateItemName } = useLanguage();
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in" onClick={onClose}>
         <div className="bg-card-dark border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
               <div>
                  <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">{title}</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                     {isMultiSelect ? `${selectedIds.length} ${t('planner.picker.items_selected')}` : t('planner.picker.available_inventory')}
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  {isMultiSelect && (
                     <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(19,91,236,0.3)]"
                     >
                        {t('planner.confirm.confirm')}
                     </button>
                  )}
                  <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-slate-400">
                     <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
               </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto no-scrollbar">
               {(() => {
                  const isWeaponModPicker = items.some(i => ['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK'].includes(i.category));
                  if (isWeaponModPicker) {
                     const categoryOrder = ['MUZZLE', 'MAGAZINE', 'UNDERBARREL', 'STOCK', 'ALL'];
                     const getCategoryLabel = (cat: string) => {
                        const dictKey = cat === 'ALL' ? 'category.special' : `category.${cat.toLowerCase()}`;
                        return t(dictKey);
                     };
                     const categoryIcons: Record<string, string> = {
                        'MUZZLE': 'https://arcraiders.wiki/w/images/4/4b/Mods_Muzzle.png',
                        'MAGAZINE': 'https://arcraiders.wiki/w/images/c/c6/Mods_Medium-Mag.png',
                        'UNDERBARREL': 'https://arcraiders.wiki/w/images/0/01/Mods_Underbarrel.png',
                        'STOCK': 'https://arcraiders.wiki/w/images/f/f5/Mods_Stock.png',
                        'ALL': 'auto_awesome'
                     };
                     const grouped = categoryOrder.reduce((acc, cat) => {
                        const catItems = items.filter(i => i.category === cat);
                        if (catItems.length > 0) acc.push({ category: cat, items: catItems });
                        return acc;
                     }, [] as { category: string, items: any[] }[]);

                     return grouped.map(group => (
                        <div key={group.category} className="mb-6">
                           <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 bg-card-dark/95 backdrop-blur-sm py-2 px-1 -mx-1 rounded-xl">
                              {group.category === 'ALL' ? (
                                 <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                              ) : (
                                 <img src={categoryIcons[group.category]} alt={group.category} className="w-6 h-6 object-contain brightness-0 invert opacity-80" />
                              )}
                              <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-primary">{getCategoryLabel(group.category)}</h3>
                              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                              <span className="text-[9px] font-black text-slate-600 tracking-widest">{group.items.length}</span>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {group.items.map(item => {
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
                                          className={`flex items-center gap-5 py-5 px-5 bg-[#0a0d14] border-2 rounded-2xl cursor-pointer transition-all group relative overflow-hidden ${isSelected ? 'border-primary ring-4 ring-primary/10 shadow-[0_0_30px_rgba(19,91,236,0.3)] bg-slate-900/40' : 'border-slate-800/60 hover:border-slate-500'} ${getRarityHoverStyles(item.rarity || 'COMMON')}`}
                                       >
                                          <div className={`w-14 h-14 bg-black/60 rounded-xl flex items-center justify-center p-2 shrink-0 border-2 transition-all ${isSelected ? 'border-primary' : 'border-white/5'} group-hover:scale-105 shadow-inner`}>
                                             <SmartItemIcon itemName={item.name} icon={item.icon || 'military_tech'} rarity={item.rarity} imageClassName="w-full h-full object-contain drop-shadow-lg" iconClassName="text-2xl" />
                                          </div>
                                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                                             <p className="text-[15px] font-black text-slate-100 group-hover:text-white truncate leading-tight mb-1">{translateItemName(item.name)}</p>
                                             <div className="flex items-center gap-2">
                                                <p className={`text-[8px] uppercase font-black tracking-[0.1em] border px-1.5 py-0.5 rounded leading-none ${getRarityStyles(item.rarity || 'COMMON')}`}>{t('rarity.' + (item.rarity || 'COMMON').toLowerCase())}</p>
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
                           </div>
                        </div>
                     ));
                  }

                  // Non-categorized items
                  return (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    className={`flex items-center gap-5 py-5 px-5 bg-[#0a0d14] border-2 rounded-2xl cursor-pointer transition-all group relative overflow-hidden ${isSelected ? 'border-primary ring-4 ring-primary/10 shadow-[0_0_30px_rgba(19,91,236,0.3)] bg-slate-900/40' : 'border-slate-800/60 hover:border-slate-500'} ${getRarityHoverStyles(item.rarity || 'COMMON')}`}
                                 >
                                    <div className={`w-14 h-14 bg-black/60 rounded-xl flex items-center justify-center p-2 shrink-0 border-2 transition-all ${isSelected ? 'border-primary' : 'border-white/5'} group-hover:scale-105 shadow-inner`}>
                                       <SmartItemIcon itemName={item.name} icon={item.icon || 'military_tech'} rarity={item.rarity} imageClassName="w-full h-full object-contain drop-shadow-lg" iconClassName="text-2xl" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                       <p className="text-[15px] font-black text-slate-100 group-hover:text-white truncate leading-tight mb-1">{translateItemName(item.name)}</p>
                                       <div className="flex items-center gap-2">
                                          <p className={`text-[8px] uppercase font-black tracking-[0.1em] border px-1.5 py-0.5 rounded leading-none ${getRarityStyles(item.rarity || 'COMMON')}`}>{t('rarity.' + (item.rarity || 'COMMON').toLowerCase())}</p>
                                          {item.category && <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em]">{t('category.' + item.category.toLowerCase()) || item.category}</span>}
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
                              <p className="text-sm font-bold uppercase tracking-[0.3em] italic">{t('planner.picker.no_items')}</p>
                           </div>
                        )}
                     </div>
                  );
               })()}
            </div>
         </div>
      </div>
   );
};

export default PickerModal;
