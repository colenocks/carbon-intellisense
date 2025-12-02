/**
 * Simple logging utility for Carbon IntelliSense extension.
 * Set DEBUG environment variable or vscode setting to enable debug logs.
 */

const DEBUG = process.env.NODE_ENV === 'development' || false;

export const logger = {
  debug: (...args: any[]) => {
    if (DEBUG) {
      console.log('[Carbon]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    console.error('[Carbon ERROR]', ...args);
  },
  
  warn: (...args: any[]) => {
    console.warn('[Carbon WARN]', ...args);
  },
  
  info: (...args: any[]) => {
    console.log('[Carbon]', ...args);
  }
};
