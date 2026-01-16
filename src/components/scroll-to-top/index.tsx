import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="btnScrollTop"
          title="Go to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 4px 12px rgba(127, 166, 129, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            cursor: 'pointer',
            border: 'none',
            background: '#7fa681',
            borderRadius: '25px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            minWidth: '50px',
            minHeight: '50px',
          }}
        >
            <KeyboardArrowUpIcon
              className="fas fa-chevron-up"
              sx={{ fontSize: 28, color: '#fff' }}
            />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;


