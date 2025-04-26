import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  src: string;
  title: string;
}

const BlooperVideoSection = () => {
  const videos: Video[] = [
    { 
      id: 'video1', 
      src: '/videos/bloopers/VID-20250426-WA0002.mp4',
      title: 'Blooper 1: Lighting Issues' 
    },
    { 
      id: 'video2', 
      src: '/videos/bloopers/VID-20250426-WA0003.mp4',
      title: 'Blooper 2: Breaking Character' 
    },
    { 
      id: 'video3', 
      src: '/videos/bloopers/VID-20250426-WA0004.mp4',
      title: 'Blooper 3: POV Scene Confusion' 
    },
    { 
      id: 'video4', 
      src: '/videos/bloopers/VID-20250426-WA0005.mp4',
      title: 'Blooper 4: Car Camera Mishaps' 
    },
    { 
      id: 'video5', 
      src: '/videos/bloopers/VID-20250426-WA0006.mp4',
      title: 'Blooper 5: Curtain Timing Issues' 
    },
    { 
      id: 'video6', 
      src: '/videos/bloopers/VID-20250426-WA0007.mp4',
      title: 'Blooper 6: Lighter Not Working' 
    },
    { 
      id: 'video7', 
      src: '/videos/bloopers/VID-20250426-WA0008.mp4',
      title: 'Blooper 7: Random Moments' 
    },
  ];

  const [activeVideo, setActiveVideo] = useState<Video>(videos[0]); // Set first video as default
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the first video on component mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, []);

  const handleVideoSelect = (video: Video) => {
    setActiveVideo(video);
    
    // Reset video when selecting a new one
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        }
      }, 100);
    }
  };

  return (
    <div className="py-8">
      {/* Featured video player */}
      <div className="mb-8">
        <div className="bg-black rounded-lg overflow-hidden shadow-xl">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="aspect-video"
          >
            <video
              ref={videoRef}
              src={activeVideo.src}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </motion.div>
        </div>
      </div>
      
      {/* Video thumbnails */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-200 ${
              activeVideo.id === video.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            onClick={() => handleVideoSelect(video)}
          >
            <div className="aspect-video bg-gray-200 relative">
              <video 
                src={video.src} 
                className="w-full h-full object-cover"
                muted
                preload="metadata"
                onMouseOver={(e) => {
                  e.currentTarget.play().catch(err => console.log(err));
                }}
                onMouseOut={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlooperVideoSection; 