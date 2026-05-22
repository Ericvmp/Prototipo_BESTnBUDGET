
import { Rarity, Weapon, Modification, Material, Throwable, Augment, LootCategory, WeaponSetup } from './types';
import { WEAPONS_DATA, MODS_DATA, MATERIALS_DATA, THROWABLES_DATA, AUGMENTS_DATA, LOOT_DATA } from './data';
import { BLUEPRINTS_DATA } from './blueprintData';

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

// ─── Smart Asset Dictionary ───

/**
 * Maps UI names to their exact image file base names to resolve discrepancies.
 * This is the definitive solution for abbreviations or punctuation differences.
 */
const ASSET_ALIASES: Record<string, string> = {
    "Adv Electrical Components": "Advanced Electrical Components",
    "Adv Mechanical Components": "Advanced Mechanical Components",
    "Adv ARC Powercell": "Advanced ARC Powercell",
    "Trigger'nade": "Trigger_'Nade",
    "Trigger 'Nade": "Trigger_'Nade",
    "Tactical Mk. 3 (Healing)": "Tactical Mk. 3 Healing",
    "Tactical Mk. 3 (Revival)": "Tactical Mk. 3 Revival",
    "Li'l Smoke Grenade": "Lil_Smoke_Grenade", // Just in case
    "\"Leviathan's Crown\" Ship Model": "Leviathans_Crown_Ship_Model",
    "\"Sirena Dorata\" Ship Model": "Sirena_Dorata_Ship_Model",
    "\"Twilight Compass\" Ship Model": "Twilight_Compass_Ship_Model",
    "\"Velocity\" Ship Model": "Velocity_Ship_Model",
    "\"Wind Sprite\" Ship Model": "Wind_Sprite_Ship_Model"
};

/**
 * Advanced Asset Resolver (Smart Asset Architecture)
 * Returns a list of possible URLs for an item image in order of priority.
 */
export const getSourceImageUrls = (sourceName: string): string[] => {
    if (!sourceName) return [];

    // Resolve alias if one exists
    const resolvedName = ASSET_ALIASES[sourceName] || sourceName;

    // Exact name with spaces replaced by underscores (e.g., "Muzzle Brake I" -> "Muzzle_Brake_I")
    const exactFormatted = resolvedName.replace(/ /g, '_');

    // Strip tier suffixes like " I", " II", " III", " IV" for a base fallback
    const baseNameStr = resolvedName.replace(/\s+(I{1,3}|IV)$/, '').trim();
    const baseFormatted = baseNameStr.replace(/ /g, '_');

    const extensions = ['.png', '.webp', '.jpg', '.jpeg'];
    const urls: string[] = [];

    for (const ext of extensions) {
        // Try exact formatted name first (Muzzle_Brake_I.webp)
        urls.push(`/images/items/${exactFormatted}${ext}`);

        // Try exact unformatted name (Muzzle Brake I.png)
        if (resolvedName !== exactFormatted) {
            urls.push(`/images/items/${resolvedName}${ext}`);
        }

        // If it has a tier suffix, also try the base name (Muzzle_Brake.png)
        if (baseNameStr !== resolvedName) {
            urls.push(`/images/items/${baseFormatted}${ext}`);
            if (baseNameStr !== baseFormatted) {
                urls.push(`/images/items/${baseNameStr}${ext}`);
            }
        }
    }

    return urls;
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

/**
 * Universal Item Resolver
 * Returns the full item object from any data array by name.
 */
export const findFullItem = (name: string): any => {
    if (!name) return null;
    const trimmedName = name.trim();
    const lowerName = trimmedName.toLowerCase();

    // Strip tier suffixes for weapon matching
    const baseName = trimmedName.replace(/\s+(I{1,3}|IV)$/, '');
    const lowerBase = baseName.toLowerCase();

    return WEAPONS_DATA.find(w => w.name.toLowerCase() === lowerName || w.name.toLowerCase() === lowerBase)
        || MODS_DATA.find(m => m.name.toLowerCase() === lowerName || m.name.toLowerCase() === lowerBase)
        || MATERIALS_DATA.find(m => m.name.toLowerCase() === lowerName)
        || THROWABLES_DATA.find(t => t.name.toLowerCase() === lowerName || t.name.toLowerCase() === lowerBase)
        || AUGMENTS_DATA.find(a => a.name.toLowerCase() === lowerName || a.name.toLowerCase() === lowerBase);
};

// ─── Trade Module ───────────────────────────────────────────────────────────

export type TradeItemCategory =
    | 'Weapon'
    | 'Mod'
    | 'Material'
    | 'Throwable'
    | 'Augment'
    | 'Blueprint';

export interface TradeItem {
    id: string;
    name: string;
    rarity: Rarity;
    image: string | null;
    category: TradeItemCategory;
    type?: string;
}

let _allItemsCache: TradeItem[] | null = null;
let _fetchPromise: Promise<TradeItem[]> | null = null;

/**
 * Loads items from the pre-generated /db/items.json (ARCTracker database).
 * Async fetch on first call, then cached forever.
 */
export const loadAllGameItems = async (): Promise<TradeItem[]> => {
    if (_allItemsCache) return _allItemsCache;
    if (_fetchPromise) return _fetchPromise;

    _fetchPromise = fetch('/db/items.json')
        .then(r => r.json())
        .then((data: { items: Array<{ id: string; name: string; rarity: string; category: string; image: string | null; type: string }> }) => {
            _allItemsCache = data.items.map(item => ({
                id:       item.id,
                name:     item.name,
                rarity:   (item.rarity || 'COMMON') as Rarity,
                image:    item.image || null,
                category: (item.category || 'Material') as TradeItemCategory,
                type:     item.type,
            }));
            return _allItemsCache;
        })
        .catch(() => {
            // Fallback to empty array if fetch fails
            _allItemsCache = [];
            return _allItemsCache;
        });

    return _fetchPromise;
};

/**
 * Sync accessor - returns whatever is currently cached.
 * Call loadAllGameItems() once at component mount to populate.
 */
export const getAllGameItems = (): TradeItem[] => _allItemsCache ?? [];

export const getTradeItemImage = (item: TradeItem): string | null => {
    // Blueprints already have a curated image path
    if (item.image) return item.image;
    // Build smart-asset URL for everything else
    const urls = getSourceImageUrls(item.name);
    return urls.length > 0 ? urls[0] : null;
};

export const getRarityHex = (rarity: Rarity): string => {
    switch (rarity) {
        case 'COMMON': return '#94a3b8';
        case 'UNCOMMON': return '#10b981';
        case 'RARE': return '#3b82f6';
        case 'EPIC': return '#d946ef';
        case 'LEGENDARY': return '#f59e0b';
        default: return '#94a3b8';
    }
};

