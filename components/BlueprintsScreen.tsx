
import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { BLUEPRINTS_DATA } from '../blueprintData';
import RichTooltip from './RichTooltip';
import { findFullItem, getItemRarity, getRarityBorderColor, getRarityGlowStyles, getRarityHoverStyles } from '../utils';

interface BlueprintsScreenProps {
  onBack: () => void;
}

const BLUEPRINT_COLOR = '#135bec';

type CollectionState = 'missing' | 'owned';
type FilterType = 'all' | 'missing' | 'owned';

// â”€â”€â”€ Off-Screen Export Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// This component renders an invisible, fixed-width card used only for html2canvas capture.
// Fixed at 1080px wide so the output is always crisp and consistent, regardless of screen size.
const CARD_BG_PATH = '/images/BG-blueprint-bg.webp';

interface ExportCardProps {
  blueprints: typeof BLUEPRINTS_DATA;
  collection: Record<string, CollectionState>;
  filter: FilterType;
  exportRef: React.RefObject<HTMLDivElement>;
  imageCache: Record<string, string>; // src â†’ data:URL
  bgDataUrl?: string; // data:URL of BG-blueprint-bg for html2canvas
}

const ExportCard: React.FC<ExportCardProps> = ({ blueprints, collection, filter, exportRef, imageCache, bgDataUrl }) => {
  const ownedBlueprints = blueprints.filter(bp => (collection[bp.id] || 'missing') === 'owned');
  const missingBlueprints = blueprints.filter(bp => (collection[bp.id] || 'missing') === 'missing');

  const displayList = filter === 'owned'
    ? ownedBlueprints
    : filter === 'missing'
      ? missingBlueprints
      : blueprints;

  const title = filter === 'owned'
    ? 'BLUEPRINTS I ALREADY HAVE'
    : filter === 'missing'
      ? 'BLUEPRINTS I STILL NEED'
      : 'ALL MY BLUEPRINTS';

  const subtitle = filter === 'owned'
    ? 'These are the blueprints in my collection.'
    : filter === 'missing'
      ? "I don't have these blueprints yet."
      : 'Full blueprint collection overview.';

  const accentColor = filter === 'owned' ? '#10b981' : filter === 'missing' ? '#ef4444' : '#135bec';

  return (
    <div
      ref={exportRef}
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        width: '1080px',
        backgroundColor: '#050914',
        padding: '32px',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* Export Card Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `2px solid ${accentColor}33`,
      }}>
        <div>
          <div style={{ fontSize: '13px', color: '#64748b', letterSpacing: '4px', fontWeight: 900, marginBottom: '4px' }}>
            STASH PLANNER Â· ARC RAIDERS
          </div>
          <div style={{ fontSize: '24px', color: '#ffffff', fontWeight: 900, letterSpacing: '2px' }}>
            {title}
          </div>
          <div style={{ fontSize: '11px', color: accentColor, letterSpacing: '1px', fontWeight: 500, marginTop: '4px', opacity: 0.85 }}>
            {subtitle}
          </div>
        </div>
        <div style={{
          background: `${accentColor}22`,
          border: `1px solid ${accentColor}66`,
          borderRadius: '12px',
          padding: '8px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', color: '#ffffff', fontWeight: 900 }}>{displayList.length}</div>
          <div style={{ fontSize: '10px', color: accentColor, letterSpacing: '3px', fontWeight: 700 }}>
            {filter === 'all' ? 'TOTAL' : filter === 'owned' ? 'OWNED' : 'MISSING'}
          </div>
        </div>
      </div>

      {/* Grid â€” usa flex-wrap com cards de tamanho fixo */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {displayList.map(bp => {
          const isOwned = (collection[bp.id] || 'missing') === 'owned';
          const borderColor = isOwned ? '#10b981' : '#ef4444';
          const bgColor = isOwned ? '#0a2a1a55' : '#0a162855';

          // Card: 90px imagem + 40px barra de nome = 130px total
          const CARD_W = 100;
          const IMG_H = 76;
          const NAME_H = 40;
          const imgSrc = bp.image ? (imageCache[bp.image] || bp.image) : null;

          return (
            <div
              key={bp.id}
              style={{
                width: `${CARD_W}px`,
                height: `${IMG_H + NAME_H}px`,
                borderRadius: '10px',
                backgroundColor: '#0a1628',
                backgroundImage: bgDataUrl ? `url(${bgDataUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: `1.5px solid ${borderColor}`,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isOwned ? `0 0 10px ${borderColor}55` : 'none',
                flexShrink: 0,
              }}
            >
              {/* Dark overlay so item remains readable */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundColor: isOwned ? 'rgba(5,20,10,0.35)' : 'rgba(5,10,20,0.40)',
                pointerEvents: 'none', zIndex: 0
              }} />

              {/* Item image â€” fixed height area */}
              <div style={{
                width: '100%',
                height: `${IMG_H}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}>
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={bp.name}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain', 
                      display: 'block',
                      filter: isOwned ? 'none' : 'grayscale(100%) opacity(0.7)'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '24px', opacity: 0.3 }}>ðŸ“</div>
                )}
              </div>

              {/* Name bar â€” fixed 40px, always fits 2 lines at 6px font */}
              <div style={{
                width: '100%',
                height: `${NAME_H}px`,
                backgroundColor: 'rgba(0,0,0,0.80)',
                borderTop: `1px solid ${borderColor}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 4px',
                boxSizing: 'border-box',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: '6px',
                  fontWeight: 900,
                  color: isOwned ? '#86efac' : '#cbd5e1',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                }}>
                  {bp.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '20px',
        paddingTop: '12px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '10px', color: '#475569', letterSpacing: '2px' }}>
          GENERATED BY STASH PLANNER
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '10px', color: '#475569' }}>
          <span>âœ… {ownedBlueprints.length} OWNED</span>
          <span>ðŸ”´ {missingBlueprints.length} MISSING</span>
          <span>ðŸ“‹ {blueprints.length} TOTAL</span>
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ Preload all blueprint images as data: URLs so html2canvas always renders them â”€â”€â”€
async function preloadImages(blueprints: typeof BLUEPRINTS_DATA): Promise<Record<string, string>> {
  const cache: Record<string, string> = {};
  await Promise.all(
    blueprints
      .filter(bp => !!bp.image)
      .map(bp => new Promise<void>(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            cache[bp.image!] = canvas.toDataURL('image/png');
          } catch { /* taint â€” keep original src */ }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = bp.image!;
      }))
  );
  return cache;
}

// â”€â”€â”€ Main Screen Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BlueprintsScreen: React.FC<BlueprintsScreenProps> = ({ onBack }) => {
  const [collection, setCollection] = useState<Record<string, CollectionState>>({});
  const [filter, setFilter] = useState<FilterType>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  const [cardBgDataUrl, setCardBgDataUrl] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');
  const exportRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('stashplanner_blueprints_collection');
    if (saved) {
      try {
        setCollection(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse collection', e);
      }
    }
  }, []);

  // Preload the BG image once as data:URL so html2canvas can use it
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        setCardBgDataUrl(canvas.toDataURL('image/png'));
      } catch { /* taint fallback */ }
    };
    img.src = CARD_BG_PATH;
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('stashplanner_blueprints_collection', JSON.stringify(collection));
  }, [collection]);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleBlueprint = (id: string) => {
    setCollection(prev => {
      const currentState = prev[id] || 'missing';
      return { ...prev, [id]: currentState === 'missing' ? 'owned' : 'missing' };
    });
  };

  const selectAll = () => {
    const all: Record<string, CollectionState> = {};
    BLUEPRINTS_DATA.forEach(bp => { all[bp.id] = 'owned'; });
    setCollection(all);
  };

  const clearAll = () => {
    setCollection({});
  };

  // â”€â”€ Core: preload images then generate canvas â”€â”€
  const generateCanvas = useCallback(async (): Promise<HTMLCanvasElement | null> => {
    if (!exportRef.current) return null;
    // PrÃ©-carrega todas as imagens como data: URLs antes de capturar
    const cache = await preloadImages(BLUEPRINTS_DATA);
    setImageCache(cache);
    // Aguarda o React re-renderizar o ExportCard com as novas data: URLs
    await new Promise(res => setTimeout(res, 300));
    return html2canvas(exportRef.current, {
      backgroundColor: '#050914',
      scale: 2,
      useCORS: false, // nÃ£o necessÃ¡rio pois as imagens jÃ¡ sÃ£o data: URLs
      logging: false,
      allowTaint: false,
    });
  }, []);

  // â”€â”€ Option 1: Save to device â”€â”€
  const handleDownload = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await new Promise(res => setTimeout(res, 150));
      const canvas = await generateCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `StashPlanner-Blueprints-${filter.toUpperCase()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();
    } catch (e) {
      console.error('Download failed', e);
    } finally {
      setIsExporting(false);
    }
  };


  // -- Option 2: Native Share -> fallback to Clipboard copy --
  const handleShare = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await new Promise(res => setTimeout(res, 150));
      const canvas = await generateCanvas();
      if (!canvas) return;

      const fileName = `StashPlanner-Blueprints-${filter.toUpperCase()}.jpg`;
      const pngBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png', 1.0));
      const jpgBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.92));
      if (!pngBlob || !jpgBlob) return;

      const file = new File([jpgBlob], fileName, { type: 'image/jpeg' });

      // 1. Native share sheet (mobile)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Blueprints - Stash Planner',
          text: 'Check out my Blueprint list in ARC Raiders!',
          files: [file],
        });
        return;
      }

      // 2. Clipboard copy (desktop Chrome/Edge)
      if (navigator.clipboard && (navigator.clipboard as any).write) {
        const item = new ClipboardItem({ 'image/png': pngBlob });
        await (navigator.clipboard as any).write([item]);
        showToast('Image copied! Paste into WhatsApp Web, Discord, etc.');
        return;
      }

      // 3. Fallback: download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = URL.createObjectURL(jpgBlob);
      link.click();
      showToast('Image saved - share it manually.');

    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        console.error('Share failed', e);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const filteredBlueprints = BLUEPRINTS_DATA.filter(bp => {
    const state = collection[bp.id] || 'missing';
    if (filter === 'all') return true;
    return state === filter;
  });

  const ownedCount = BLUEPRINTS_DATA.filter(bp => (collection[bp.id] || 'missing') === 'owned').length;
  const missingCount = BLUEPRINTS_DATA.length - ownedCount;

  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      {/* â”€â”€ Hidden Export Card (off-screen, captured by html2canvas) â”€â”€ */}
      <ExportCard
        blueprints={BLUEPRINTS_DATA}
        collection={collection}
        filter={filter}
        exportRef={exportRef}
        imageCache={imageCache}
        bgDataUrl={cardBgDataUrl}
      />

      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[999] bg-[#0d1b2e] border border-blue-500/40 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-2xl shadow-blue-500/20 backdrop-blur-md animate-fade-in flex items-center gap-3 whitespace-nowrap">
          <span className="material-symbols-outlined text-blue-400">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Background Blueprint Grid */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
      <div
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <main className="flex-1 flex flex-col p-4 md:p-6 pb-32 relative z-10 animate-fade-in w-full mx-auto" style={{ maxWidth: '1400px' }}>

        {/* â”€â”€ Header â”€â”€ */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-blue-500/20 rounded-2xl text-slate-400 hover:text-blue-400 transition-all border border-white/10 shadow-2xl group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </button>
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-glow uppercase italic">
                BLUEPRINTS
              </h2>
              {/* Progress bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="w-96 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(19,91,236,0.6)]"
                    style={{ width: `${BLUEPRINTS_DATA.length > 0 ? (ownedCount / BLUEPRINTS_DATA.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-black text-slate-400 tracking-widest">
                  <span className="text-emerald-400">{ownedCount}</span>
                  <span className="text-slate-600"> / </span>
                  <span className="text-white">{BLUEPRINTS_DATA.length}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Stats chips */}
            <div className="flex gap-2">
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-black text-emerald-400 tracking-widest">{ownedCount} OWNED</span>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-xl flex items-center gap-2">
                <span className="text-xs font-black text-red-400 tracking-widest">{missingCount} MISSING</span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
              <span className="text-[9px] font-black tracking-[0.25em] text-slate-500 uppercase pl-2 pr-1 select-none">SHOW</span>
              <div className="w-px h-4 bg-white/10" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-[0.1em] transition-all ${filter === 'all' ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-slate-400 hover:text-white'}`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilter('missing')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-[0.1em] transition-all ${filter === 'missing' ? 'bg-red-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-slate-400 hover:text-white'}`}
              >
                MISSING
              </button>
              <button
                onClick={() => setFilter('owned')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-[0.1em] transition-all ${filter === 'owned' ? 'bg-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-slate-400 hover:text-white'}`}
              >
                OWNED
              </button>
            </div>

            {/* Export + SELECT ALL / CLEAR ALL â€” same row */}
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400 px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-base text-emerald-400">select_all</span>
                <span className="text-xs font-black tracking-[0.15em] text-emerald-400">SELECT ALL</span>
              </button>
              <button
                onClick={clearAll}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400 px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-base text-red-400">deselect</span>
                <span className="text-xs font-black tracking-[0.15em] text-red-400">CLEAR ALL</span>
              </button>
              <div className="w-px h-6 bg-white/10" />
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(v => !v)}
                  disabled={isExporting}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">
                    {isExporting ? 'hourglass_empty' : 'ios_share'}
                  </span>
                  <span className="text-xs font-black tracking-[0.15em] text-white">
                    {isExporting ? 'GERANDO...' : 'EXPORTAR'}
                  </span>
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    {showExportMenu ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Dropdown menu */}
                {showExportMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d1b2e] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in">
                    <div className="p-1.5 flex flex-col gap-1">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-500/20 transition-all group text-left"
                      >
                        <span className="material-symbols-outlined text-xl text-blue-400 group-hover:scale-110 transition-transform">share</span>
                        <div>
                          <div className="text-xs font-black text-white tracking-wider">COMPARTILHAR</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">WhatsApp, Discord...</div>
                        </div>
                      </button>
                      <div className="h-px bg-white/5 mx-2" />
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-500/20 transition-all group text-left"
                      >
                        <span className="material-symbols-outlined text-xl text-emerald-400 group-hover:scale-110 transition-transform">download</span>
                        <div>
                          <div className="text-xs font-black text-white tracking-wider">SALVAR IMAGEM</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Baixar como .jpg</div>
                        </div>
                      </button>
                    </div>
                    <div className="px-4 py-2 bg-black/30 border-t border-white/5">
                      <p className="text-[9px] text-slate-600 tracking-wider">
                        EXPORTING: {filter === 'all' ? 'ALL' : filter === 'owned' ? 'OWNED' : 'MISSING'} ({filteredBlueprints.length} items)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€ Blueprint Grid â”€â”€ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {filteredBlueprints.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
              <p className="text-xl font-black tracking-[0.2em]">NENHUM BLUEPRINT AQUI</p>
              <p className="text-sm text-slate-600 mt-2 tracking-wider">
                {filter === 'owned' ? 'Clique nos cards abaixo para marcar como obtido.' : 'Tudo marcado como obtido!'}
              </p>
            </div>
          ) : filteredBlueprints.map((bp, index) => {
            const fullItem = findFullItem(bp.name);
            const rarity = getItemRarity(bp.name);
            const isOwned = (collection[bp.id] || 'missing') === 'owned';

            const tooltipItem = fullItem || {
              name: bp.name,
              rarity: rarity,
              icon: 'architecture',
            };

            const rarityBorder = getRarityBorderColor(rarity);

             return (
              <div
                key={bp.id}
                onClick={() => toggleBlueprint(bp.id)}
                className={`group cursor-pointer relative aspect-square rounded-2xl transition-all duration-300 overflow-hidden shadow-lg animate-fade-in
                  ${isOwned
                    ? 'border border-blue-500/80 shadow-[0_0_15px_rgba(19,91,236,0.35)]'
                    : 'border border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                  }
                  ${getRarityHoverStyles(rarity)}
                  ${isOwned
                    ? 'opacity-100'
                    : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                  }`}
                style={{
                  animationDelay: `${Math.min(index * 8, 800)}ms`,
                  backgroundImage: `url(${CARD_BG_PATH})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Background Rarity Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGlowStyles(rarity)} to-transparent opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none z-10`} />

                {/* Blueprint Internal Grid */}
                <div
                  className="absolute inset-0 z-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700"
                  style={{
                    backgroundImage: `linear-gradient(${BLUEPRINT_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_COLOR} 1px, transparent 1px)`,
                    backgroundSize: '15% 15%',
                  }}
                />

                {/* Owned blue overlay tint */}
                {isOwned && (
                  <div className="absolute inset-0 z-0 bg-blue-950/20 pointer-events-none" />
                )}

                {/* Missing red overlay tint (only when filter=missing) */}
                {!isOwned && filter === 'missing' && (
                  <div className="absolute inset-0 z-0 bg-red-950/20 pointer-events-none" />
                )}

                {/* Scanline */}
                <div className="scanline-overlay absolute inset-0 opacity-[0.02] z-20 pointer-events-none" />


                {/* Item Image */}
                <div className="relative z-30 flex-1 flex items-center justify-center p-4 pb-0" style={{ height: 'calc(100% - 36px)' }}>
                  {bp.image ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-40" />
                      <img
                        src={bp.image}
                        alt={bp.name}
                        className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_25px_rgba(19,91,236,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110">
                      <span className="material-symbols-outlined text-5xl" style={{ color: BLUEPRINT_COLOR }}>architecture</span>
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white">No-Data</span>
                    </div>
                  )}
                </div>

                {/* Name bar */}
                <div className={`absolute bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-t border-white/5 py-1.5 px-1 text-center transition-colors duration-500 min-h-[36px] flex items-center justify-center
                  ${isOwned
                    ? 'group-hover:bg-emerald-900/60'
                    : filter === 'missing'
                      ? 'group-hover:bg-red-900/60'
                      : 'group-hover:bg-blue-900/60'
                  }`}
                >
                  <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.05em] text-slate-200 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-[1.1] break-words w-full">
                    {bp.name}
                  </div>
                </div>

                {/* Hover action badge: + to add (green), - to remove (red) */}
                <div className={`absolute top-1.5 right-1.5 z-50 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg
                  ${isOwned
                    ? 'bg-red-500/90 text-white shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                    : 'bg-emerald-500/90 text-white shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px] font-black leading-none">
                    {isOwned ? 'remove' : 'add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[100px] w-full pointer-events-none" />
      </main>
    </div>
  );
};

export default BlueprintsScreen;


