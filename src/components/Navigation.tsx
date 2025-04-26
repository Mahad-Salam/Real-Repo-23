import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect shadow-lg' : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors group">
              <span className="relative inline-block">
                Media Studies A2 Blog
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop Navigation Links to the right */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {[
              { path: '/', label: 'Home' },
              { path: '/research', label: 'Research & Planning' },
              { path: '/pre-production', label: 'Pre-production' },
              { path: '/production', label: 'Production' },
              { path: '/post-production', label: 'Post-production' },
              { path: '/minor-task', label: 'Minor Task' },
              { path: '/final-foundation-portfolio', label: 'Final Portfolio' }
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                  location.pathname === item.path 
                    ? 'text-blue-600' 
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {[
            { path: '/', label: 'Home' },
            { path: '/research', label: 'Research & Planning' },
            { path: '/pre-production', label: 'Pre-production' },
            { path: '/production', label: 'Production' },
            { path: '/post-production', label: 'Post-production' },
            { path: '/minor-task', label: 'Minor Task' },
            { path: '/final-foundation-portfolio', label: 'Final Portfolio' }
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`block px-3 py-2 text-base font-medium ${
                location.pathname === item.path 
                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                  : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-blue-600'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
