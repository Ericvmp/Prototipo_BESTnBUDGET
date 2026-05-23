
export type Tier = 1 | 2 | 3 | 4 | 'LEGENDARY';

export type AmmoType = 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'SHOTGUN' | 'ENERGY' | 'EXPLOSIVE';

export type WeaponType = 'AR' | 'SMG' | 'SHOTGUN' | 'SNIPER' | 'LMG' | 'PISTOL' | 'LAUNCHER';

export type ModCategory = 'ALL' | 'MUZZLE' | 'MAGAZINE' | 'UNDERBARREL' | 'STOCK' | 'OPTICS' | 'TECH';

export type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface ModRequirement {
  name: string;
  quantity: number;
  stackSize?: number;
}

export interface Modification {
  id: string;
  name: string;
  category: ModCategory;
  rarity: Rarity;
  icon: string;

  description?: string;
  stat?: string;
  tier: Tier;
  materials: ModRequirement[];
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
  ammoCompatibility?: AmmoType; // Tied to Magazine types
  weaponTypeCompatibility?: WeaponType[]; // Tied to specialized mods
}

export interface WeaponTierInfo {
  tier: string;
  materials: ModRequirement[];
  perks?: string;
  durability?: string;
}

export interface Weapon {
  id: string;
  name: string;
  rarity: Rarity;
  icon: string;

  craftInfo?: {
    materials: ModRequirement[];
    station?: string;
  };
  repairInfo?: WeaponTierInfo[];
  upgradeInfo?: WeaponTierInfo[];
  recycleInfo?: WeaponTierInfo[];
  salvageInfo?: WeaponTierInfo[];
  stackSize?: number;
  ammoType?: AmmoType;
  weaponType?: WeaponType;
}

export interface Throwable {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  icon: string;

  category?: 'GRENADES' | 'HEALING' | 'SHIELDS' | 'UTILITY';
  perks?: string;
  craftInfo: {
    materials: ModRequirement[];
    quantityProduced: number;
    station: string;
  };
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
}

export interface Augment {
  id: string;
  name: string;
  rarity: Rarity;
  icon: string;

  description?: string;
  category?: 'AUGMENT';
  perks?: string;
  craftInfo: {
    materials: ModRequirement[];
    quantityProduced: number;
    station: string;
  };
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
  maxWeight?: string;
  backpackSlots?: number;
  quickUseSlots?: number;
  safePocketSlots?: number;
  shieldCompat?: string;
}

export interface Material {
  id: string;
  name: string;
  description?: string;
  rarity: Rarity;
  icon: string;

  craftInfo?: {
    isCraftable: boolean;
    location?: string;
    requirements?: ModRequirement[];
    note?: string;
  };
  residualInfo?: {
    items: string[];
  };
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
  obtainedFrom?: string[];
  requiredFor?: string[];
  purchasableFromCeleste?: boolean;
  celesteSeedCost?: number;
}

export interface LootSource {
  name: string;
  quantity: number;

}

export interface LootCategory {
  id: string;
  material: string;

  wikiUrl: string;
  note?: string;
  craftingStation?: string;
  purchasableFromCeleste?: boolean;
  sources: LootSource[];
}

export type Screen = 'home' | 'weapons' | 'mods' | 'materials' | 'equipment' | 'planner' | 'blueprints' | 'trade';

export type WeaponMaintenanceAction = 
  | 'NONE'
  | 'REPAIR_I' | 'REPAIR_II' | 'REPAIR_III' | 'REPAIR_IV'
  | 'UPGRADE_I_TO_II' | 'UPGRADE_II_TO_III' | 'UPGRADE_III_TO_IV';

export interface PlannerWeaponSlot {
  weaponId: string | null;
  attachedModIds: string[];
  maintenanceAction: WeaponMaintenanceAction;
}

export interface PlannerLoadout {
  id: string;
  name: string;
  isActive: boolean;
  primary: PlannerWeaponSlot;
  secondary: PlannerWeaponSlot;
  augments: string[];
  shields: string[];
  quickUse: PlannerConsumableSlot[];
  multiplier: number;
}

export interface MultiLoadoutState {
  loadouts: PlannerLoadout[];
  multiplier: number;
}

export interface PlannerConsumableSlot {
  itemId: string;
  quantity: number;
}

export interface SetupDetail {
  focus: string;
  description: string;
  modIds: string[];
}

export interface WeaponSetup {
  weaponId: string;
  setups: {
    BEST: SetupDetail;
  };
}
