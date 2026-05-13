import React, { useState, useEffect } from 'react';
import { getSourceImageUrls, getRarityIconColor } from '../utils';
import { Rarity } from '../types';

interface SmartItemIconProps {
  itemName: string;
  icon?: string;
  rarity?: string | Rarity;
  imageClassName?: string;
  iconClassName?: string;
  loading?: "eager" | "lazy";
}

const SmartItemIcon: React.FC<SmartItemIconProps> = ({ 
  itemName, 
  icon = 'military_tech', 
  rarity = 'COMMON',
  imageClassName = 'w-full h-full object-contain',
  iconClassName = 'text-2xl',
  loading = 'lazy'
}) => {
  const urls = getSourceImageUrls(itemName);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  useEffect(() => {
    setCurrentUrlIndex(0);
  }, [itemName]);

  if (urls.length > 0 && currentUrlIndex < urls.length) {
    return (
      <img 
        src={urls[currentUrlIndex]} 
        alt={itemName} 
        className={imageClassName} 
        loading={loading}
        onError={() => setCurrentUrlIndex(prev => prev + 1)}
      />
    );
  }

  return (
    <span className={`material-symbols-outlined ${iconClassName} ${getRarityIconColor(rarity as Rarity)}`}>
      {icon}
    </span>
  );
};

export default SmartItemIcon;
