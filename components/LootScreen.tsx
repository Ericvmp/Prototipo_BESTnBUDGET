import React, { useState } from 'react';
import { LootCategory, Material } from '../types';
import { getSourceImageUrl, getRarityStyles, getItemRarity, getRarityGlowStyles, getRarityHoverStyles, getRarityBorderColor } from '../utils';
import { MATERIALS_DATA } from '../data';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';

interface LootScreenProps {
    data: LootCategory[];
    onBack: () => void;
    onMaterialSelect: (material: Material) => void;
}

const LootScreen: React.FC<LootScreenProps> = ({ data, onBack, onMaterialSelect }) => {
    return (
        <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-2xl font-black tracking-[0.3em] text-white uppercase">MATERIALS</h2>
                        <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-1">Extraction & Component Data</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 bg-black/40 border border-slate-800/50 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-slate-900 shadow-lg">
                            <span className="material-symbols-outlined text-[12px] text-white">precision_manufacturing</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Craftable</span>
                    </div>
                    <div className="w-px h-6 bg-slate-800" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                            <span className="material-symbols-outlined text-[12px] text-emerald-100">storefront</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trader Celeste</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {data.map((category) => {
                    const material = MATERIALS_DATA.find(m => m.name === category.material);

                    return (
                        <RichTooltip item={material || { name: category.material, rarity: 'COMMON' }}>
                            <button
                                key={category.id}
                                onClick={() => material && onMaterialSelect(material)}
                                className={`group cursor-pointer relative flex flex-col bg-card-dark rounded-2xl transition-all duration-300 overflow-hidden shadow-lg border hover:ring-8 hover:ring-inset ${getRarityBorderColor(material?.rarity || 'COMMON')} ${getRarityHoverStyles(material?.rarity || 'COMMON')}`}
                            >
                                {/* Background Rarity Glow */}
                                {material && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(material.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>
                                )}
                                {/* Scanline */}
                                <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
                                {/* Header: Item Icon and Name */}
                                <div className="flex items-center justify-between gap-4 p-4 relative min-h-[96px]">
                                    <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                                        <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-background-dark border border-slate-700 shrink-0 relative z-10 transition-transform duration-500 group-hover:scale-105">
                                            <img
                                                src={category.materialImageUrl || material?.imageUrl || ''}
                                                alt={category.material}
                                                className="w-8 h-8 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transform group-hover:rotate-6 group-hover:scale-125 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col gap-1.5 mb-0.5">
                                                <h3 className="text-[16px] font-black text-white truncate max-w-full leading-tight">{category.material}</h3>
                                                {material && (
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${getRarityStyles(material.rarity)}`}>
                                                            {material.rarity}
                                                        </span>
                                                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-600 bg-slate-800 text-slate-300 uppercase tracking-widest flex items-center gap-1 shadow-inner shadow-black/50">
                                                            <span className="material-symbols-outlined text-[13px] text-slate-400 leading-none">layers</span>
                                                            {material.stackSize || 1}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interaction Icons / Stack */}
                                    <div className="flex flex-col gap-2 shrink-0 border-l border-white/5 pl-4 ml-2 justify-center items-center h-full">
                                        {category.craftingStation && (
                                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-slate-900 shadow-lg group-hover:scale-110 transition-transform" title={category.craftingStation}>
                                                <span className="material-symbols-outlined text-[14px] text-white">precision_manufacturing</span>
                                            </div>
                                        )}
                                        {material?.purchasableFromCeleste && (
                                            <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform" title="Purchasable from Trader Celeste">
                                                <span className="material-symbols-outlined text-[14px] text-emerald-100">storefront</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </RichTooltip>
                    );
                })}
            </div>
        </main>
    );
};

export default LootScreen;
