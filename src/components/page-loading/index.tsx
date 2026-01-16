import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoadingProps {
  isLoading: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({ isLoading }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Detect iOS specifically
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isLoading) {
      // Disable scroll when loading - iOS SAFE VERSION
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      // iOS-specific fixes
      if (isIOS) {
        // Use touch-action to prevent scroll on iOS
        document.body.style.touchAction = 'none';
        document.documentElement.style.touchAction = 'none';
        // Prevent elastic scrolling on iOS (use type assertion for webkit property)
        (document.body.style as any).webkitOverflowScrolling = 'touch';
      }
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      
      // AGGRESSIVE SAFETY: Auto-unlock after shorter time on mobile/iOS
      const safetyTimeout = setTimeout(() => {
        console.warn('PageLoading: Safety unlock triggered');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.touchAction = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.documentElement.style.touchAction = '';
      }, isIOS ? 1000 : (isMobile ? 1500 : 3000)); // Very short timeout on iOS

      return () => {
        clearTimeout(safetyTimeout);
      };
    } else {
      // Enable scroll when not loading
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.touchAction = '';
      
      if (scrollY) {
        const scrollPosition = parseInt(scrollY.replace('px', '') || '0') * -1;
        // Use requestAnimationFrame for smooth scroll restore on mobile
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
        });
      }
    }
  }, [isLoading]);

  // Cleanup on unmount - ensure body is never locked
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '100vh', // iOS Safari fix for viewport height
            zIndex: 9998,
            backgroundColor: '#ffffff', // Solid white for iOS compatibility
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: isLoading ? 'auto' : 'none',
            WebkitTransform: 'translateZ(0)', // Force hardware acceleration on iOS
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden', // Prevent flickering on iOS
            backfaceVisibility: 'hidden',
            touchAction: 'none', // Prevent touch events on iOS
            WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: 'easeOut'
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
              style={{
                marginBottom: '20px',
              }}
            >
              <Image
                src="https://nails.shoedog.vn/public/images/Nails%20or%20Never-01%20(1).png"
                alt="Nails or Never - Professional Nail Salon Logo"
                width={200}
                height={80}
                priority={true}
                quality={90}
                style={{
                  width: '200px',
                  height: 'auto',
                }}
              />
            </motion.div>
            <motion.div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#1a1a1a',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoading;
