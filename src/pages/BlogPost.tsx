import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { getBlogPostBySlug, useBlogContent } from '../lib/blogData';
import BlooperVideoSection from '../components/BlooperVideoSection';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get blog metadata
  const blogPost = slug ? getBlogPostBySlug(slug) : undefined;
  
  // Get blog content
  const { blogContent, loading, error } = useBlogContent(slug);

  // Check if this is the behind-the-scenes post
  const isBehindTheScenes = slug === 'behind-the-scenes';

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  // If blog post doesn't exist, show 404
  if (!blogPost && !isLoading) {
    return <NotFound />;
  }

  // Format the blog content while preserving paragraph structure
  const formatContent = (content: string | null) => {
    if (!content) return null;
    
    // First, separate the title from the content (if it exists)
    let title = '';
    let mainContent = content;
    
    // If the content has a title (first line followed by a colon)
    if (content.match(/^[^:\n]+:/)) {
      const firstLineBreak = content.indexOf('\n');
      if (firstLineBreak !== -1) {
        title = content.substring(0, firstLineBreak).trim();
        mainContent = content.substring(firstLineBreak + 1).trim();
      }
    }
    
    // Process the paragraphs
    return (
      <>
        {title && <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">{title}</h2>}
        <div className="space-y-6">
          {mainContent.split('\n\n').map((paragraph, i) => {
            // Handle lists and special formatting
            if (paragraph.trim().startsWith('- ')) {
              // Handle bullet points
              const listItems = paragraph.split('\n');
              return (
                <ul key={i} className="list-disc ml-6 mb-6 space-y-2">
                  {listItems.map((item, j) => (
                    <li key={`${i}-${j}`} className="text-gray-700">{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
            } else if (paragraph.trim().startsWith('From that starting point') || 
                      paragraph.trim().startsWith('While referencing') ||
                      paragraph.trim().startsWith('In the end')) {
              // Highlight important paragraphs
              return (
                <p key={i} className="mb-6 text-gray-700 bg-gray-50 p-4 rounded-md border-l-4 border-blue-400">
                  {paragraph.split('\n').map((line, j) => (
                    <span key={`${i}-${j}`}>
                      {line}
                      {j < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              );
            } else {
              // Handle regular paragraphs
              return (
                <p key={i} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph.split('\n').map((line, j) => (
                    <span key={`${i}-${j}`}>
                      {line}
                      {j < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              );
            }
          })}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="bg-white p-8 rounded-lg shadow animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Error Loading Content
            </h1>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <article className="bg-white p-8 rounded-lg shadow">
            <header className="mb-8 pb-4 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {blogPost?.title}
              </h1>
              <p className="text-gray-500 text-sm">
                Category: {blogPost?.category.replace('-', ' ')}
              </p>
            </header>
            
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img 
                src={blogPost?.image} 
                alt={blogPost?.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {formatContent(blogContent)}
              
              {/* Insert Blooper Video Section for Behind the Scenes post */}
              {isBehindTheScenes && <BlooperVideoSection />}
            </div>
            
            <footer className="mt-12 pt-6 border-t border-gray-200">
              <Link
                to={`/${blogPost?.category}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to {blogPost?.category.replace('-', ' ')}
              </Link>
            </footer>
          </article>
        )}
      </main>
    </div>
  );
};

export default BlogPost;
