// Client Environment Variables
export const ClientEnv = {
  // Define any environment variables here
  API_URL: import.meta.env.VITE_API_URL || '',
  PUBLIC_URL: import.meta.env.BASE_URL || '/',
};

// Export a type for the environment
export type ClientEnvType = typeof ClientEnv;

// Declare the __DEFINES__ to fix the reference error
declare global {
  interface Window {
    __DEFINES__: Record<string, any>;
  }
}

// Set __DEFINES__ to fix the reference error
if (typeof window !== 'undefined') {
  window.__DEFINES__ = window.__DEFINES__ || {};
}

export default ClientEnv; 