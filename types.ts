
export type Tier = 1 | 2 | 3 | 4 | 'LEGENDARY';

export type ModCategory = 'ALL' | 'MUZZLE' | 'MAGAZINE' | 'UNDERBARREL' | 'STOCK' | 'OPTICS';

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
  imageUrl?: string;
  description?: string;
  stat?: string;
  tier: Tier;
  materials: ModRequirement[];
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
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
  imageUrl?: string;
  craftInfo?: {
    materials: ModRequirement[];
    station?: string;
  };
  repairInfo?: WeaponTierInfo[];
  upgradeInfo?: WeaponTierInfo[];
  recycleInfo?: WeaponTierInfo[];
  salvageInfo?: WeaponTierInfo[];
  stackSize?: number;
}

export interface Throwable {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  icon: string;
  imageUrl?: string;
  category?: 'THROWABLES' | 'DEFENSIVE' | 'SHIELDS' | 'QUICK USE';
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
  imageUrl?: string;
  description?: string;
  category?: 'AUGMENT';
  craftInfo: {
    materials: ModRequirement[];
    quantityProduced: number;
    station: string;
  };
  recycleInfo?: ModRequirement[];
  salvageInfo?: ModRequirement[];
  stackSize?: number;
}

export interface Material {
  id: string;
  name: string;
  description?: string;
  rarity: Rarity;
  icon: string;
  imageUrl?: string;
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
}

export interface LootSource {
  name: string;
  quantity: number;
  imageUrl?: string;
}

export interface LootCategory {
  id: string;
  material: string;
  materialImageUrl?: string;
  wikiUrl: string;
  note?: string;
  craftingStation?: string;
  sources: LootSource[];
}

export type Screen = 'home' | 'weapons' | 'mods' | 'materials' | 'throwables' | 'planner';

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
