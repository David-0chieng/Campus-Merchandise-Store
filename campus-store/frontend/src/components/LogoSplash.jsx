import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SphLogo from './SphLogo';
import './LogoSplash.css';

const SHOWN_KEY = 'sph_splash_shown';

const LogoSplash = () => {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SHOWN_KEY));

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SHOWN_KEY, '1');
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="logo-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Glowing orbs */}
          <motion.div
            className="logo-splash__orb logo-splash__orb--1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <motion.div
            className="logo-splash__orb logo-splash__orb--2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.div
            className="logo-splash__logo"
            initial={{ scale: 0.4, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SphLogo height={90} dark={false} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="logo-splash__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            Premium Merchandise Store
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="logo-splash__bar-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="logo-splash__bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.75, duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoSplash;
