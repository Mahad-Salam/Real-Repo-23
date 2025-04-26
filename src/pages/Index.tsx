import Navigation from '../components/Navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const allImages = [
    '/mahad/IMG-20250426-WA0005.jpg',
    '/mahad/IMG-20250426-WA0006.jpg',
    '/mahad/IMG-20250426-WA0007.jpg',
    '/mahad/IMG-20250426-WA0008.jpg',
    '/mahad/IMG-20250426-WA0009.jpg',
  ];
  
  // Different layouts for the slideshow
  const slideshowLayouts = [
    // Layout 1: 2x2 grid
    {
      images: [allImages[0], allImages[1], allImages[2], allImages[3]],
      layout: `grid-cols-2 grid-rows-2`
    },
    // Layout 2: Featured image + 2 smaller images
    {
      images: [allImages[4], allImages[0], allImages[1]],
      layout: `grid-cols-2 grid-rows-2`,
      styles: [
        `col-span-2 row-span-1`, // First image spans entire top row
        `col-span-1 row-span-1`, // Second image takes bottom left
        `col-span-1 row-span-1`  // Third image takes bottom right
      ]
    },
    // Layout 3: 3 images with left one taking full height
    {
      images: [allImages[2], allImages[3], allImages[4]],
      layout: `grid-cols-2 grid-rows-2`,
      styles: [
        `col-span-1 row-span-2`, // First image spans full height on left
        `col-span-1 row-span-1`, // Second image takes top right
        `col-span-1 row-span-1`  // Third image takes bottom right
      ]
    }
  ];

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowLayouts.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [slideshowLayouts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowLayouts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowLayouts.length) % slideshowLayouts.length);
  };

  const currentLayout = slideshowLayouts[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div className="relative z-10">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`grid ${currentLayout.layout} gap-3 max-w-lg mx-auto relative z-10`}
                >
                  {currentLayout.images.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className={`overflow-hidden rounded-xl shadow-lg ${currentLayout.styles ? currentLayout.styles[index] : ''}`}
                      whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={image}
                          alt={`Mahad Salam - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-4 mt-6">
                <motion.button 
                  onClick={prevSlide} 
                  className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous slide"
                >
                  <span className="absolute inset-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                {/* Indicators */}
                <div className="flex items-center gap-2">
                  {slideshowLayouts.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <motion.button 
                  onClick={nextSlide} 
                  className="p-2 rounded-full bg-gray-800 text-white hover:bg-blue-600 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next slide"
                >
                  <span className="absolute inset-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-800 relative z-10"
          >
            <div className="relative bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 opacity-20 rounded-full blur-md"></div>
              
              <h1 className="text-4xl font-bold mb-6 text-gray-900 relative">
                <span className="relative inline-block">
                  Hey, I'm Mahad Salam.
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 transform"></div>
                </span>
              </h1>
              
              <div className="space-y-4 text-gray-700 relative">
                <p className="relative drop-shadow-sm">
                  I'm 19, a football lover with big dreams — not just to play, but to become one of the greatest to ever do it. That drive, that fire, it's in everything I do. Whether I'm on the pitch, behind a camera, or just vibing with friends and family, I give it everything.
                </p>
                
                <p className="relative drop-shadow-sm">
                  I've always loved the simple things — cars, food, traveling, laughs with the people I care about. But if you really get to know me, you'll realise I see beyond all that. I'm awake. I see the world for what it is. I know about the deeper agenda that controls what we see, what we hear, and how we think — and how it constantly tries to pull us away from truth, especially the truth of Islam.
                </p>
                
                <p className="relative drop-shadow-sm">
                  This media project is more than just a video. It's a reflection of what goes on inside — the battles, the distractions, and the moments that try to shake your purpose. But I know where I'm headed. I'm moving with intention.
                </p>
                
                <p className="font-semibold text-lg relative">
                  <span className="relative inline-block">
                    Welcome to my world.
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
