import React, { useState } from 'react';
import { LootCategory, Material } from '../types';
import { getRarityStyles, getItemRarity, getRarityGlowStyles, getRarityHoverStyles, getRarityBorderColor } from '../utils';
import { MATERIALS_DATA } from '../data';
import { generateItemTooltip } from './tooltipHelper';
import RichTooltip from './RichTooltip';
import SmartItemIcon from './SmartItemIcon';
import { useLanguage } from './LanguageContext';

interface LootScreenProps {
    data: LootCategory[];
    onBack: () => void;
    onMaterialSelect: (material: Material) => void;
}

const LootScreen: React.FC<LootScreenProps> = ({ data, onBack, onMaterialSelect }) => {
    const { t, translateItemName } = useLanguage();

    return (
        <main className="flex-1 flex flex-col p-6 pb-32 relative z-10 animate-fade-in max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase italic drop-shadow-[0_0_20px_rgba(16,185,129,0.6)] leading-none">{t('nav.materials')}</h2>
                        <p className="text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-wider mt-2 opacity-80">{t('hint.lock_tooltip')}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 bg-black/40 border border-slate-800/50 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-slate-600 bg-slate-900/80 flex items-center justify-center shadow-inner shadow-black/50">
                            <span className="material-symbols-outlined text-[12px] text-slate-400">layers</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('tooltip.stack_size')}</span>
                    </div>
                    <div className="w-px h-6 bg-slate-800 hidden md:block" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-slate-900 shadow-lg">
                            <span className="material-symbols-outlined text-[12px] text-white">precision_manufacturing</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('tooltip.craftable')}</span>
                    </div>
                    <div className="w-px h-6 bg-slate-800 hidden md:block" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                            <span className="material-symbols-outlined text-[12px] text-emerald-100">storefront</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('materials.trader_celeste')}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-6">
                {data.map((category) => {
                    const material = MATERIALS_DATA.find(m => m.name === category.material);

                    return (
                        <div key={category.id} className="min-w-0">
                        <RichTooltip item={material || { name: category.material, rarity: 'COMMON' }}>
                            <button
                                onClick={() => material && onMaterialSelect(material)}
                                className={`group cursor-pointer relative flex w-full bg-card-dark rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${getRarityBorderColor(material?.rarity || 'COMMON')} ${getRarityHoverStyles(material?.rarity || 'COMMON')}`}
                            >
                                {/* Background Rarity Glow */}
                                {material && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(material.rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}></div>
                                )}
                                {/* Scanline */}
                                <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
                                
                                <div className="flex items-center gap-6 p-4 w-full relative z-10">
                                    {/* Left: Image (20% larger than previous w-14 -> w-18) */}
                                    <div className={`relative w-24 h-24 rounded-xl flex items-center justify-center bg-background-dark shrink-0 transition-transform duration-500 group-hover:scale-105 shadow-inner overflow-hidden ${getRarityBorderColor(material?.rarity || 'COMMON')}`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(material?.rarity || 'COMMON')} opacity-20`}></div>
                                        <SmartItemIcon
                                            itemName={category.material}
                                            icon="category"
                                            rarity={material?.rarity || 'COMMON'}
                                            imageClassName="w-[76px] h-[76px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10"
                                            iconClassName="text-5xl relative z-10"
                                        />
                                    </div>

                                    {/* Right: Info */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <h3 className="text-base md:text-xl font-black text-slate-100 group-hover:text-white transition-colors truncate tracking-wider mb-2">
                                            {translateItemName(category.material)}
                                        </h3>
                                        
                                        <div className="flex flex-wrap items-center gap-4 mt-1">
                                            {/* Rarity */}
                                            {material && (
                                                <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${getRarityStyles(material.rarity).split(' ').filter(s => !s.startsWith('border') && !s.startsWith('bg') && !s.startsWith('px') && !s.startsWith('py')).join(' ')}`}>
                                                    {t('rarity.' + material.rarity.toLowerCase())}
                                                </span>
                                            )}
                                            
                                            {/* Stack */}
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-[16px] leading-none">layers</span>
                                                {material?.stackSize || 1}
                                            </div>

                                            {/* Craftable */}
                                            {category.craftingStation && (
                                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center border border-slate-900 shadow-md" title={category.craftingStation}>
                                                    <span className="material-symbols-outlined text-[12px] text-white">precision_manufacturing</span>
                                                </div>
                                            )}

                                            {/* Celeste */}
                                            {material?.purchasableFromCeleste && (
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20" title={`${t('tooltip.purchasable')} - ${material.celesteSeedCost} ${t('tooltip.celeste_seeds')}`}>
                                                    <div className="flex items-center gap-1 mr-1 pr-1 border-r border-emerald-500/30">
                                                        <img src="https://arcraiders.wiki/w/images/5/54/Icon_Nature.png" alt="Seeds" className="w-3 h-3 object-contain" />
                                                        <span className="text-white font-mono text-[12px]">{material.celesteSeedCost}</span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-[16px] leading-none">storefront</span>
                                                    CELESTE
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </RichTooltip>
                        </div>
                    );
                })}
            </div>
            <div className="h-[100px] w-full pointer-events-none" />
        </main>
    );
};

export default LootScreen;
