import { useEffect, useRef } from 'react';

interface FlickityOptions {
  cellAlign?: 'left' | 'center' | 'right';
  wrapAround?: boolean;
  pageDots?: boolean;
  prevNextButtons?: boolean;
  dragThreshold?: number;
  adaptiveHeight?: boolean;
  autoPlay?: number | boolean;
  arrowShape?: {
    x0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
  };
}

export const useFlickitySlider = (
  selector: string,
  options: FlickityOptions
) => {
  const flickityInstance = useRef<any>(null);

  useEffect(() => {
    // Wait for Flickity to be loaded
    if (typeof window === 'undefined' || !(window as any).Flickity) {
      return;
    }

    const Flickity = (window as any).Flickity;
    const element = document.querySelector(selector);
    
    if (element && !flickityInstance.current) {
      const flickityOptions: any = {
        cellAlign: options.cellAlign || 'left',
        wrapAround: options.wrapAround !== false,
        pageDots: options.pageDots !== false,
        prevNextButtons: options.prevNextButtons !== false,
        dragThreshold: options.dragThreshold || 50,
        adaptiveHeight: options.adaptiveHeight || false,
        autoPlay: options.autoPlay || false,
      };

      if (options.arrowShape) {
        flickityOptions.arrowShape = `${options.arrowShape.x0},${options.arrowShape.x1} ${options.arrowShape.y1},${options.arrowShape.x2} ${options.arrowShape.y2},${options.arrowShape.x3}`;
      }

      flickityInstance.current = new Flickity(element as HTMLElement, flickityOptions);
    }

    return () => {
      if (flickityInstance.current && flickityInstance.current.destroy) {
        flickityInstance.current.destroy();
        flickityInstance.current = null;
      }
    };
  }, [selector, options]);

  return flickityInstance.current;
};

