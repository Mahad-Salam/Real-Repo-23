import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../lib/blogData';

const BlogCard = ({ title, excerpt, image, slug, category }: BlogPost) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl h-64"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/90 text-sm line-clamp-3 mb-4">{excerpt}</p>
        <Link 
          to={`/post/${slug}`} 
          className="inline-block mt-auto text-sm text-white/80 hover:text-white transition-colors"
          aria-label={`Read more about ${title}`}
        >
          Read more →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
