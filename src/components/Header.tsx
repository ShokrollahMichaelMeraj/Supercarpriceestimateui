import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Info, 
  HelpCircle, 
  DollarSign, 
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'about', label: 'About', icon: <Info size={20} /> },
    { id: 'how-it-works', label: 'How It Works', icon: <HelpCircle size={20} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={20} /> },
    { id: 'faq', label: 'FAQ', icon: <MessageSquare size={20} /> },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (pageId: string) => {
    onNavigate?.(pageId);
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-6 left-6 z-50 p-[2px]" ref={menuRef}>
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : '80px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col gap-3 bg-white/70 backdrop-blur-md rounded-[26px] p-3 shadow-lg border border-gray-200/50"
        style={{
          background: 'rgba(124, 124, 124, 0.13)',
          overflow: 'hidden',
        }}
      >
        {/* Hamburger/X Menu Button */}
        <motion.button
          onClick={handleMenuClick}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gradient accent when active */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 opacity-0"
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 w-6 h-6">
            {/* Top line */}
            <motion.span
              className="w-6 h-0.5 bg-gray-900 rounded-full"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
                backgroundColor: isMenuOpen ? '#ffffff' : '#111827'
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Middle line */}
            <motion.span
              className="w-6 h-0.5 bg-gray-900 rounded-full"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scale: isMenuOpen ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Bottom line */}
            <motion.span
              className="w-6 h-0.5 bg-gray-900 rounded-full"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
                backgroundColor: isMenuOpen ? '#ffffff' : '#111827'
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.button>

        {/* Dropdown Menu Icons */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    delay: 0.15 + index * 0.08,
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50/80 hover:bg-gradient-to-br hover:from-red-600 hover:to-orange-600 rounded-xl flex items-center justify-center text-gray-700 hover:text-white transition-all duration-200 group relative shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.label}
                >
                  {item.icon}
                  
                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                    {/* Arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                  </motion.div>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
