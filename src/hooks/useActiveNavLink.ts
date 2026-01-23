import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useActiveNavLink = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateActiveNavLinks = () => {
      // Use requestAnimationFrame to batch DOM reads and writes, avoiding forced reflows
      requestAnimationFrame(() => {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPath = router.asPath.split('?')[0]; // Remove query params

        // Batch all DOM reads first
        const linkData = Array.from(navLinks).map((link) => {
          const href = link.getAttribute('href');
          return { link, href: href ? href.split('?')[0] : null };
        });

        // Then batch all DOM writes
        requestAnimationFrame(() => {
          const normalizedCurrent = currentPath.replace(/\/$/, '');
          linkData.forEach(({ link, href }) => {
            if (href) {
              const normalizedLink = href.replace(/\/$/, '');
              if (normalizedCurrent === normalizedLink || normalizedCurrent === normalizedLink + '/') {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            }
          });
        });
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

