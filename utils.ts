
import { Rarity, Weapon, Modification, Material, Throwable, Augment, LootCategory, WeaponSetup } from './types';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA, THROWABLES_DATA, AUGMENTS_DATA, LOOT_DATA } from './data';

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
        case 'COMMON': return 'hover:ring-slate-500/30 hover:border-slate-400 shadow-slate-900/50';
        case 'UNCOMMON': return 'hover:ring-emerald-500/30 hover:border-emerald-400 shadow-emerald-900/50';
        case 'RARE': return 'hover:ring-blue-500/30 hover:border-blue-400 shadow-blue-900/50';
        case 'EPIC': return 'hover:ring-fuchsia-500/30 hover:border-fuchsia-400 shadow-fuchsia-900/50';
        case 'LEGENDARY': return 'hover:ring-amber-500/30 hover:border-amber-400 shadow-amber-900/50';
        default: return 'hover:ring-slate-500/30 hover:border-slate-400';
    }
};

export const getRarityBorderColor = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return 'border-[3px] border-slate-500/30';
        case 'UNCOMMON': return 'border-[3px] border-emerald-500/30';
        case 'RARE': return 'border-[3px] border-blue-500/30';
        case 'EPIC': return 'border-[3px] border-fuchsia-500/30';
        case 'LEGENDARY': return 'border-[3px] border-amber-500/30';
        default: return 'border-[3px] border-slate-500/30';
    }
};

/**
 * Advanced Asset Resolver
 * Attempts to find the best image for a given source name.
 * Strips tier suffixes like " I", " II", " III", " IV" for matching
 */
export const getSourceImageUrl = (sourceName: string): string | null => {
    const lowerName = sourceName.toLowerCase();
    
    // Strip tier suffixes like " I", " II", " III", " IV" for matching
    const baseName = sourceName.replace(/\s+(I{1,3}|IV)$/, '');
    const lowerBase = baseName.toLowerCase();

    // 1. Check Weapons (match base name)
    const weapon = WEAPONS_DATA.find(w => w.name.toLowerCase() === lowerBase);
    if (weapon?.imageUrl) return weapon.imageUrl;

    // 2. Check Mods (exact name match first, then base name)
    const modExact = MODS_DATA.find(m => m.name.toLowerCase() === lowerName);
    if (modExact?.imageUrl) return modExact.imageUrl;
    const modBase = MODS_DATA.find(m => m.name.toLowerCase() === lowerBase);
    if (modBase?.imageUrl) return modBase.imageUrl;

    // 3. Check Materials
    const material = MATERIALS_DATA.find(m => m.name.toLowerCase() === lowerName);
    if (material?.imageUrl) return material.imageUrl;

    // 4. Check Throwables & Augments
    const throwable = THROWABLES_DATA.find(t => t.name.toLowerCase() === lowerName || t.name.toLowerCase() === lowerBase);
    if (throwable?.imageUrl) return throwable.imageUrl;

    const augment = AUGMENTS_DATA.find(a => a.name.toLowerCase() === lowerName || a.name.toLowerCase() === lowerBase);
    if (augment?.imageUrl) return augment.imageUrl;

    // 5. Check LOOT_DATA for matches within sources of any material
    for (const category of LOOT_DATA) {
        if (category.material.toLowerCase() === lowerName) return category.materialImageUrl;
        
        const sourceMatch = category.sources.find(s => 
            s.name.toLowerCase() === lowerName || 
            s.name.toLowerCase() === lowerBase
        );
        if (sourceMatch?.imageUrl) return sourceMatch.imageUrl;
    }

    return null;
};

/**
 * Universal Rarity Resolver
 * Checks weapons, mods, and materials first, then applies fallbacks for junk/ARC items.
 */
export const getItemRarity = (name: string): Rarity => {
    if (!name) return 'COMMON';
    const trimmedName = name.trim();
    const lowerName = trimmedName.toLowerCase();

    // Strip tier suffixes for weapon matching
    const baseName = trimmedName.replace(/\s+(I{1,3}|IV)$/, '');
    const lowerBase = baseName.toLowerCase();

    // 1. Check Weapons
    const weapon = WEAPONS_DATA.find(w => w.name.toLowerCase() === lowerName || w.name.toLowerCase() === lowerBase);
    if (weapon) return weapon.rarity;

    // 2. Check Mods
    const mod = MODS_DATA.find(m => m.name.toLowerCase() === lowerName || m.name.toLowerCase() === lowerBase);
    if (mod) return mod.rarity;

    // 3. Check Materials
    const material = MATERIALS_DATA.find(m => m.name.toLowerCase() === lowerName);
    if (material) return material.rarity;

    // 4. Check Throwables & Shields
    const throwable = THROWABLES_DATA.find(t => t.name.toLowerCase() === lowerName || t.name.toLowerCase() === lowerBase);
    if (throwable) return throwable.rarity;

    // 5. Check Augments
    const augment = AUGMENTS_DATA.find(a => a.name.toLowerCase() === lowerName || a.name.toLowerCase() === lowerBase);
    if (augment) return augment.rarity;

    // Hardcoded fallbacks for items that might be referenced but not in main arrays or have slight name diffs
    if (lowerName.includes('heavy shield')) return 'EPIC';
    if (lowerName.includes('medium shield')) return 'RARE';
    if (lowerName.includes('light shield')) return 'UNCOMMON';
    
    const arcUncommonItems = ['arc alloy', 'motion core', 'spotter relay', 'snitch scanner', 'sample cleaner', 'rotary encoder', 'hornet driver', 'magnet', 'arc circuitry'];
    if (arcUncommonItems.some(item => lowerName.includes(item))) return 'UNCOMMON';

    // Default
    return 'COMMON';
};

/**
 * Parses a material data string in the format "Item Name (Qtyx)"
 * Returns an object with name and quantity, or the original string as name if parsing fails.
 */
export const parseMaterialString = (s: string): { name: string; quantity: number } => {
    if (!s) return { name: '', quantity: 1 };
    const match = s.match(/(.+?)\s*\((\d+)x\)/);
    if (match) {
        return {
            name: match[1].trim(),
            quantity: parseInt(match[2], 10)
        };
    }
    return { name: s.trim(), quantity: 1 };
};
