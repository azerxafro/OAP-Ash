import React from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const navItems = [
    { name: 'STORY', href: '#story' },
    { name: 'SOUND', href: '#sound' },
    { name: 'LOOK', href: '#look' },
    { name: 'BOOK', href: '#book' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 mix-blend-difference">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-black tracking-tighter font-syne"
      >
        LUCID ASH
      </motion.div>

      <div className="flex gap-8">
        {navItems.map((item, i) => (
          <motion.a
            key={item.name}
            href={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-xs font-bold tracking-widest hover:text-[#00f2ff] transition-colors"
          >
            {item.name}
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
