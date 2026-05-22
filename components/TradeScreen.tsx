import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import html2canvas from 'html2canvas';
import { TradeItem, getAllGameItems, loadAllGameItems, getTradeItemImage, getRarityBorderColor, getRarityHex, getRarityHoverStyles, getRarityGlowStyles, getSourceImageUrls } from '../utils';
import SmartItemIcon from './SmartItemIcon';
import { useLanguage } from './LanguageContext';

interface TradeScreenProps {
  onBack: () => void;
}

interface TradeEntry {
  item: TradeItem;
  quantity: number;
}

const TRADE_COLOR = '#8b5cf6'; // Roxo/Violeta para Trade
const BG_PATH = '/images/background-home.webp';

const TradeExportCard: React.FC<{
  giveList: TradeEntry[];
  receiveList: TradeEntry[];
  exportRef: React.RefObject<HTMLDivElement>;
  imageCache: Record<string, string>;
  intent: 'WTB' | 'WTS';
}> = ({ giveList, receiveList, exportRef, imageCache, intent }) => {
  const { t } = useLanguage();
  const lookForBlock = (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '32px', color: '#f59e0b', fontWeight: 900, marginBottom: '24px', textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase' }}>
        {t('trade.export.looking_for')}
      </div>
      <div style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '40px', border: '3px solid #f59e0b44', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
        {receiveList.map((entry) => {
          const count = receiveList.length;
          let size = { w: 160, h: 210, imgH: 150, fontSize: '11px', qSize: '21px' };
          if (count <= 2) size = { w: 380, h: 480, imgH: 360, fontSize: '26px', qSize: '42px' };
          else if (count <= 4) size = { w: 240, h: 320, imgH: 240, fontSize: '18px', qSize: '30px' };
          
          return <ExportItemCard key={entry.item.id} entry={entry} imageCache={imageCache} size={size} />;
        })}
        {receiveList.length === 0 && <div style={{ color: '#64748b', fontSize: '24px', padding: '40px' }}>{t('trade.empty_list')}</div>}
      </div>
    </div>
  );

  const offeringBlock = (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '32px', color: '#10b981', fontWeight: 900, marginBottom: '24px', textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase' }}>
        {t('trade.export.offering')}
      </div>
      <div style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '40px', border: '3px solid #10b98144', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
        {giveList.map((entry) => {
          const count = giveList.length;
          let size = { w: 160, h: 210, imgH: 150, fontSize: '11px', qSize: '21px' };
          if (count <= 2) size = { w: 380, h: 480, imgH: 360, fontSize: '26px', qSize: '42px' };
          else if (count <= 4) size = { w: 240, h: 320, imgH: 240, fontSize: '18px', qSize: '30px' };

          return <ExportItemCard key={entry.item.id} entry={entry} imageCache={imageCache} size={size} />;
        })}
        {giveList.length === 0 && <div style={{ color: '#64748b', fontSize: '24px', padding: '40px' }}>{t('trade.empty_list')}</div>}
      </div>
    </div>
  );

  return (
    <div
      ref={exportRef}
      style={{
        position: 'fixed', left: '-9999px', top: 0,
        width: '1080px', minHeight: '1350px', backgroundColor: '#050914',
        padding: '40px', fontFamily: "'Barlow', sans-serif", boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: `2px solid ${TRADE_COLOR}33`, paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '8px' }}>
            <img src="/images/logo.jpg" alt="Logo" style={{ width: '64px', height: '64px', borderRadius: '12px' }} />
            <div style={{ fontSize: '26px', color: '#64748b', letterSpacing: '8px', fontWeight: 900 }}>
              SCRAPPY HUB
            </div>
          </div>
          <div style={{ fontSize: '48px', color: '#ffffff', fontWeight: 900, letterSpacing: '4px' }}>
            {t('trade.title')}
          </div>
          <div style={{ fontSize: '22px', color: TRADE_COLOR, letterSpacing: '2px', fontWeight: 500, marginTop: '8px', opacity: 0.85 }}>
            {intent === 'WTB' ? `${t('trade.intent.wtb')} (WTB)` : `${t('trade.intent.wts')} (WTS)`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {receiveList.length > 0 && lookForBlock}
        {giveList.length > 0 && offeringBlock}
      </div>


      <div style={{ 
        marginTop: '60px', 
        textAlign: 'center', 
        color: '#475569', 
        fontSize: '32px', 
        letterSpacing: '8px', 
        fontWeight: 900, 
        opacity: 0.5,
        borderTop: `2px solid ${TRADE_COLOR}11`,
        paddingTop: '40px'
      }}>
        {t('blueprints.export.generated_by')}
      </div>
    </div>
  );
};

const ExportItemCard: React.FC<{ 
  entry: TradeEntry, 
  imageCache: Record<string, string>,
  size?: { w: number, h: number, imgH: number, fontSize: string, qSize: string }
}> = ({ entry, imageCache, size = { w: 120, h: 160, imgH: 110, fontSize: '9.5px', qSize: '12px' } }) => {
  const { translateItemName } = useLanguage();
  const finalSrc = imageCache[entry.item.id] || null;
  const rarityHex = getRarityHex(entry.item.rarity);
  
  return (
    <div style={{
      width: `${size.w}px`, height: `${size.h}px`, backgroundColor: '#1e293b', borderRadius: `${size.w/10}px`,
      border: `${size.w/60}px solid ${rarityHex}66`, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative'
    }}>
      <div style={{ 
        position: 'absolute', top: '10px', right: '12px', color: '#fff', 
        fontSize: size.qSize, fontWeight: '900', zIndex: 10,
        textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.5)',
        lineHeight: 1
      }}>
        x{entry.quantity}
      </div>
      <div style={{ height: `${size.imgH}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `${size.w/15}px`, position: 'relative' }}>
        {finalSrc ? (
          <img src={finalSrc} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={translateItemName(entry.item.name)} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: `${size.w/2}px`, color: '#64748b' }}>
              {entry.item.category === 'Weapon' ? 'swords' : 
               entry.item.category === 'Blueprint' ? 'architecture' : 
               entry.item.category === 'Mod' ? 'settings_input_component' : 
               entry.item.category === 'Throwable' ? 'bomb' :
               entry.item.category === 'Augment' ? 'bolt' : 'deployed_code'}
            </span>
          </div>
        )}
      </div>
      <div style={{ flex: 1, backgroundColor: '#000000aa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px 12px' }}>
        <div style={{ 
          fontSize: size.fontSize, color: '#e2e8f0', fontWeight: 900, textAlign: 'center', 
          whiteSpace: 'normal', width: '100%', lineHeight: 1.1, transform: 'translateY(-1px)',
          textTransform: 'uppercase'
        }}>
          {translateItemName(entry.item.name)}
        </div>
      </div>
    </div>
  );
};

async function preloadImagesForTrade(items: TradeItem[]): Promise<Record<string, string>> {
  const cache: Record<string, string> = {};
  await Promise.all(items.map(async (item) => {
    const urls: string[] = [];
    const localUrls = getSourceImageUrls(item.name);
    localUrls.forEach(u => { if (!urls.includes(u)) urls.push(u); });
    if (item.image && !urls.includes(item.image)) urls.push(item.image);
    
    if (urls.length === 0) return;
    
    for (const src of urls) {
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const img = new Image();
          if (src.startsWith('http')) {
            img.crossOrigin = 'anonymous';
          }
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d')!;
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/png'));
            } catch (err) { reject(err); }
          };
          img.onerror = () => reject(new Error('Load error'));
          img.src = src;
          // Timeout to avoid hanging
          setTimeout(() => reject(new Error('Timeout')), 5000);
        });
        cache[item.id] = dataUrl;
        break; 
      } catch (e) {
        console.warn(`Failed to preload image for ${item.name} from ${src}`, e);
      }
    }
  }));
  return cache;
}

const TradeScreen: React.FC<TradeScreenProps> = ({ onBack }) => {
  const { t, translateItemName, language } = useLanguage();
  const [giveItems, setGiveItems] = useState<TradeEntry[]>([]);
  const [receiveItems, setReceiveItems] = useState<TradeEntry[]>([]);
  const [tradeIntent, setTradeIntent] = useState<'WTB' | 'WTS'>('WTB');
  
  const [isExporting, setIsExporting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'give' | 'receive' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [allItemsList, setAllItemsList] = useState<TradeItem[]>([]);
  const [tempSelection, setTempSelection] = useState<TradeItem[]>([]);
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc' | 'rarity'>('alpha-asc');

  const RARITY_WEIGHTS: Record<string, number> = useMemo(() => ({
    'LEGENDARY': 5,
    'EPIC': 4,
    'RARE': 3,
    'UNCOMMON': 2,
    'COMMON': 1
  }), []);

  const CATEGORIES = useMemo(() => [
    { id: 'All', icon: 'apps', label: t('blueprints.all') },
    { id: 'Weapon', icon: 'swords', label: t('home.weapons') },
    { id: 'Material', icon: 'deployed_code', label: t('home.materials') },
    { id: 'Blueprint', icon: 'architecture', label: t('home.blueprints') },
    { id: 'Mod', icon: 'settings_input_component', label: t('home.mods') },
    { id: 'Throwable', icon: 'bomb', label: t('nav.equipments') },
    { id: 'Augment', icon: 'bolt', label: t('category.augments') },
  ], [t]);

  const exportRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Load all 560 items from the ARCTracker database
  useEffect(() => {
    loadAllGameItems().then(items => {
      setAllItemsList(items);
      setIsLoadingItems(false);
    });
  }, []);

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

  const openPicker = (target: 'give' | 'receive') => {
    setPickerTarget(target);
    setPickerOpen(true);
    setSearchQuery('');
    setTempSelection([]);
  };

  const handleSelectItem = (item: TradeItem) => {
    setTempSelection(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleConfirmSelection = () => {
    if (!pickerTarget) {
      setPickerOpen(false);
      return;
    }
    const targetSet = pickerTarget === 'give' ? setGiveItems : setReceiveItems;
    targetSet(prev => {
      const newItems = [...prev];
      for (const item of tempSelection) {
        if (!newItems.find(e => e.item.id === item.id)) {
          newItems.push({ item, quantity: 1 });
        }
      }
      return newItems;
    });
    setPickerOpen(false);
  };

  const updateQuantity = (list: 'give' | 'receive', id: string, delta: number) => {
    const targetSet = list === 'give' ? setGiveItems : setReceiveItems;
    targetSet(prev => {
      return prev.map(e => {
        if (e.item.id === id) {
          const newQ = Math.max(0, e.quantity + delta);
          return { ...e, quantity: newQ };
        }
        return e;
      }).filter(e => e.quantity > 0);
    });
  };

  const filteredItems = useMemo(() => {
    const cleanNameForSorting = (name: string): string => {
      return name.replace(/^[\p{P}\p{S}\s]+/gu, '').trim();
    };

    let result = allItemsList;
    if (activeCategory !== 'All') {
      result = result.filter(i => i.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(i => {
        const engName = i.name.toLowerCase();
        const localName = translateItemName(i.name).toLowerCase();
        const q = searchQuery.toLowerCase();
        return engName.includes(q) || localName.includes(q);
      });
    }

    const sorted = [...result];
    if (sortBy === 'alpha-asc') {
      sorted.sort((a, b) => {
        const nameA = cleanNameForSorting(translateItemName(a.name));
        const nameB = cleanNameForSorting(translateItemName(b.name));
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === 'alpha-desc') {
      sorted.sort((a, b) => {
        const nameA = cleanNameForSorting(translateItemName(a.name));
        const nameB = cleanNameForSorting(translateItemName(b.name));
        return nameB.localeCompare(nameA);
      });
    } else if (sortBy === 'rarity') {
      sorted.sort((a, b) => {
        const wA = RARITY_WEIGHTS[a.rarity] || 0;
        const wB = RARITY_WEIGHTS[b.rarity] || 0;
        if (wB !== wA) {
          return wB - wA; // Legendary first
        }
        const nameA = cleanNameForSorting(translateItemName(a.name));
        const nameB = cleanNameForSorting(translateItemName(b.name));
        return nameA.localeCompare(nameB);
      });
    }
    return sorted;
  }, [allItemsList, searchQuery, activeCategory, sortBy, translateItemName, RARITY_WEIGHTS]);

  const generateCanvas = useCallback(async () => {
    if (!exportRef.current) return null;
    const allTradeItems = [...giveItems.map(e => e.item), ...receiveItems.map(e => e.item)];
    const cache = await preloadImagesForTrade(allTradeItems);
    setImageCache(cache);
    await new Promise(res => setTimeout(res, 300));
    return html2canvas(exportRef.current, {
      backgroundColor: '#050914',
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    });
  }, [giveItems, receiveItems]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleDownload = async () => {
    setIsExporting(true); setShowExportMenu(false);
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `StashPlanner-TradeOffer.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();
    } catch (e) { console.error(e); } finally { setIsExporting(false); }
  };

  const handleShare = async () => {
    setIsExporting(true); setShowExportMenu(false);
    try {
      await new Promise(res => setTimeout(res, 150));
      const canvas = await generateCanvas();
      if (!canvas) return;

      const fileName = `StashPlanner-TradeOffer.jpg`;
      const pngBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png', 1.0));
      const jpgBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.92));
      if (!pngBlob || !jpgBlob) return;

      const file = new File([jpgBlob], fileName, { type: 'image/jpeg' });

      // 1. Native share sheet (mobile)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t('trade.title'),
          text: t('trade.build_offer'),
          files: [file],
        });
        return;
      }

      // 2. Clipboard copy (desktop Chrome/Edge)
      if (navigator.clipboard && (navigator.clipboard as any).write) {
        const item = new ClipboardItem({ 'image/png': pngBlob });
        await (navigator.clipboard as any).write([item]);
        showToast(t('blueprints.toast.copied'));
        return;
      }

      // 3. Fallback: download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = URL.createObjectURL(jpgBlob);
      link.click();
      showToast(t('blueprints.toast.saved'));

    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        console.error('Share failed', e);
      }
    } finally { setIsExporting(false); }
  };

const renderTradeList = (list: TradeEntry[], type: 'give' | 'receive') => (
  <div className={`flex-1 rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm border-2 ${type === 'give' ? 'border-red-500/20 bg-red-950/20' : 'border-emerald-500/20 bg-emerald-950/20'}`}>
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type === 'give' ? 'from-red-500 to-transparent' : 'from-emerald-500 to-transparent'}`} />
    
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className={`text-2xl font-black tracking-widest uppercase ${type === 'give' ? 'text-red-400' : 'text-emerald-400'}`}>
          {type === 'give' ? t('trade.give') : t('trade.receive')}
        </h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {list.length === 1 ? `1 ${t('trade.item_listed')}` : `${list.length} ${t('trade.items_listed')}`}
        </p>
      </div>
      <button
        onClick={() => openPicker(type)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${type === 'give' ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-400 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 text-emerald-400'}`}
      >
        <span className="material-symbols-outlined text-sm">add</span>
        <span className="text-xs font-black tracking-widest">{t('trade.btn_add')}</span>
      </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {list.map((entry) => {
        return (
          <div key={entry.item.id} className={`group relative bg-slate-900/80 rounded-2xl p-3 flex flex-col items-center border border-white/5 hover:border-white/20 transition-all ${getRarityHoverStyles(entry.item.rarity)}`}>
            <div className="w-16 h-16 mb-2 relative">
              {entry.item.image ? (
                <img src={entry.item.image} alt={translateItemName(entry.item.name)} className="w-full h-full object-contain" />
              ) : (
                <SmartItemIcon itemName={entry.item.name} rarity={entry.item.rarity} imageClassName="w-full h-full object-contain" iconClassName="text-3xl text-slate-600" />
              )}
            </div>
            <div className="text-[10px] font-black text-center text-slate-200 uppercase line-clamp-1 break-words w-full px-1">
              {translateItemName(entry.item.name)}
            </div>
            <div className={`mt-3 flex items-center justify-between w-full bg-black/40 rounded-lg p-1 border ${type === 'give' ? 'border-red-500/20' : 'border-emerald-500/20'}`}>
              <button onClick={() => updateQuantity(type, entry.item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded text-slate-300">-</button>
              <span className="text-sm font-black text-white w-8 text-center">{entry.quantity}</span>
              <button onClick={() => updateQuantity(type, entry.item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/20 rounded text-slate-300">+</button>
            </div>
            <button onClick={() => updateQuantity(type, entry.item.id, -999)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-75 hover:scale-100">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        );
      })}
    </div>
    {list.length === 0 && (
      <div className="flex flex-col items-center justify-center py-16 opacity-30">
        <span className="material-symbols-outlined text-5xl mb-2">inventory_2</span>
        <span className="text-sm font-bold tracking-widest uppercase">{t('trade.empty_list')}</span>
      </div>
    )}
  </div>
);

  return (
    <div className="flex-1 flex flex-col relative min-h-screen">
      <TradeExportCard giveList={giveItems} receiveList={receiveItems} exportRef={exportRef} imageCache={imageCache} intent={tradeIntent} />
      
      {toastMsg && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[999] bg-[#0d1b2e] border border-blue-500/40 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-400">check_circle</span>{toastMsg}
        </div>
      )}

      <main className="flex-1 flex flex-col p-4 md:p-6 pb-32 relative z-10 animate-fade-in w-full mx-auto" style={{ maxWidth: '1400px' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-purple-500/20 rounded-2xl text-slate-400 hover:text-purple-400 transition-all border border-white/10 shadow-2xl">
              <span className="material-symbols-outlined text-3xl">arrow_back</span>
            </button>
            <div>
              <div className="flex bg-white/5 rounded-xl p-1 mb-2 w-fit border border-white/10 shadow-inner">
                <button onClick={() => setTradeIntent('WTB')} className={`px-4 py-1.5 rounded-lg font-black tracking-widest text-xs transition-all ${tradeIntent === 'WTB' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'}`}>{t('trade.intent.wtb')}</button>
                <button onClick={() => setTradeIntent('WTS')} className={`px-4 py-1.5 rounded-lg font-black tracking-widest text-xs transition-all ${tradeIntent === 'WTS' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-slate-400 hover:text-white'}`}>{t('trade.intent.wts')}</button>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white drop-shadow-glow uppercase italic" style={{ textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
                {t('trade.title')}
              </h2>
              <div className="text-xs font-black text-purple-400 tracking-widest mt-1">{t('trade.build_offer')}</div>
            </div>
          </div>
          
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(v => !v)}
              disabled={isExporting || (giveItems.length === 0 && receiveItems.length === 0)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">
                {isExporting ? 'hourglass_empty' : 'ios_share'}
              </span>
              <span className="text-xs font-black tracking-[0.15em] text-white">
                {isExporting ? t('blueprints.generating') : t('blueprints.btn_export')}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">
                {showExportMenu ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d1b2e] border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in">
                <div className="p-1.5 flex flex-col gap-1">
                  <button onClick={handleShare} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-500/20 transition-all group text-left">
                    <span className="material-symbols-outlined text-xl text-blue-400 group-hover:scale-110 transition-transform">share</span>
                    <div>
                      <div className="text-xs font-black text-white tracking-wider">{t('blueprints.btn_share')}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{t('blueprints.share_desc')}</div>
                    </div>
                  </button>
                  <div className="h-px bg-white/5 mx-2" />
                  <button onClick={handleDownload} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-500/20 transition-all group text-left">
                    <span className="material-symbols-outlined text-xl text-emerald-400 group-hover:scale-110 transition-transform">download</span>
                    <div>
                      <div className="text-xs font-black text-white tracking-wider">{t('blueprints.btn_download')}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{t('blueprints.download_desc')}</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {tradeIntent === 'WTB' ? (
            <>
              {renderTradeList(receiveItems, 'receive')}
              <button
                onClick={() => setTradeIntent(prev => prev === 'WTB' ? 'WTS' : 'WTB')}
                title="Invert cards / Inverter cards"
                className="hidden lg:flex flex-col items-center justify-center gap-1 group cursor-pointer opacity-40 hover:opacity-100 transition-all duration-300 px-2"
              >
                <span className="material-symbols-outlined text-6xl text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110" style={{ transition: 'transform 0.4s ease, color 0.3s ease, filter 0.3s ease', filter: 'drop-shadow(0 0 0px #a78bfa)' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 12px #a78bfa)')} onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 0px #a78bfa)')}>sync_alt</span>
              </button>
              {renderTradeList(giveItems, 'give')}
            </>
          ) : (
            <>
              {renderTradeList(giveItems, 'give')}
              <button
                onClick={() => setTradeIntent(prev => prev === 'WTB' ? 'WTS' : 'WTB')}
                title="Invert cards / Inverter cards"
                className="hidden lg:flex flex-col items-center justify-center gap-1 group cursor-pointer opacity-40 hover:opacity-100 transition-all duration-300 px-2"
              >
                <span className="material-symbols-outlined text-6xl text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110" style={{ transition: 'transform 0.4s ease, color 0.3s ease, filter 0.3s ease', filter: 'drop-shadow(0 0 0px #a78bfa)' }} onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 12px #a78bfa)')} onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 0px #a78bfa)')}>sync_alt</span>
              </button>
              {renderTradeList(receiveItems, 'receive')}
            </>
          )}
        </div>
      </main>

      {pickerOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1325] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up">
            <div className={`p-6 border-b ${pickerTarget === 'give' ? 'border-red-500/30 bg-red-900/10' : 'border-emerald-500/30 bg-emerald-900/10'} flex items-center justify-between`}>
              <h3 className={`text-2xl font-black tracking-widest uppercase ${pickerTarget === 'give' ? 'text-red-400' : 'text-emerald-400'}`}>
                {pickerTarget === 'give' ? t('trade.modal_title_give') : t('trade.modal_title_receive')}
              </h3>
              <div className="flex gap-3">
                {tempSelection.length > 0 && (
                  <button onClick={handleConfirmSelection} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black tracking-widest rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>{t('trade.confirm').toUpperCase()} ({tempSelection.length})</span>
                  </button>
                )}
                <button onClick={() => setPickerOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/20 rounded-xl text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
            <div className="p-4 border-b border-white/5 bg-black/20 flex flex-col gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  placeholder={`${t('trade.search_placeholder_prefix')} ${allItemsList.length} ${t('trade.search_placeholder_suffix')}`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-bold"
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${
                        activeCategory === cat.id
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                      <span>{cat.label ? cat.label.charAt(0).toUpperCase() + cat.label.slice(1).toLowerCase() : ''}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t lg:border-t-0 border-white/5 pt-2 lg:pt-0 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap shrink-0">
                    {language === 'pt-BR' ? 'Ordenar por:' : 'Sort by:'}
                  </span>
                  <div className="flex flex-nowrap bg-white/5 rounded-lg p-0.5 border border-white/5 shrink-0">
                    <button
                      onClick={() => setSortBy('alpha-asc')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all whitespace-nowrap shrink-0 ${sortBy === 'alpha-asc' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      A-Z
                    </button>
                    <button
                      onClick={() => setSortBy('alpha-desc')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all whitespace-nowrap shrink-0 ${sortBy === 'alpha-desc' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      Z-A
                    </button>
                    <button
                      onClick={() => setSortBy('rarity')}
                      className={`px-3.5 py-1 rounded text-xs font-bold transition-all whitespace-nowrap shrink-0 ${sortBy === 'rarity' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      {language === 'pt-BR' ? 'Raridade' : 'Rarity'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {isLoadingItems && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
                  <span className="material-symbols-outlined text-5xl animate-spin mb-3">progress_activity</span>
                  <span className="text-sm font-bold tracking-widest">{t('trade.loading_assets').toUpperCase()}</span>
                </div>
              )}
              {filteredItems.map(item => {
                const isBlueprint = item.category === 'Blueprint';
                const rarityColor = getRarityHex(item.rarity);
                const isSelected = tempSelection.some(i => i.id === item.id);
                return (
                  <button 
                    key={item.id} 
                    onClick={() => handleSelectItem(item)} 
                    className="bg-slate-800/50 rounded-xl p-2 flex flex-col items-center transition-all duration-200 group relative"
                    style={{ 
                      ...(isBlueprint ? {
                        backgroundImage: "linear-gradient(rgba(10, 22, 40, 0.6), rgba(10, 22, 40, 0.6)), url('/images/BG-blueprint-bg.webp')", 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                      } : {}),
                      border: `3px solid ${rarityColor}60`,
                      boxShadow: `0 0 10px ${rarityColor}20, inset 0 0 10px ${rarityColor}10`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = `4px solid ${rarityColor}`;
                      e.currentTarget.style.boxShadow = `0 0 25px ${rarityColor}60, inset 0 0 20px ${rarityColor}30`;
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)';
                      e.currentTarget.style.zIndex = '10';
                      e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = `3px solid ${rarityColor}60`;
                      e.currentTarget.style.boxShadow = `0 0 10px ${rarityColor}20, inset 0 0 10px ${rarityColor}10`;
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.zIndex = '1';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    {/* Inner glow specifically behind the image on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${rarityColor}30 0%, transparent 70%)` }} />
                    
                    {/* Selected state overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-purple-500/10 border-2 border-purple-400 rounded-xl z-20 pointer-events-none">
                        <span className="material-symbols-outlined text-[20px] text-white absolute top-1.5 right-1.5 drop-shadow-[0_0_5px_rgba(0,0,0,1)] bg-purple-600 rounded-full">check_circle</span>
                      </div>
                    )}
                    
                    <div className="w-12 h-12 mb-2 relative z-10">
                      {item.image ? (
                        <img loading="lazy" src={item.image} alt={translateItemName(item.name)} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      ) : (
                        <SmartItemIcon itemName={item.name} rarity={item.rarity} loading="lazy" imageClassName="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" iconClassName="text-3xl text-slate-600" />
                      )}
                    </div>
                    <div className="text-[9px] font-black text-center text-slate-300 uppercase line-clamp-2 w-full break-words relative z-10 text-shadow-sm">
                      {translateItemName(item.name)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeScreen;
