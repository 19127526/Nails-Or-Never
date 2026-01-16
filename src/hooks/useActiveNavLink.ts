import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useActiveNavLink = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateActiveNavLinks = () => {
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const currentPath = router.asPath.split('?')[0]; // Remove query params

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const linkPath = href.split('?')[0];
          // Remove trailing slash for comparison
          const normalizedCurrent = currentPath.replace(/\/$/, '');
          const normalizedLink = linkPath.replace(/\/$/, '');

          if (normalizedCurrent === normalizedLink || normalizedCurrent === normalizedLink + '/') {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    };

    updateActiveNavLinks();
    
    if (router.events) {
      router.events.on('routeChangeComplete', updateActiveNavLinks);
      return () => {
        router.events.off('routeChangeComplete', updateActiveNavLinks);
      };
    }
  }, [router]);
};

