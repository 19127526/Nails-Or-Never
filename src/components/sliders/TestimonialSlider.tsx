import React from 'react';
import { useFlickitySlider } from '@/hooks/useFlickitySlider';

interface TestimonialSliderProps {
  children: React.ReactNode;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ children }) => {
  useFlickitySlider('.testimonial-slider', {
    cellAlign: 'left',
    wrapAround: true,
    pageDots: true,
    prevNextButtons: false,
    dragThreshold: 50,
    adaptiveHeight: false,
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

  return <div className="testimonial-slider">{children}</div>;
};

export default TestimonialSlider;


