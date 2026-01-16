import { useEffect } from 'react';

export const useLoading = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.transition = 'opacity 0.5s ease-out';
        loadingElement.style.opacity = '0';
        setTimeout(() => {
          loadingElement.style.display = 'none';
        }, 500);
      }, 1000);
    }
  }, []);
};

