import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, itemTranslations } from './translationDictionary';

export type Language = 'en' | 'pt-BR';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateItemName: (name: string) => string;
  translateItemDesc: (name: string, fallbackDesc?: string) => string;
  translateItemPerks: (name: string, fallbackPerks?: string) => string;
  translatePerkString: (perk: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('scrappy-language');
    return (saved === 'pt-BR' || saved === 'en') ? saved as Language : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('scrappy-language', lang);
  };

  const t = (key: string): string => {
    const dictionary = translations[language];
    if (!dictionary) return key;
    return dictionary[key] !== undefined ? dictionary[key] : key;
  };

  const translateItemName = (name: string): string => {
    if (language === 'en') return name;
    return itemTranslations[name]?.name || name;
  };

  const translateItemDesc = (name: string, fallbackDesc?: string): string => {
    if (language === 'en') return fallbackDesc || '';
    return itemTranslations[name]?.description || fallbackDesc || '';
  };

  const translateItemPerks = (name: string, fallbackPerks?: string): string => {
    if (language === 'en') return fallbackPerks || '';
    return itemTranslations[name]?.perks || fallbackPerks || '';
  };

  const translatePerkString = (perk: string): string => {
    if (language === 'en') return perk;
    
    let p = perk.trim();
    
    // +X Magazine Size -> +X Tamanho do Carregador
    p = p.replace(/\+(\d+)\s+Magazine\s+Size/gi, '+$1 Tamanho do Carregador');
    
    // +X Durability -> +X Durabilidade
    p = p.replace(/\+(\d+)\s+Durability/gi, '+$1 Durabilidade');
    
    // X% Increased Fire Rate -> X% de Cadência de Tiro Aumentada
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Increased\s+Fire\s+Rate/gi, '$1 de Cadência de Tiro Aumentada');
    
    // X% Reduced Reload Time -> X% de Tempo de Recarga Reduzido
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Reload\s+Time/gi, '$1 de Tempo de Recarga Reduzido');
    
    // X% Reduced Horizontal Recoil -> X% de Recuo Horizontal Reduzido
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Horizontal\s+Recoil/gi, '$1 de Recuo Horizontal Reduzido');
    
    // X% Reduced Vertical Recoil -> X% de Recuo Vertical Reduzido
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Vertical\s+Recoil/gi, '$1 de Recuo Vertical Reduzido');

    // X% Reduced Dispersion Recovery -> X% de Recuperação de Dispersão Reduzida
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Dispersion\s+Recovery/gi, '$1 de Recuperação de Dispersão Reduzida');

    // X% Reduced Dispersion -> X% de Dispersão Reduzida
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Dispersion/gi, '$1 de Dispersão Reduzida');
    
    // X% Increased Bullet Velocity -> X% de Velocidade do Projétil Aumentada
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Increased\s+Bullet\s+Velocity/gi, '$1 de Velocidade do Projétil Aumentada');
    
    // X% Reduced Bolt Action Time -> X% de Tempo de Ferrolho Reduzido
    p = p.replace(/(\d+(?:\.\d+)?%)\s+Reduced\s+Bolt\s+Action\s+Time/gi, '$1 de Tempo de Ferrolho Reduzido');

    // Fallbacks for general terms
    p = p.replace(/Magazine Size/gi, 'Tamanho do Carregador');
    p = p.replace(/Durability/gi, 'Durabilidade');
    p = p.replace(/Fire Rate/gi, 'Cadência de Tiro');
    p = p.replace(/Reload Time/gi, 'Tempo de Recarga');
    p = p.replace(/Horizontal Recoil/gi, 'Recuo Horizontal');
    p = p.replace(/Vertical Recoil/gi, 'Recuo Vertical');
    p = p.replace(/Dispersion/gi, 'Dispersão');
    p = p.replace(/Bullet Velocity/gi, 'Velocidade do Projétil');
    p = p.replace(/Increased/gi, 'Aumentado');
    p = p.replace(/Reduced/gi, 'Reduzido');

    return p;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateItemName, translateItemDesc, translateItemPerks, translatePerkString }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
