import React, { useState, useEffect, useRef } from 'react';
import { Weapon, Modification, Material, Throwable, Augment } from '../types';

interface SearchOverlayProps {
  onClose: () => void;
  onSelectWeapon: (w: Weapon) => void;
  onSelectMod: (m: Modification) => void;
  onSelectMaterial: (mat: Material) => void;
  weapons: Weapon[];
  mods: Modification[];
  materials: Material[];
  throwables: Throwable[];
  augments: Augment[];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  onClose,
  onSelectWeapon,
  onSelectMod,
  onSelectMaterial,
  weapons,
  mods,
  materials,
  throwables,
  augments
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ type: 'weapon' | 'mod' | 'material' | 'throwable' | 'augment', item: any }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered: { type: 'weapon' | 'mod' | 'material' | 'throwable' | 'augment', item: any }[] = [];

    weapons.filter(w => w.name.toLowerCase().includes(q)).forEach(w => filtered.push({ type: 'weapon', item: w }));
    mods.filter(m => m.name.toLowerCase().includes(q)).forEach(m => filtered.push({ type: 'mod', item: m }));
    materials.filter(m => m.name.toLowerCase().includes(q)).forEach(m => filtered.push({ type: 'material', item: m }));
    throwables.filter(t => t.name.toLowerCase().includes(q)).forEach(t => filtered.push({ type: 'throwable', item: t }));
    augments.filter(a => a.name.toLowerCase().includes(q)).forEach(a => filtered.push({ type: 'augment', item: a }));

    setResults(filtered.slice(0, 10)); // Limit to top 10 results
  }, [query, weapons, mods, materials, throwables, augments]);

  const handleSelect = (result: { type: 'weapon' | 'mod' | 'material' | 'throwable' | 'augment', item: any }) => {
    if (result.type === 'weapon') onSelectWeapon(result.item);
    else if (result.type === 'mod') onSelectMod(result.item);
    else if (result.type === 'material') onSelectMaterial(result.item);
    else if (result.type === 'throwable') {
        // Find material if it exists or just close
        onClose();
    }
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-card-dark border border-primary/30 rounded-2xl shadow-[0_0_50px_rgba(30,167,253,0.2)] overflow-hidden animate-fade-in-up">
        {/* Search Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-900/50">
          <span className="material-symbols-outlined text-primary text-3xl">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search weapons, mods, materials..."
            className="w-full bg-transparent border-none outline-none text-xl font-medium text-white placeholder:text-slate-600 uppercase tracking-wider"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-mono">ESC</button>
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
          {query.trim().length >= 2 && results.length === 0 ? (
            <div className="p-12 text-center text-slate-500 uppercase tracking-widest text-sm">
              No results found for "{query}"
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, idx) => (
                <div
                  key={`${result.type}-${result.item.id}`}
                  onClick={() => handleSelect(result)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 cursor-pointer transition-all group border border-transparent hover:border-primary/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-black/50 border border-slate-800 flex items-center justify-center p-2 shrink-0 group-hover:scale-110 transition-transform">
                    {result.item.imageUrl ? (
                      <img src={result.item.imageUrl} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">{result.item.icon || 'category'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-md font-bold text-slate-200 group-hover:text-white uppercase tracking-wider">{result.item.name}</h4>
                    <span className={`text-[9px] font-bold tracking-[0.2em] uppercase px-1.5 py-0.5 rounded border border-slate-800/50 mt-1 inline-block ${
                      result.type === 'weapon' ? 'text-green-400' :
                      result.type === 'mod' ? 'text-blue-400' :
                      result.type === 'material' ? 'text-red-400' :
                      'text-orange-400'
                    }`}>
                      {result.type}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              ))}
            </div>
          ) : query.trim().length < 2 && (
             <div className="p-12 text-center text-slate-600 uppercase tracking-widest text-xs flex flex-col gap-4">
                <span className="material-symbols-outlined text-5xl opacity-10">command</span>
                <p>Start typing to search the tactical archives...</p>
             </div>
          )}
        </div>

        {/* Scanline */}
        <div className="scanline-overlay absolute inset-0 opacity-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SearchOverlay;
