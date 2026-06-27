import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedLoadingSkeleton = ({ count = 6 }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const controls = useAnimation();

  const getCols = (w) => (w >= 1024 ? 3 : w >= 640 ? 2 : 1);

  const generatePath = (w) => {
    const cols = getCols(w);
    const xStep = 210, yStep = 230, xBase = 40, yBase = 60;
    const rows = Math.ceil(count / cols);
    const positions = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (r * cols + c < count)
          positions.push({ x: xBase + c * xStep, y: yBase + r * yStep });
    const picked = [...positions].sort(() => Math.random() - 0.5).slice(0, 4);
    picked.push(picked[0]);
    return {
      x: picked.map((p) => p.x),
      y: picked.map((p) => p.y),
      transition: {
        duration: picked.length * 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1],
        times: picked.map((_, i) => i / (picked.length - 1)),
      },
    };
  };

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    controls.start(generatePath(windowWidth));
  }, [windowWidth]); // eslint-disable-line

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0, opacity: 1,
      transition: { delay: i * 0.08, duration: 0.4 },
    }),
  };

  const shimmer = {
    animate: {
      background: ['#f3f4f6', '#e5e7eb', '#f3f4f6'],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 min-h-64">
        {/* Animated search icon */}
        <motion.div
          className="absolute z-10 pointer-events-none"
          animate={controls}
          style={{ left: 24, top: 24 }}
        >
          <motion.div
            className="p-3 rounded-full"
            style={{ background: 'rgba(201,168,76,0.15)' }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(201,168,76,0.2)',
                '0 0 35px rgba(201,168,76,0.5)',
                '0 0 20px rgba(201,168,76,0.2)',
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" style={{ color: '#c9a84c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(count)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="h-40 bg-gray-200 rounded-t-xl" variants={shimmer} animate="animate" />
              <div className="p-4 flex flex-col gap-3">
                <motion.div className="h-3 w-3/4 bg-gray-200 rounded" variants={shimmer} animate="animate" />
                <motion.div className="h-3 w-1/2 bg-gray-200 rounded" variants={shimmer} animate="animate" />
                <motion.div className="h-3 w-2/5 bg-gray-200 rounded" variants={shimmer} animate="animate" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoadingSkeleton;
