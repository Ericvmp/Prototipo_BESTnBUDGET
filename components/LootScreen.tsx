import React, { useState } from 'react';
import { LootCategory, Material } from '../types';
import { getSourceImageUrl, getRarityStyles, getItemRarity, getRarityGlowStyles, getRarityHoverStyles } from '../utils';
import { MATERIALS_DATA } from '../data';

interface LootScreenProps {
    data: LootCategory[];
    onBack: () => void;
    onMaterialSelect: (material: Material) => void;
}

const LootScreen: React.FC<LootScreenProps> = ({ data, onBack, onMaterialSelect }) => {
    return (
        <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-4">
                <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <div>
                    <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">MATERIALS Inventory</h2>
                    <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-1">Resource Archive & Extraction Data</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {data.map((category) => {
                    const material = MATERIALS_DATA.find(m => m.name === category.material);

                    return (
                        <button
                            key={category.id}
                            onClick={() => material && onMaterialSelect(material)}
                            className={`group cursor-pointer relative flex flex-col bg-card-dark rounded-2xl transition-all duration-300 overflow-hidden shadow-lg border-2 hover:ring-8 hover:ring-inset border-slate-800 ${getRarityHoverStyles(material?.rarity || 'COMMON')}`}
                        >
                                {/* Background Rarity Glow */}
                                {material && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(material.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>
                                )}
                                {/* Scanline */}
                                <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
                            {/* Header: Item Icon and Name */}
                            <div className="flex items-center gap-4 p-4 relative">
                                <div className="flex flex-1 items-center gap-4 text-left">
                                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-background-dark border border-slate-700 shrink-0 relative z-10 transition-transform duration-500">
                                        <img
                                            src={category.materialImageUrl || material?.imageUrl || ''}
                                            alt={category.material}
                                            className="w-8 h-8 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transform group-hover:rotate-6 group-hover:scale-125 transition-all duration-500"
                                        />
                                        {category.craftingStation && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center border-2 border-slate-900 shadow-lg" title={category.craftingStation}>
                                                <span className="material-symbols-outlined text-[10px] text-white">precision_manufacturing</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-[13px] font-black tracking-widest uppercase text-white">{category.material}</h3>
                                            {material && (
                                                <span className={`text-[7px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${getRarityStyles(material.rarity)}`}>
                                                    {material.rarity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-40">
                                            <span className="material-symbols-outlined text-[12px]">inventory_2</span>
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Resource Archive</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </main>
    );
};

export default LootScreen;
