import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a string to a certain number of words
 * @param str The string to truncate
 * @param numWords The number of words to truncate to
 * @returns The truncated string
 */
export function truncateByWords(str: string, numWords: number): string {
  if (!str) return '';
  
  const words = str.trim().split(/\s+/);
  if (words.length <= numWords) return str;
  
  return words.slice(0, numWords).join(' ') + '...';
}

/**
 * Creates an excerpt from blog content
 * @param content The blog content
 * @param maxLength The maximum length of the excerpt in words
 * @returns The excerpt
 */
export function createExcerpt(content: string, maxLength: number = 25): string {
  if (!content) return '';
  
  // Remove title if it exists (assuming title is the first line)
  const contentWithoutTitle = content.includes('\n') 
    ? content.substring(content.indexOf('\n')).trim()
    : content;
  
  return truncateByWords(contentWithoutTitle, maxLength);
}

/**
 * Formats a date string
 * @param date The date to format
 * @returns The formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Converts a string to kebab case (for slugs)
 * @param str The string to convert
 * @returns The kebab case string
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}
