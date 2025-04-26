import { useState, useEffect } from 'react';
import ClientEnv from './ClientEnv';

// Define the blog post structure
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
}

// Get base URL for assets
const baseUrl = ClientEnv.PUBLIC_URL;

// Map blog slugs to their content files
export const blogContentMap: Record<string, { filePath: string, image: string }> = {
  "genre-research": { 
    filePath: `${baseUrl}text folder/Genre Research.txt`, 
    image: `${baseUrl}images/blogs/genre-research.jpg` 
  },
  "music-video-referencing": { 
    filePath: `${baseUrl}text folder/Music Video Referencing.txt`, 
    image: `${baseUrl}images/blogs/music-video-referencing.jpg` 
  },
  "website-analysis": { 
    filePath: `${baseUrl}text folder/Website Analysis.txt`, 
    image: `${baseUrl}images/blogs/website-analysis.jpg` 
  },
  "institution-research": { 
    filePath: `${baseUrl}text folder/Institution Research.txt`, 
    image: `${baseUrl}images/blogs/institution-research.jpg`
  },
  "director-research": { 
    filePath: `${baseUrl}text folder/Director Research.txt`, 
    image: `${baseUrl}images/blogs/director-research.jpg`
  },
  "screenplay": { 
    filePath: `${baseUrl}text folder/Screenplay.txt`, 
    image: `${baseUrl}images/blogs/screenplay.jpg`
  },
  "mise-en-scene": { 
    filePath: `${baseUrl}text folder/Mise-en-scène.txt`, 
    image: `${baseUrl}images/blogs/mise-en-scene.jpg`
  },
  "storyboard": { 
    filePath: `${baseUrl}text folder/Storyborad.txt`, 
    image: `${baseUrl}images/blogs/storyboard.jpg`
  },
  "music-video-concept": { 
    filePath: `${baseUrl}text folder/Music Video Concept.txt`, 
    image: `${baseUrl}images/blogs/music-video-concept.jpg`
  },
  "music-video-treatment": { 
    filePath: `${baseUrl}text folder/Music Video Treatment.txt`, 
    image: `${baseUrl}images/blogs/music-video-treatment.jpg`
  },
  "lighting-plan": { 
    filePath: `${baseUrl}text folder/Music Videos Lighting Plan.txt`, 
    image: `${baseUrl}images/blogs/lighting-plan.jpg`
  },
  "prop-list": { 
    filePath: `${baseUrl}text folder/Prop List.txt`, 
    image: `${baseUrl}images/blogs/prop-list.jpg`
  },
  "character-profile": { 
    filePath: `${baseUrl}text folder/Character Profile.txt`, 
    image: `${baseUrl}images/blogs/character-profile.jpg`
  },
  "shot-division": { 
    filePath: `${baseUrl}text folder/Shot Division List.txt`, 
    image: `${baseUrl}images/blogs/shot-division.jpg`
  },
  "digipak": { 
    filePath: `${baseUrl}text folder/DigiPak.txt`, 
    image: `${baseUrl}images/blogs/digipak.jpg` 
  },
  "behind-the-scenes": { 
    filePath: `${baseUrl}text folder/Behind The Scenes + Bloopers.txt`, 
    image: `${baseUrl}images/blogs/behind-the-scenes.jpg`
  },
  "equipment-setup": { 
    filePath: `${baseUrl}text folder/Equipment Setup.txt`, 
    image: `${baseUrl}images/blogs/equipment-setup.jpg`
  },
  "production-challenges": { 
    filePath: `${baseUrl}text folder/Production Challenges.txt`, 
    image: `${baseUrl}images/blogs/production-challenges.jpg`
  },
  "editing-process": { 
    filePath: `${baseUrl}text folder/Editing Process.txt`, 
    image: `${baseUrl}images/blogs/editing-process.jpg`
  },
  "artist-website": { 
    filePath: `${baseUrl}text folder/Artist Website.txt`, 
    image: `${baseUrl}images/blogs/artist-website.png`
  },
  "ccr": { 
    filePath: `${baseUrl}text folder/CCR.txt`, 
    image: `${baseUrl}images/blogs/ccr.jpg`
  }
};

// Research & Planning blogs
export const researchBlogs: BlogPost[] = [
  {
    title: "Genre Research",
    slug: "genre-research",
    excerpt: "Exploring different music genres and their visual aesthetics",
    image: `${baseUrl}images/blogs/genre-research.jpg`,
    category: "research"
  },
  {
    title: "Music Video Referencing",
    slug: "music-video-referencing",
    excerpt: "Analysis of influential music videos that inspired this project",
    image: `${baseUrl}images/blogs/music-video-referencing.jpg`,
    category: "research"
  },
  {
    title: "Website Analysis",
    slug: "website-analysis",
    excerpt: "Examining successful artist websites and their design elements",
    image: `${baseUrl}images/blogs/website-analysis.jpg`,
    category: "research"
  },
  {
    title: "Institution Research",
    slug: "institution-research",
    excerpt: "Research on music industry institutions and their influence",
    image: `${baseUrl}images/blogs/institution-research.jpg`,
    category: "research"
  },
  {
    title: "Director Research",
    slug: "director-research",
    excerpt: "Study of leading music video directors like Dave Meyers and Nabil Elderkin, focusing on storytelling techniques, visual languages, and emotional expression",
    image: `${baseUrl}images/blogs/director-research.jpg`,
    category: "research"
  }
];

// Pre-production blogs
export const preProductionBlogs: BlogPost[] = [
  {
    title: "Music Video Concept",
    slug: "music-video-concept",
    excerpt: "A visual experience blurring reality and dreams, reflecting mental detachment and emotional distance through a surreal journey inspired by Travis Scott",
    image: `${baseUrl}images/blogs/music-video-concept.jpg`,
    category: "pre-production"
  },
  {
    title: "Music Video Treatment",
    slug: "music-video-treatment",
    excerpt: "Detailed breakdown of the music video narrative showing a character caught between reality and dream, with specific visual style, tone, and thematic elements",
    image: `${baseUrl}images/blogs/music-video-treatment.jpg`,
    category: "pre-production"
  },
  {
    title: "Lighting Plan",
    slug: "lighting-plan",
    excerpt: "Comprehensive lighting strategy that uses color, contrast, and shadows to establish the mood and psychological states across different scenes",
    image: `${baseUrl}images/blogs/lighting-plan.jpg`,
    category: "pre-production"
  },
  {
    title: "Prop List",
    slug: "prop-list",
    excerpt: "Essential props used in the music video including the lighter, rolled joint, car, and symbolic elements that drive the narrative",
    image: `${baseUrl}images/blogs/prop-list.jpg`,
    category: "pre-production"
  },
  {
    title: "Character Profile",
    slug: "character-profile",
    excerpt: "Profile of the protagonist Maximus, exploring his personality traits, character purpose, costume choices, and subtle performance style",
    image: `${baseUrl}images/blogs/character-profile.jpg`,
    category: "pre-production"
  },
  {
    title: "Shot Division List",
    slug: "shot-division",
    excerpt: "Detailed breakdown of all shots in the music video, from the opening bedroom scene through dream sequences to the final curtain shot",
    image: `${baseUrl}images/blogs/shot-division.jpg`,
    category: "pre-production"
  },
  {
    title: "Storyboard Development",
    slug: "storyboard",
    excerpt: "Visual blueprint for the music video, mapping out shots, camera movements, and key visual transitions that capture the surreal Travis Scott-inspired style",
    image: `${baseUrl}images/blogs/storyboard.jpg`,
    category: "pre-production"
  },
  {
    title: "Mise-en-Scene Planning",
    slug: "mise-en-scene",
    excerpt: "Every visual element—setting, props, lighting, costume, and positioning—deliberately chosen to reflect the character's mental state",
    image: `${baseUrl}images/blogs/mise-en-scene.jpg`,
    category: "pre-production"
  },
  {
    title: "Screenplay Writing",
    slug: "screenplay",
    excerpt: "A breakdown of the music video as a looped dream where symbolism, speed, violence, and escape blend into a surreal journey that ends with a mental reset",
    image: `${baseUrl}images/blogs/screenplay.jpg`,
    category: "pre-production"
  }
];

// Production blogs
export const productionBlogs: BlogPost[] = [
  {
    title: "Behind the Scenes & Bloopers",
    slug: "behind-the-scenes",
    excerpt: "A candid look at what happened during filming, including bloopers like the lighter not working, actors breaking character, and challenges with POV shots and camera setups",
    image: `${baseUrl}images/blogs/behind-the-scenes.jpg`,
    category: "production"
  },
  {
    title: "Equipment Setup",
    slug: "equipment-setup",
    excerpt: "Details about using the iPhone 12 Pro Max as the primary camera, along with DIY mounts, natural lighting techniques, and editing with CapCut and DaVinci Resolve",
    image: `${baseUrl}images/blogs/equipment-setup.jpg`,
    category: "production"
  },
  {
    title: "Production Challenges",
    slug: "production-challenges",
    excerpt: "Overcoming obstacles like coordinating dream sequences, shooting inside moving vehicles, creating the right lighting atmosphere, and managing time constraints with a small crew",
    image: `${baseUrl}images/blogs/production-challenges.jpg`,
    category: "production"
  }
];

// Post-production blogs
export const postProductionBlogs: BlogPost[] = [
  {
    title: "Editing Process",
    slug: "editing-process",
    excerpt: "Building the vision through careful pacing, transitions, and visual storytelling - from the calm intro to chaotic dream sequences and back to reality, creating a journey that mirrors the character's mental state",
    image: `${baseUrl}images/blogs/editing-process.jpg`,
    category: "post-production"
  }
];

// Minor task blogs
export const minorTaskBlogs: BlogPost[] = [
  {
    title: "DigiPak Design",
    slug: "digipak",
    excerpt: "Designing a visually striking DigiPak that uses smoky textures, contrasting colors, and emotional portraits to extend the video's themes of isolation, mental escape, and emotional weight",
    image: `${baseUrl}images/blogs/digipak.jpg`,
    category: "minor-task"
  },
  {
    title: "Artist Website",
    slug: "artist-website",
    excerpt: "Analysis of Travis Scott's official website (https://www.travisscott.com) showcasing his brand identity through dark aesthetics, merchandise, and multimedia content",
    image: `${baseUrl}images/blogs/artist-website.png`,
    category: "minor-task"
  },
  {
    title: "CCR",
    slug: "ccr",
    excerpt: "Exploring how the music video represents youth culture and escapism, analyzing the branding consistency across platforms, and examining audience engagement strategies",
    image: `${baseUrl}images/blogs/ccr.jpg`,
    category: "minor-task"
  }
];

// Hook to fetch blog content
export const useBlogContent = (slug: string | undefined) => {
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) {
        setError("No slug provided");
        setLoading(false);
        return;
      }

      const fileInfo = blogContentMap[slug];
      if (!fileInfo) {
        setError(`No content found for slug: ${slug}`);
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching content from: ${fileInfo.filePath}`);
        const response = await fetch(fileInfo.filePath, {
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const text = await response.text();
        setBlogContent(text);
      } catch (err) {
        console.error("Error fetching blog content:", err);
        setError(`Error fetching blog content. This post may not be available yet.`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  return { blogContent, loading, error };
};

// Function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return [
    ...researchBlogs, 
    ...preProductionBlogs, 
    ...productionBlogs, 
    ...postProductionBlogs, 
    ...minorTaskBlogs
  ].find(blog => blog.slug === slug);
};

// Function to get all blogs
export const getAllBlogs = (): BlogPost[] => {
  return [
    ...researchBlogs, 
    ...preProductionBlogs, 
    ...productionBlogs, 
    ...postProductionBlogs, 
    ...minorTaskBlogs
  ];
}; 