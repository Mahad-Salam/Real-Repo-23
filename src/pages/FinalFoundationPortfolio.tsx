import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';

const FinalFoundationPortfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Final Foundation Portfolio
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full rounded-xl overflow-hidden shadow-lg"
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              src="https://www.youtube.com/embed/ic6DbidwOKg" 
              title="Final Foundation Portfolio"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Final Production Showcase</h2>
          <p className="text-gray-700">
            This video presents the final production of my foundation portfolio project. It represents the culmination of all the skills, techniques, and creative processes developed throughout the course, delivered as a complete and polished media product.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default FinalFoundationPortfolio; 