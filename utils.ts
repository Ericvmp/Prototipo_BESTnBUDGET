
import { Rarity, Weapon, Modification, Material } from './types';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA } from './data';

// ─── Mod Slot Type helper (used by Planner compatibility filter) ───

export const getModSlotType = (mod: Modification): string => {
    // Muzzle family
    if (mod.category === 'MUZZLE') {
        if (mod.weaponTypeCompatibility?.includes('SHOTGUN')) return 'Shotgun Muzzle';
        return 'Muzzle';
    }
    // Magazine family
    if (mod.category === 'MAGAZINE') {
        if (mod.ammoCompatibility === 'LIGHT') return 'Light Magazine';
        if (mod.ammoCompatibility === 'MEDIUM') return 'Medium Magazine';
        if (mod.ammoCompatibility === 'SHOTGUN') return 'Shotgun Magazine';
        return 'Magazine';
    }
    if (mod.category === 'UNDERBARREL') return 'Underbarrel';
    if (mod.category === 'STOCK') return 'Stock';
    // Special / Tech mods (e.g. Anvil Splitter)
    if (mod.category === 'ALL' || mod.category === 'TECH') return 'Tech Mod';
    return 'Unknown';
};

// ─── Rarity styling helpers (shared by all Card components) ───

export const getRarityStyles = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'bg-slate-600/40 text-slate-300 border-slate-500/50';
        case 'UNCOMMON': return 'bg-emerald-600/40 text-emerald-400 border-emerald-500/50';
        case 'RARE': return 'bg-blue-600/40 text-blue-400 border-blue-500/50';
        case 'EPIC': return 'bg-fuchsia-600/40 text-fuchsia-400 border-fuchsia-500/50';
        case 'LEGENDARY': return 'bg-amber-500/30 text-amber-400 border-amber-500/50';
        default: return 'bg-slate-600/40 text-slate-300 border-slate-500/50';
    }
};

export const getRarityIconColor = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'text-slate-400';
        case 'UNCOMMON': return 'text-emerald-400';
        case 'RARE': return 'text-blue-400';
        case 'EPIC': return 'text-fuchsia-400';
        case 'LEGENDARY': return 'text-amber-400';
        default: return 'text-slate-400';
    }
};

export const getRarityGlowStyles = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'from-slate-400/70';
        case 'UNCOMMON': return 'from-emerald-400/70';
        case 'RARE': return 'from-blue-400/70';
        case 'EPIC': return 'from-fuchsia-400/70';
        case 'LEGENDARY': return 'from-amber-400/70';
        default: return 'from-slate-400/70';
    }
};

export const getRarityHoverStyles = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'hover:border-slate-400 hover:ring-slate-400 hover:shadow-[0_0_15px_rgba(148,163,184,0.4)] hover:bg-slate-800/80';
        case 'UNCOMMON': return 'hover:border-emerald-400 hover:ring-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:bg-slate-800/80';
        case 'RARE': return 'hover:border-blue-400 hover:ring-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.4)] hover:bg-slate-800/80';
        case 'EPIC': return 'hover:border-fuchsia-400 hover:ring-fuchsia-400 hover:shadow-[0_0_15px_rgba(232,121,249,0.4)] hover:bg-slate-800/80';
        case 'LEGENDARY': return 'hover:border-amber-400 hover:ring-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:bg-slate-800/80';
        default: return 'hover:border-slate-400 hover:ring-slate-400 hover:shadow-[0_0_15px_rgba(148,163,184,0.4)] hover:bg-slate-800/80';
    }
};

export const getRarityBorderColor = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'border-slate-500/30';
        case 'UNCOMMON': return 'border-emerald-500/30';
        case 'RARE': return 'border-blue-500/30';
        case 'EPIC': return 'border-fuchsia-500/30';
        case 'LEGENDARY': return 'border-amber-500/30';
        default: return 'border-slate-500/30';
    }
};

// ─── Entity-linking helpers (shared by overlays) ───

export type EntityMatch =
    | { type: 'weapon'; entity: Weapon }
    | { type: 'mod'; entity: Modification }
    | { type: 'material'; entity: Material }
    | null;

/**
 * Finds the first matching entity (Weapon, Mod, or Material) referenced in a text string.
 * Sorts by name length descending to avoid partial matches (e.g. "Anvil" matching before "Anvil I").
 */
export const findEntityInText = (text: string, excludeMaterialId?: string): EntityMatch => {
    const lowerText = text.toLowerCase();

    const weapons = [...WEAPONS_DATA].sort((a, b) => b.name.length - a.name.length);
    const weaponMatch = weapons.find(w => lowerText.includes(w.name.toLowerCase()));
    if (weaponMatch) return { type: 'weapon', entity: weaponMatch };

    const mods = [...MODS_DATA].sort((a, b) => b.name.length - a.name.length);
    const modMatch = mods.find(m => lowerText.includes(m.name.toLowerCase()));
    if (modMatch) return { type: 'mod', entity: modMatch };

    const mats = [...MATERIALS_DATA].sort((a, b) => b.name.length - a.name.length);
    const matMatch = mats.find(
        mat => lowerText.includes(mat.name.toLowerCase()) && mat.id !== excludeMaterialId
    );
    if (matMatch) return { type: 'material', entity: matMatch };

    return null;
};

/**
 * Returns true if the text references any known entity (weapon, mod, or material).
 */
export const isTextLinkable = (text: string, excludeMaterialId?: string): boolean => {
    return findEntityInText(text, excludeMaterialId) !== null;
};

/**
 * Resolves a LOOT source item name to the best available local image URL.
 * Checks weapons (strips tier suffix), mods (exact match), and materials.
 * Returns undefined if no local image is found (caller should use explicit imageUrl or fallback).
 */
export const getSourceImageUrl = (sourceName: string): string | undefined => {
    // Strip tier suffixes like " I", " II", " III", " IV" for weapon matching
    const baseName = sourceName.replace(/\s+(I{1,3}|IV)$/, '');

    // Check weapons (match base name)
    const weapon = WEAPONS_DATA.find(w => w.name.toLowerCase() === baseName.toLowerCase());
    if (weapon?.imageUrl) return weapon.imageUrl;

    // Check mods (exact name match first, then base name)
    const modExact = MODS_DATA.find(m => m.name.toLowerCase() === sourceName.toLowerCase());
    if (modExact?.imageUrl) return modExact.imageUrl;
    const modBase = MODS_DATA.find(m => m.name.toLowerCase() === baseName.toLowerCase());
    if (modBase?.imageUrl) return modBase.imageUrl;

    // Check materials
    const material = MATERIALS_DATA.find(m => m.name.toLowerCase() === sourceName.toLowerCase());
    if (material?.imageUrl) return material.imageUrl;

    return undefined;
};
/**
 * Resolves a LOOT source item name to its corresponding Rarity.
 * Checks weapons, mods, and materials first, then applies fallbacks for junk/ARC items.
 */
export const getItemRarity = (name: string): Rarity => {
    const lowerName = name.toLowerCase();

    // Strip tier suffixes for weapon matching
    const baseName = name.replace(/\s+(I{1,3}|IV)$/, '');

    // 1. Check Weapons (base name match)
    const weapon = WEAPONS_DATA.find(w => w.name.toLowerCase() === baseName.toLowerCase());
    if (weapon) return weapon.rarity;

    // 2. Check Mods (exact or base match)
    const mod = MODS_DATA.find(m => m.name.toLowerCase() === name.toLowerCase() || m.name.toLowerCase() === baseName.toLowerCase());
    if (mod) return mod.rarity;

    // 3. Check Materials
    const material = MATERIALS_DATA.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (material) return material.rarity;

    // 4. Hardcoded fallbacks for ARC parts and specific items
    if (lowerName.includes('damaged') || lowerName.includes('burned') || lowerName.includes('unusable') || lowerName.includes('ruined')) return 'COMMON';

    const arcRareItems = [
        'pulse unit', 'driver', 'gyro', 'adv arc powercell',
        'arc circuitry', 'bastion cell', 'bombardier cell', 'industrial magnet',
        'high-tech', 'frequency modulation', 'photoelectric', 'power rod'
    ];
    if (arcRareItems.some(item => lowerName.includes(item))) return 'RARE';

    const arcUncommonItems = ['arc alloy', 'motion core', 'spotter relay', 'snitch scanner', 'sample cleaner', 'rotary encoder', 'hornet driver', 'magnet'];
    if (arcUncommonItems.some(item => lowerName.includes(item))) return 'UNCOMMON';

    // 5. Default
    return 'COMMON';
};
