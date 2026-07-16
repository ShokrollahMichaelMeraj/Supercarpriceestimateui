import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogIn, UserPlus, LogOut, Settings } from 'lucide-react';

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setIsMenuOpen(false);
  };

  const handleSignUp = () => {
    setIsMenuOpen(false);
  };

  const handleSettings = () => {
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

  const signedOutItems = [
    { id: 'signin', label: 'Sign In', icon: <LogIn size={20} />, onClick: handleSignIn },
    { id: 'signup', label: 'Sign Up', icon: <UserPlus size={20} />, onClick: handleSignUp },
  ];

  const signedInItems = [
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, onClick: handleSettings },
    { id: 'signout', label: 'Sign Out', icon: <LogOut size={20} />, onClick: handleSignOut },
  ];

  const menuItems = isSignedIn ? signedInItems : signedOutItems;

  return (
    <div className="fixed top-6 right-6 z-50 p-[2px]" ref={menuRef}>
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
        {/* Profile Button */}
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
          
          <div className="relative z-10">
            <User 
              size={28} 
              className={isMenuOpen ? 'text-white' : isSignedIn ? 'text-red-600' : 'text-gray-900'}
            />
          </div>
        </motion.button>

        {/* Dropdown Menu Items */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.onClick}
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
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                    {/* Arrow */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
                  </motion.div>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
