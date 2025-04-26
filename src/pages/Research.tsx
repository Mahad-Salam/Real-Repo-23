import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { researchBlogs } from '../lib/blogData';
import { motion } from 'framer-motion';

const Research = () => {
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
          Research & Planning
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {researchBlogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              {...blog}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Research;
