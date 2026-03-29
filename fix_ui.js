import fs from 'fs';

let content = fs.readFileSync('components/PlannerScreen.tsx', 'utf8');

// 1. Manage to EDIT
content = content.replace(/<span className="material-symbols-outlined text-sm text-primary">add<\/span> Edit/g, '<span className="material-symbols-outlined text-sm text-primary">add</span> EDIT');
content = content.replace(/<span className="material-symbols-outlined text-sm">add<\/span> Manage/g, '<span className="material-symbols-outlined text-sm">add</span> EDIT');

// 2. Titles Shields / Quick Use Cache
content = content.replace(
  '>Ballistic Shields</h4>',
  '>SHIELDS</h4>'
);
content = content.replace(
  '>Quick Use Cache</h4>',
  '>QUICK USE</h4>'
);
content = content.replace(
  '>Augments</h4>',
  '>AUGMENTS</h4>'
)

// 3. Increase fonts
// "Select Weapon" text
content = content.replace(/text-\[11px\] font-black tracking-\[0\.3em\] uppercase flex items-center justify-center gap-2/g, 'text-[13px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-2');
// weapon title
content = content.replace(/font-bold text-slate-100 uppercase tracking-wider text-sm/g, 'font-bold text-slate-100 uppercase tracking-wider text-base');
// weapon rarity
content = content.replace(/text-\[9px\] uppercase font-black tracking-widest mt-0\.5 border inline-block px-1\.5/g, 'text-[11px] uppercase font-black tracking-widest mt-0.5 border inline-block px-1.5');
// "Apply Mods"
content = content.replace(/<span className="text-\[9px\] font-black tracking-widest text-slate-500 uppercase">Apply Mods<\/span>/g, '<span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Apply Mods</span>');
// Button text text-[9px]
content = content.replace(/className="text-\[9px\] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1"/g, 'className="text-[11px] font-black text-primary hover:scale-105 transition-transform uppercase tracking-widest flex items-center gap-1"');
// Mod name
content = content.replace(/<span className="text-\[11px\] font-bold text-slate-200 block truncate max-w-\[120px\]">/g, '<span className="text-[13px] font-bold text-slate-200 block truncate max-w-[120px]">');
// Mod rarity
content = content.replace(/<span className={`text-\[8px\] font-black uppercase tracking-widest \$\{getRarityStyles\(mod\.rarity\)\.split/g, '<span className={`text-[10px] font-black uppercase tracking-widest ${getRarityStyles(mod.rarity).split');
// Empty mods text
content = content.replace(/<p className="text-\[10px\] text-slate-600 italic px-1 pt-1">No attachments equipped<\/p>/g, '<p className="text-[12px] text-slate-600 italic px-1 pt-1">No attachments equipped</p>');
// Augment name
content = content.replace(/<span className="text-\[11px\] font-bold text-slate-200 truncate max-w-\[120px\]">\{aug\.name\}<\/span>/g, '<span className="text-[13px] font-bold text-slate-200 truncate max-w-[120px]">{aug.name}</span>');
// Empty augments
content = content.replace(/<p className="text-\[10px\] text-slate-600 italic px-1">No augments equipped<\/p>/g, '<p className="text-[12px] text-slate-600 italic px-1">No augments equipped</p>');
// Shield name
content = content.replace(/<span className="text-\[11px\] font-bold text-slate-200 truncate max-w-\[120px\]">\{item\.name\}<\/span>/g, '<span className="text-[13px] font-bold text-slate-200 truncate max-w-[120px]">{item.name}</span>');
// Empty shields
content = content.replace(/<p className="text-\[10px\] text-slate-600 italic px-1">No shields equipped<\/p>/g, '<p className="text-[12px] text-slate-600 italic px-1">No shields equipped</p>');
// Quick use name
content = content.replace(/<span className="text-\[11px\] font-bold text-slate-200 truncate max-w-\[80px\]">\{item\.name\}<\/span>/g, '<span className="text-[13px] font-bold text-slate-200 truncate max-w-[80px]">{item.name}</span>');
// quantity
content = content.replace(/text-\[11px\] font-black text-primary w-4 text-center/g, 'text-[13px] font-black text-primary w-4 text-center');
// Empty quick use cache
content = content.replace(/<p className="text-\[10px\] text-slate-600 italic px-1">No tactical gear selected<\/p>/g, '<p className="text-[12px] text-slate-600 italic px-1">No tactical gear selected</p>');

fs.writeFileSync('components/PlannerScreen.tsx', content);
console.log('Fixed UI fonts and labels');
