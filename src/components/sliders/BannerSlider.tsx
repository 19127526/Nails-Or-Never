import React, { useEffect } from 'react';
import { useFlickitySlider } from '@/hooks/useFlickitySlider';

interface BannerSliderProps {
  children: React.ReactNode;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ children }) => {
  useFlickitySlider('.banner-slider', {
    cellAlign: 'center',
    wrapAround: true,
    pageDots: false,
    dragThreshold: 50,
    autoPlay: 6000,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30,
    },
  });

  return <div className="banner-slider">{children}</div>;
};

export default BannerSlider;


