// Mock environment variables
window.process = window.process || {};
window.process.env = window.process.env || {};

// Set mock environment variables
window.process.env.VITE_API_URL = '';
window.process.env.BASE_URL = '/';
window.process.env.NODE_ENV = 'development';

// Define __DEFINES__ variable to prevent errors
window.__DEFINES__ = window.__DEFINES__ || {}; 