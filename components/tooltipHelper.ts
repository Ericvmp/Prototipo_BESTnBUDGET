import { LOOT_DATA } from '../data';
import { ModRequirement } from '../types';
import { parseMaterialString } from '../utils';

export const generateItemTooltip = (item: any): string => {
   if (!item) return '';

   let tooltip = item.name;

   // 1. Description (Skip for Materials and Augments)
   if (item.description && (item.category || item.weaponType) && item.category !== 'AUGMENT') {
      tooltip += `\n\n${item.description}`;
   }

   // 2. PERKS
   if (item.perks) {
      tooltip += `\n\nPERKS:\n${item.perks}`;
   }

   // 1. USED IN (TOP PRIORITY)
   if (item.requiredFor && item.requiredFor.length > 0) {
      tooltip += `\n\nUSED IN`;
      item.requiredFor.forEach((used: string) => {
         const { name, quantity } = parseMaterialString(used);
         tooltip += `\n- ${name} (${quantity}x)`;
      });
   }

   // 2. SOURCE
   const lootEntry = LOOT_DATA.find(loot => loot.material === item.name);
   const sources = item.obtainedFrom || lootEntry?.sources || [];
   if (sources.length > 0) {
      tooltip += `\n\nSOURCE`;
      sources.forEach((src: any) => {
         const { name, quantity } = typeof src === 'string' ? parseMaterialString(src) : src;
         tooltip += `\n- ${name} (${quantity}x)`;
      });
   }

   // 3. CRAFTING
   let craftingReqs: ModRequirement[] = [];
   if (item.craftInfo?.materials && Array.isArray(item.craftInfo.materials)) {
      craftingReqs = item.craftInfo.materials;
   } else if (item.materials && Array.isArray(item.materials)) {
      craftingReqs = item.materials;
   } else if (item.craftInfo?.requirements && Array.isArray(item.craftInfo.requirements)) {
      craftingReqs = item.craftInfo.requirements;
   }

   if (craftingReqs.length > 0) {
      tooltip += `\n\nCRAFTING`;
      craftingReqs.forEach(req => {
         tooltip += `\n- ${req.quantity}x ${req.name}`;
      });
   }

   // 4. RECYCLING
   if (item.recycleInfo && Array.isArray(item.recycleInfo) && item.recycleInfo.length > 0) {
      tooltip += `\n\nRECYCLING`;
      const rows = 'materials' in item.recycleInfo[0] ? item.recycleInfo[0].materials : item.recycleInfo;
      rows.forEach((req: any) => {
         tooltip += `\n- ${req.quantity}x ${req.name}`;
      });
   }
 
   // 5. SALVAGING
   if (item.salvageInfo && Array.isArray(item.salvageInfo) && item.salvageInfo.length > 0) {
      tooltip += `\n\nSALVAGING`;
      const rows = 'materials' in item.salvageInfo[0] ? item.salvageInfo[0].materials : item.salvageInfo;
      rows.forEach((req: any) => {
         tooltip += `\n- ${req.quantity}x ${req.name}`;
      });
   }

   return tooltip;
};
