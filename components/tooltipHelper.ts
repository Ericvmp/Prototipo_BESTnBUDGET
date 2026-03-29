import { LOOT_DATA } from '../data';
import { ModRequirement } from '../types';

export const generateItemTooltip = (item: any): string => {
   if (!item) return '';

   let tooltip = item.name;

   // 1. Description
   if (item.description) {
      tooltip += `\n\n${item.description}`;
   } else if (item.perks) {
      // Small fallback for cases where perks exist instead of description
      tooltip += `\n\n${item.perks}`;
   }

   // 2. CRAFTING
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

   // 3. RECYCLING
   if (item.recycleInfo && Array.isArray(item.recycleInfo) && item.recycleInfo.length > 0) {
      tooltip += `\n\nRECYCLING`;
      item.recycleInfo.forEach((req: ModRequirement) => {
         tooltip += `\n- ${req.quantity}x ${req.name}`;
      });
   }

   // 4. SALVAGING
   if (item.salvageInfo && Array.isArray(item.salvageInfo) && item.salvageInfo.length > 0) {
      tooltip += `\n\nSALVAGING`;
      item.salvageInfo.forEach((req: ModRequirement) => {
         tooltip += `\n- ${req.quantity}x ${req.name}`;
      });
   }

   // 5. LOOTING
   const lootEntry = LOOT_DATA.find(loot => loot.material === item.name);
   if (lootEntry && lootEntry.sources && lootEntry.sources.length > 0) {
      tooltip += `\n\nLOOTING`;
      lootEntry.sources.forEach(src => {
         tooltip += `\n- ${src.name} (${src.quantity}x)`;
      });
   }

   return tooltip;
};
