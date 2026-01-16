import { useEffect, useState } from 'react';

export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > 300; // Show button after scrolling 300px
      
      setIsVisible(shouldShow);
      setIsHeaderSticky(shouldShow);
      
      // Update header sticky class
      const header = document.getElementById('header');
      if (header) {
        if (shouldShow) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { isVisible, isHeaderSticky, scrollToTop };
};

